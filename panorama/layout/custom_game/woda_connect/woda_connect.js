--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


var WODA_CONNECT_STATE_KEYS = {
	waiting: "#woda_connect_waiting",
	requesting: "#woda_connect_requesting",
	queued: "#woda_connect_queued",
	ready: "#woda_connect_ready",
	relaunch: "#woda_connect_relaunch",
	error: "#woda_connect_error",
	choose: "#woda_connect_choose",
	session: "#woda_connect_session",
	search_choose: "#woda_connect_search_choose",
	searching: "#woda_connect_searching",
	search_found: "#woda_connect_search_found",
	search_ban: "#woda_connect_search_ban"
};
var g_WodaStatusTime = null;
var g_WodaRegion = { serial: null, selected: null, deadline: 0, mode: null, newConfirm: false, sessionSerial: null, confirmArmedAt: 0 };
var WODA_TEAMING_TOOLTIP_ID = "woda_connect_teaming_tooltip";
var WODA_TEAMING_TOOLTIP_LAYOUT = "file://{resources}/layout/custom_game/tooltips/leaderboard_tooltip/leaderboard_tooltip.xml";
var g_WodaSearch = { selected: null, picked: false, leader: false, status: null, startedAt: 0, cards: {}, counts: {}, countLabels: {}, locked: {}, regions: {}, region: null, regionPicked: false, lastRegion: "", regionCards: {}, regionLabels: {} };
var g_WodaBan = { entries: [], receivedAt: 0, partner: null };
var g_WodaParty = { data: null, updatedAt: null, receivedAt: 0, state: "", slotsKey: "", noticeSerial: -1, noticeAt: 0, invite: null, inviteKey: "", inviteBlock: false, dismissed: {} };
var g_WodaSound = { searching: false, played: false };

function WodaLocalizeOr(key, fallback)
{
	var text = $.Localize(key);
	if (!text || text === key || text === key.substring(1))
	{
		return fallback;
	}
	return text;
}

function WodaRegionName(id)
{
	if (!id)
	{
		return "";
	}
	return WodaLocalizeOr("#woda_region_" + id, String(id).toUpperCase());
}

function WodaSendRegionChoice(action, region, mode)
{
	GameEvents.SendCustomGameEventToServer("event_woda_region_choice", { action: action, region: region || "", mode: mode || "" });
}

function WodaModeName(mode)
{
	if (!mode)
	{
		return "";
	}
	return WodaLocalizeOr("#woda_mode_" + mode, String(mode));
}

function WodaSelectMode(mode)
{
	var changed = g_WodaSearch.selected !== mode;
	g_WodaSearch.selected = mode;
	for (var key in g_WodaSearch.cards)
	{
		g_WodaSearch.cards[key].SetHasClass("Selected", key === mode);
	}
	var start = $("#WodaSearchStart");
	if (start)
	{
		start.SetHasClass("Locked", !!g_WodaSearch.locked[mode]);
		if (!g_WodaSearch.locked[mode])
		{
			$.DispatchEvent("UIHideCustomLayoutTooltip", start, WODA_TEAMING_TOOLTIP_ID);
		}
	}
	if (changed)
	{
		WodaRenderSearchRegions();
		WodaUpdateSearchCounts();
	}
}

function WodaStartSearch(mode)
{
	if (!g_WodaSearch.leader || !mode || g_WodaSearch.locked[mode])
	{
		return;
	}
	WodaSendRegionChoice("search", WodaSearchRegionFor(mode), mode);
}

function WodaSplitList(text)
{
	return String(text || "").split(",").filter(function(x) { return x !== ""; });
}

function WodaSearchModeRegions(mode)
{
	return WodaSplitList((g_WodaSearch.counts[mode] || {}).regions);
}

function WodaSearchRegionFor(mode)
{
	var ids = WodaSearchModeRegions(mode);
	if (ids.length < 2)
	{
		return "";
	}
	var wanted = g_WodaSearch.regionPicked ? g_WodaSearch.region : g_WodaSearch.lastRegion;
	if (wanted && ids.indexOf(wanted) >= 0)
	{
		return wanted;
	}
	var recommended = String((g_WodaSearch.counts[mode] || {}).recommended || "");
	return ids.indexOf(recommended) >= 0 ? recommended : ids[0];
}

function WodaSearchCountText(label, info, region)
{
	if (!info || Number(info.known) <= 0)
	{
		label.text = "";
		label.SetHasClass("HasPlayers", false);
		return;
	}
	var searching = Number(info.searching) || 0;
	if (region && info.by_region)
	{
		searching = Number(info.by_region[region]) || 0;
	}
	label.SetDialogVariableInt("count", searching);
	label.SetDialogVariableInt("needed", Number(info.needed) || 0);
	label.text = $.Localize("#woda_search_in_queue", label);
	label.SetHasClass("HasPlayers", searching > 0);
}

function WodaUpdateSearchCounts()
{
	for (var mode in g_WodaSearch.countLabels)
	{
		WodaSearchCountText(g_WodaSearch.countLabels[mode], g_WodaSearch.counts[mode], WodaSearchRegionFor(mode));
	}
	var info = g_WodaSearch.counts[g_WodaSearch.selected];
	for (var id in g_WodaSearch.regionLabels)
	{
		WodaSearchCountText(g_WodaSearch.regionLabels[id], info, id);
	}
}

function WodaMarkSearchRegion()
{
	var selected = WodaSearchRegionFor(g_WodaSearch.selected);
	for (var id in g_WodaSearch.regionCards)
	{
		g_WodaSearch.regionCards[id].SetHasClass("Selected", id === selected);
	}
}

function WodaSelectSearchRegion(id)
{
	g_WodaSearch.regionPicked = true;
	g_WodaSearch.region = id;
	WodaMarkSearchRegion();
	WodaUpdateSearchCounts();
}

function WodaRenderSearchRegions()
{
	var list = $("#WodaSearchRegionList");
	if (!list)
	{
		return;
	}
	list.RemoveAndDeleteChildren();
	g_WodaSearch.regionCards = {};
	g_WodaSearch.regionLabels = {};
	var mode = g_WodaSearch.selected;
	var ids = WodaSearchModeRegions(mode);
	list.visible = ids.length > 1;
	if (ids.length < 2)
	{
		return;
	}
	var recommended = String((g_WodaSearch.counts[mode] || {}).recommended || "");
	for (var i = 0; i < ids.length; i++)
	{
		WodaBuildRegionCard(list, ids[i], g_WodaSearch.regions[ids[i]] || {}, recommended, true);
	}
	WodaMarkSearchRegion();
}

function WodaBuildModeCard(parent, mode)
{
	var card = $.CreatePanel("Panel", parent, "WodaModeCard_" + mode);
	card.AddClass("WodaRegionCard");
	card.AddClass("WodaModeCard");

	var name = $.CreatePanel("Label", card, "");
	name.AddClass("WodaRegionName");
	name.AddClass("WodaModeName");
	name.text = WodaModeName(mode);

	var count = $.CreatePanel("Label", card, "");
	count.AddClass("WodaModeCount");
	g_WodaSearch.countLabels[mode] = count;

	card.SetHasClass("Locked", !!g_WodaSearch.locked[mode]);
	card.SetPanelEvent("onactivate", function() { if (g_WodaSearch.leader) { g_WodaSearch.picked = true; WodaSelectMode(mode); } });
	card.SetPanelEvent("ondblclick", function() { if (g_WodaSearch.leader) { g_WodaSearch.picked = true; WodaSelectMode(mode); WodaStartSearch(mode); } });
	return card;
}

function WodaRenderSearchChoice(status)
{
	var picker = $("#WodaSearchPicker");
	var list = $("#WodaModeList");
	if (!picker || !list)
	{
		return;
	}
	g_WodaSearch.leader = Number(status.leader) > 0;
	g_WodaSearch.counts = status.counts || {};
	g_WodaSearch.regions = status.regions || {};
	g_WodaSearch.lastRegion = String(status.region || "");
	g_WodaSearch.locked = {};
	WodaSplitList(status.locked).forEach(function(mode) { g_WodaSearch.locked[mode] = true; });
	list.RemoveAndDeleteChildren();
	g_WodaSearch.cards = {};
	g_WodaSearch.countLabels = {};
	var modes = String(status.modes || "").split(",").filter(function(x) { return x !== ""; });
	var preferred = String(status.preferred || "");
	if (!g_WodaSearch.picked || !g_WodaSearch.selected || modes.indexOf(g_WodaSearch.selected) < 0)
	{
		g_WodaSearch.selected = modes.indexOf(preferred) >= 0 ? preferred : modes[0];
	}
	var row = null;
	for (var i = 0; i < modes.length; i++)
	{
		if (i % 2 === 0)
		{
			row = $.CreatePanel("Panel", list, "");
			row.AddClass("WodaModeRow");
		}
		g_WodaSearch.cards[modes[i]] = WodaBuildModeCard(row, modes[i]);
	}
	WodaSelectMode(g_WodaSearch.selected);
	WodaRenderSearchRegions();
	WodaUpdateSearchCounts();
	var note = $("#WodaSearchLeaderNote");
	note.text = $.Localize(WodaSplitList(status.region_order).length > 1 ? "#woda_search_leader_region" : "#woda_search_leader");
	$("#WodaSearchStart").visible = g_WodaSearch.leader;
	note.visible = !g_WodaSearch.leader;
	picker.SetHasClass("Visible", true);
}

function WodaFormatTime(seconds)
{
	var total = Math.max(0, Math.floor(seconds));
	var minutes = Math.floor(total / 60);
	var rest = total % 60;
	return minutes + ":" + (rest < 10 ? "0" : "") + rest;
}

function WodaUpdateSearchText()
{
	var status = g_WodaSearch.status;
	var modeLabel = $("#WodaSearchMode");
	var progress = $("#WodaSearchProgress");
	var time = $("#WodaSearchTime");
	if (!status || !modeLabel || !progress || !time)
	{
		return;
	}
	modeLabel.text = WodaModeName(status.search_mode);
	var found = status.state === "search_found";
	progress.SetHasClass("Found", found);
	if (found)
	{
		progress.text = $.Localize("#woda_search_found");
		progress.visible = true;
		time.visible = false;
		return;
	}
	if (Number(status.needed) > 0)
	{
		progress.SetDialogVariableInt("count", Number(status.searching) || 0);
		progress.SetDialogVariableInt("needed", Number(status.needed) || 0);
		progress.text = $.Localize("#woda_search_progress", progress);
		progress.visible = true;
	}
	else
	{
		progress.visible = false;
	}
	time.SetDialogVariable("time", WodaFormatTime((Date.now() - g_WodaSearch.startedAt) / 1000));
	time.text = $.Localize("#woda_search_time", time);
	time.visible = true;
}

function WodaRenderSearching(status)
{
	var box = $("#WodaSearchBox");
	if (!box)
	{
		return;
	}
	g_WodaSearch.status = status;
	g_WodaSearch.startedAt = Date.now() - (Number(status.elapsed) || 0) * 1000;
	$("#WodaSearchCancel").visible = Number(status.can_cancel) > 0;
	WodaUpdateSearchText();
	box.SetHasClass("Visible", true);
}

function WodaHideSearch()
{
	var picker = $("#WodaSearchPicker");
	if (picker)
	{
		picker.SetHasClass("Visible", false);
	}
	var box = $("#WodaSearchBox");
	if (box)
	{
		box.SetHasClass("Visible", false);
	}
	$("#WodaSearchStart").visible = false;
	$("#WodaSearchLeaderNote").visible = false;
	g_WodaSearch.status = null;
}

function WodaParseBans(text)
{
	var entries = [];
	var parts = String(text || "").split(",");
	for (var i = 0; i < parts.length; i++)
	{
		var fields = parts[i].split(":");
		if (fields.length >= 2 && fields[0] !== "")
		{
			entries.push({ sid: fields[0], left: Number(fields[1]) || 0, pid: fields.length >= 3 ? Number(fields[2]) : -1 });
		}
	}
	return entries;
}

function WodaUpdateBanText()
{
	var box = $("#WodaBanBox");
	if (!box || !box.BHasClass("Visible") || g_WodaBan.entries.length === 0)
	{
		return;
	}
	var elapsed = (Date.now() - g_WodaBan.receivedAt) / 1000;
	var local = Players.GetLocalPlayer();
	var own = null;
	var other = null;
	for (var i = 0; i < g_WodaBan.entries.length; i++)
	{
		var entry = g_WodaBan.entries[i];
		var left = Math.ceil(entry.left - elapsed);
		if (left <= 0)
		{
			continue;
		}
		if (entry.pid === local)
		{
			own = own || { sid: entry.sid, left: left };
		}
		else
		{
			other = other || { sid: entry.sid, left: left };
		}
	}
	var shown = own || other;
	var text = $("#WodaBanText");
	var leftLabel = $("#WodaBanLeft");
	var player = $("#WodaBanPlayer");
	if (!shown)
	{
		leftLabel.text = "";
		return;
	}
	text.text = $.Localize(own ? "#woda_search_ban_self" : "#woda_search_ban_party");
	if (own)
	{
		player.visible = false;
	}
	else
	{
		if (g_WodaBan.partner !== other.sid)
		{
			player.RemoveAndDeleteChildren();
			var avatar = $.CreatePanel("DOTAAvatarImage", player, "", { accountid: other.sid });
			avatar.AddClass("WodaBanAvatar");
			var name = $.CreatePanel("DOTAUserName", player, "", { accountid: other.sid });
			name.AddClass("WodaBanName");
			g_WodaBan.partner = other.sid;
		}
		player.visible = true;
	}
	leftLabel.SetDialogVariable("time", WodaFormatTime(shown.left));
	leftLabel.text = $.Localize("#woda_search_ban_left", leftLabel);
}

function WodaRenderBan(status)
{
	var box = $("#WodaBanBox");
	if (!box)
	{
		return;
	}
	g_WodaBan.entries = WodaParseBans(status.bans);
	g_WodaBan.receivedAt = Date.now();
	box.SetHasClass("Visible", true);
	WodaUpdateBanText();
}

function WodaHideBan()
{
	var box = $("#WodaBanBox");
	if (box)
	{
		box.SetHasClass("Visible", false);
	}
	g_WodaBan.entries = [];
}

function WodaSendParty(action, target, block)
{
	GameEvents.SendCustomGameEventToServer("event_woda_region_choice", { action: action, region: "", mode: "", target: target || "", block: block ? 1 : 0 });
}

function WodaParsePairs(text)
{
	var entries = [];
	var parts = WodaSplitList(text);
	for (var i = 0; i < parts.length; i++)
	{
		var fields = parts[i].split(":");
		if (fields[0] !== "")
		{
			entries.push({ id: fields[0], left: Number(fields[1]) || 0 });
		}
	}
	return entries;
}

function WodaPartyShown()
{
	var data = g_WodaParty.data;
	var state = g_WodaParty.state;
	return !!data && Number(data.enabled) > 0 && (state === "search_choose" || state === "searching" || state === "search_found");
}

function WodaBuildPartySlot(parent, id, leader, offline, pending)
{
	var slot = $.CreatePanel("Panel", parent, "");
	slot.AddClass("WodaPartySlot");
	slot.SetHasClass("Leader", leader);
	slot.SetHasClass("Offline", offline);
	slot.SetHasClass("Pending", pending);
	var avatar = $.CreatePanel("DOTAAvatarImage", slot, "", { accountid: id });
	avatar.AddClass("WodaPartyAvatar");
	var name = $.CreatePanel("DOTAUserName", slot, "", { accountid: id });
	name.AddClass("WodaPartyName");
	if (leader)
	{
		var chip = $.CreatePanel("Label", slot, "");
		chip.AddClass("WodaRegionChip");
		chip.text = $.Localize("#woda_party_leader");
	}
	else if (pending || offline)
	{
		var state = $.CreatePanel("Label", slot, "");
		state.AddClass("WodaPartyState");
		state.text = $.Localize(pending ? "#woda_party_pending" : "#woda_party_offline");
	}
	return slot;
}

function WodaRenderPartySlots(data)
{
	var list = $("#WodaPartySlots");
	var members = WodaSplitList(data.members);
	var online = WodaSplitList(data.online);
	var sent = WodaParsePairs(data.sent);
	var pendingIds = [];
	for (var s = 0; s < sent.length; s++)
	{
		if (members.indexOf(sent[s].id) < 0 && pendingIds.indexOf(sent[s].id) < 0)
		{
			pendingIds.push(sent[s].id);
		}
	}
	var key = members.join(",") + "|" + online.join(",") + "|" + String(data.leader || "") + "|" + pendingIds.join(",");
	if (key === g_WodaParty.slotsKey)
	{
		return;
	}
	g_WodaParty.slotsKey = key;
	list.RemoveAndDeleteChildren();
	var inParty = members.length > 1;
	for (var i = 0; i < members.length; i++)
	{
		WodaBuildPartySlot(list, members[i], inParty && members[i] === String(data.leader || ""), online[i] === "0", false);
	}
	for (var p = 0; p < pendingIds.length; p++)
	{
		WodaBuildPartySlot(list, pendingIds[p], false, false, true);
	}
}

function WodaUpdatePartyNote()
{
	var note = $("#WodaPartyNote");
	var data = g_WodaParty.data;
	if (!note || !data)
	{
		return;
	}
	var text = "";
	var bad = false;
	var good = false;
	var code = String(data.notice || "");
	if (code !== "" && Date.now() - g_WodaParty.noticeAt < 6000)
	{
		var codeName = code.replace(/^party_/, "");
		text = WodaLocalizeOr("#woda_party_notice_" + codeName, code);
		good = codeName === "sent";
		bad = !good;
	}
	else if (String(data.follow || "") !== "")
	{
		text = $.Localize("#woda_party_search_by");
		good = true;
	}
	note.text = text;
	note.SetHasClass("Bad", bad);
	note.SetHasClass("Good", good);
	note.visible = text !== "";
}

function WodaRenderParty()
{
	var bar = $("#WodaPartyBar");
	if (!bar)
	{
		return;
	}
	var shown = WodaPartyShown();
	bar.SetHasClass("Visible", shown);
	if (shown)
	{
		var data = g_WodaParty.data;
		WodaRenderPartySlots(data);
		$("#WodaPartyInviteRow").visible = Number(data.can_invite) > 0;
		$("#WodaPartyLeave").visible = Number(data.can_leave) > 0;
		WodaUpdatePartyNote();
	}
	WodaRenderInvite();
}

function WodaRenderInvite()
{
	var overlay = $("#WodaInviteOverlay");
	if (!overlay)
	{
		return;
	}
	var data = g_WodaParty.data;
	var invite = null;
	if (WodaPartyShown() && Number(data.can_answer) > 0)
	{
		var invites = WodaParsePairs(data.invites);
		var elapsed = (Date.now() - g_WodaParty.receivedAt) / 1000;
		for (var i = 0; i < invites.length; i++)
		{
			if (!g_WodaParty.dismissed[invites[i].id] && invites[i].left - elapsed > 0)
			{
				invite = invites[i];
				break;
			}
		}
	}
	g_WodaParty.invite = invite;
	if (invite && g_WodaParty.inviteKey !== invite.id)
	{
		g_WodaParty.inviteKey = invite.id;
		WodaSetInviteBlock(false);
		var player = $("#WodaInvitePlayer");
		player.RemoveAndDeleteChildren();
		var avatar = $.CreatePanel("DOTAAvatarImage", player, "", { accountid: invite.id });
		avatar.AddClass("WodaBanAvatar");
		var name = $.CreatePanel("DOTAUserName", player, "", { accountid: invite.id });
		name.AddClass("WodaBanName");
	}
	if (!invite)
	{
		g_WodaParty.inviteKey = "";
	}
	overlay.SetHasClass("Visible", !!invite);
	WodaUpdateInviteLeft();
}

function WodaUpdateInviteLeft()
{
	var label = $("#WodaInviteLeft");
	var invite = g_WodaParty.invite;
	if (!label || !invite)
	{
		return;
	}
	var left = Math.ceil(invite.left - (Date.now() - g_WodaParty.receivedAt) / 1000);
	if (left <= 0)
	{
		WodaRenderInvite();
		return;
	}
	label.SetDialogVariableInt("seconds", left);
	label.text = $.Localize("#woda_party_invite_left", label);
}

function WodaAnswerInvite(accept)
{
	var invite = g_WodaParty.invite;
	if (!invite)
	{
		return;
	}
	g_WodaParty.dismissed[invite.id] = true;
	WodaSendParty(accept ? "party_accept" : "party_decline", invite.id, !accept && g_WodaParty.inviteBlock);
	WodaRenderInvite();
}

function WodaSetInviteBlock(on)
{
	g_WodaParty.inviteBlock = !!on;
	var box = $("#WodaInviteBlock");
	if (box)
	{
		box.SetHasClass("Checked", g_WodaParty.inviteBlock);
	}
}

function WodaSendInvite()
{
	var entry = $("#WodaPartyInviteId");
	var text = String(entry.text || "").replace(/\s+/g, "");
	if (text === "")
	{
		return;
	}
	WodaSendParty("party_invite", text);
	entry.text = "";
}

function WodaApplyParty(data)
{
	if (!data)
	{
		return;
	}
	g_WodaParty.updatedAt = data.updated_at;
	g_WodaParty.data = data;
	g_WodaParty.receivedAt = Date.now();
	if (Number(data.notice_serial) !== g_WodaParty.noticeSerial)
	{
		g_WodaParty.noticeSerial = Number(data.notice_serial);
		g_WodaParty.noticeAt = String(data.notice || "") !== "" ? Date.now() : 0;
	}
	var invites = WodaParsePairs(data.invites);
	var listed = {};
	for (var i = 0; i < invites.length; i++)
	{
		listed[invites[i].id] = true;
	}
	for (var id in g_WodaParty.dismissed)
	{
		if (!listed[id])
		{
			delete g_WodaParty.dismissed[id];
		}
	}
	WodaRenderParty();
}

function WodaMatchSound(state)
{
	if (state === "search_found" || (state === "ready" && g_WodaSound.searching))
	{
		if (!g_WodaSound.played)
		{
			g_WodaSound.played = true;
			Game.EmitSound("Stinger.MatchReady");
		}
	}
	else if (state === "searching" || state === "search_choose")
	{
		g_WodaSound.played = false;
	}
	g_WodaSound.searching = state === "searching" || state === "search_found";
}

function WodaSelectRegion(id)
{
	g_WodaRegion.selected = id;
	var list = $("#WodaRegionList");
	if (!list)
	{
		return;
	}
	var children = list.Children();
	for (var i = 0; i < children.length; i++)
	{
		children[i].SetHasClass("Selected", children[i].id === "WodaRegionCard_" + id);
	}
}

function WodaBuildRegionCard(parent, id, info, recommended, search)
{
	var card = $.CreatePanel("Panel", parent, (search ? "WodaSearchRegionCard_" : "WodaRegionCard_") + id);
	card.AddClass("WodaRegionCard");

	var chip = $.CreatePanel("Label", card, "");
	chip.AddClass("WodaRegionChip");
	chip.SetHasClass("Hidden", recommended !== id);
	chip.text = $.Localize("#woda_region_recommended");

	var name = $.CreatePanel("Label", card, "");
	name.AddClass("WodaRegionName");
	name.text = WodaRegionName(id);

	var ping = Number(info.ping) || 0;
	if ((info.source || "none") === "none")
	{
		ping = 0;
	}
	var pingLabel = $.CreatePanel("Label", card, "");
	pingLabel.AddClass("WodaRegionPing");
	if (ping > 0)
	{
		pingLabel.SetDialogVariableInt("ping", ping);
		pingLabel.text = $.Localize("#woda_region_ping", pingLabel);
		pingLabel.SetHasClass("Good", ping <= 90);
		pingLabel.SetHasClass("Bad", ping > 150);
	}
	else
	{
		pingLabel.text = $.Localize("#woda_region_ping_none");
	}

	var free = $.CreatePanel("Label", card, "");
	free.AddClass("WodaRegionFree");
	if (search)
	{
		g_WodaSearch.regionCards[id] = card;
		g_WodaSearch.regionLabels[id] = free;
		card.SetPanelEvent("onactivate", function() { if (g_WodaSearch.leader) { WodaSelectSearchRegion(id); } });
		card.SetPanelEvent("ondblclick", function() { if (g_WodaSearch.leader) { WodaSelectSearchRegion(id); WodaStartSearch(g_WodaSearch.selected); } });
		return card;
	}
	var freeCount = Number(info.free) || 0;
	if (freeCount > 0)
	{
		free.SetDialogVariableInt("free", freeCount);
		free.text = $.Localize("#woda_region_free", free);
	}
	else
	{
		free.AddClass("Full");
		free.text = $.Localize("#woda_region_full");
	}

	card.SetPanelEvent("onactivate", function() { WodaSelectRegion(id); });
	card.SetPanelEvent("ondblclick", function() { WodaSelectRegion(id); WodaSendRegionChoice("connect", id); });
	return card;
}

function WodaRenderPicker(status)
{
	var picker = $("#WodaRegionPicker");
	var list = $("#WodaRegionList");
	if (!picker || !list)
	{
		return;
	}
	list.RemoveAndDeleteChildren();
	var order = String(status.order || "").split(",").filter(function(x) { return x !== ""; });
	var regions = status.regions || {};
	if (!g_WodaRegion.selected || order.indexOf(g_WodaRegion.selected) < 0)
	{
		g_WodaRegion.selected = (status.recommended && order.indexOf(status.recommended) >= 0) ? status.recommended : order[0];
	}
	for (var i = 0; i < order.length; i++)
	{
		WodaBuildRegionCard(list, order[i], regions[order[i]] || {}, status.recommended);
	}
	WodaSelectRegion(g_WodaRegion.selected);
	picker.SetHasClass("ModeChoose", true);
	picker.SetHasClass("ModeSession", false);
	picker.SetHasClass("Visible", true);
}

function WodaRenderSession(status)
{
	var picker = $("#WodaRegionPicker");
	if (!picker)
	{
		return;
	}
	var text = $("#WodaSessionText");
	if (text)
	{
		text.text = $.Localize("#woda_session_title") + (status.search_mode ? "\n" + WodaModeName(status.search_mode) : "") + (status.region ? "\n" + $.Localize("#woda_session_server") + " " + WodaRegionName(status.region) : "");
	}
	var sessionSerial = String(status.serial || "");
	if (g_WodaRegion.sessionSerial !== sessionSerial)
	{
		g_WodaRegion.sessionSerial = sessionSerial;
		g_WodaRegion.newConfirm = Number(status.new_confirm) > 0;
	}
	WodaShowSessionConfirm();
	picker.SetHasClass("ModeChoose", false);
	picker.SetHasClass("ModeSession", true);
	picker.SetHasClass("Visible", true);
}

function WodaHidePicker()
{
	var picker = $("#WodaRegionPicker");
	if (picker)
	{
		picker.SetHasClass("Visible", false);
	}
	g_WodaRegion.mode = null;
	g_WodaRegion.deadline = 0;
	g_WodaRegion.newConfirm = false;
	g_WodaRegion.sessionSerial = null;
	WodaShowSessionConfirm();
}

function WodaShowSessionConfirm()
{
	var overlay = $("#WodaConfirmOverlay");
	if (overlay)
	{
		if (g_WodaRegion.newConfirm && !overlay.BHasClass("Visible"))
		{
			g_WodaRegion.confirmArmedAt = Date.now() + 600;
		}
		overlay.SetHasClass("Visible", g_WodaRegion.newConfirm);
	}
}

function WodaCloseSessionConfirm()
{
	g_WodaRegion.newConfirm = false;
	WodaShowSessionConfirm();
}

function WodaConfirmSessionNew()
{
	if (Date.now() < g_WodaRegion.confirmArmedAt)
	{
		return;
	}
	WodaCloseSessionConfirm();
	WodaSendRegionChoice("new", "");
}

function WodaUpdateCountdown()
{
	var label = $("#WodaRegionCountdown");
	if (label)
	{
		if (g_WodaRegion.mode && g_WodaRegion.deadline > 0)
		{
			var left = Math.max(0, Math.ceil((g_WodaRegion.deadline - Date.now()) / 1000));
			label.SetDialogVariableInt("seconds", left);
			label.text = $.Localize(g_WodaRegion.mode === "session" ? "#woda_session_countdown" : "#woda_region_countdown", label);
			label.visible = true;
		}
		else
		{
			label.visible = false;
		}
	}
	WodaUpdateSearchText();
	WodaUpdateBanText();
	WodaUpdatePartyNote();
	WodaUpdateInviteLeft();
	$.Schedule(0.5, WodaUpdateCountdown);
}

function WodaOnSessionNew()
{
	g_WodaRegion.newConfirm = true;
	WodaShowSessionConfirm();
}

function WodaBindButtons()
{
	$("#WodaRegionConnect").SetPanelEvent("onactivate", function() { WodaSendRegionChoice("connect", g_WodaRegion.selected); });
	$("#WodaSessionReconnect").SetPanelEvent("onactivate", function() { WodaSendRegionChoice("reconnect", ""); });
	$("#WodaSessionNew").SetPanelEvent("onactivate", WodaOnSessionNew);
	$("#WodaConfirmBack").SetPanelEvent("onactivate", WodaCloseSessionConfirm);
	$("#WodaConfirmNew").SetPanelEvent("onactivate", WodaConfirmSessionNew);
	$("#WodaChangeServer").SetPanelEvent("onactivate", function() { WodaSendRegionChoice("change", ""); });
	$("#WodaSearchStart").SetPanelEvent("onactivate", function() { WodaStartSearch(g_WodaSearch.selected); });
	$("#WodaSearchStart").SetPanelEvent("onmouseover", function()
	{
		if (g_WodaSearch.locked[g_WodaSearch.selected])
		{
			$.DispatchEvent("UIShowCustomLayoutParametersTooltip", $("#WodaSearchStart"), WODA_TEAMING_TOOLTIP_ID, WODA_TEAMING_TOOLTIP_LAYOUT, "text=woda_party_notice_teaming");
		}
	});
	$("#WodaSearchStart").SetPanelEvent("onmouseout", function() { $.DispatchEvent("UIHideCustomLayoutTooltip", $("#WodaSearchStart"), WODA_TEAMING_TOOLTIP_ID); });
	$("#WodaSearchCancel").SetPanelEvent("onactivate", function() { WodaSendRegionChoice("cancel", ""); });
	$("#WodaPartyInviteSend").SetPanelEvent("onactivate", WodaSendInvite);
	$("#WodaPartyInviteId").SetPanelEvent("oninputsubmit", WodaSendInvite);
	$("#WodaPartyLeave").SetPanelEvent("onactivate", function() { WodaSendParty("party_leave", ""); });
	$("#WodaInviteAccept").SetPanelEvent("onactivate", function() { WodaAnswerInvite(true); });
	$("#WodaInviteDecline").SetPanelEvent("onactivate", function() { WodaAnswerInvite(false); });
	$("#WodaInviteBlock").SetPanelEvent("onactivate", function() { WodaSetInviteBlock(!g_WodaParty.inviteBlock); });
}

function WodaUpdateStatusText(state, status)
{
	var label = $("#WodaConnectStatus");
	if (!label)
	{
		return;
	}
	label.SetDialogVariableInt("position", Number(status.position) || 0);
	var key = WODA_CONNECT_STATE_KEYS[state] || WODA_CONNECT_STATE_KEYS.waiting;
	if (state === "search_choose" && WodaSplitList(status.region_order).length > 1)
	{
		key = "#woda_connect_search_choose_region";
	}
	var text = $.Localize(key, label);
	if (state === "session" && (!text || text === key || text === key.substring(1)))
	{
		text = $.Localize("#woda_session_title");
	}
	if (state === "error" && status.reason)
	{
		text += " (" + status.reason + ")";
	}
	if (status.party_region)
	{
		text = $.Localize("#woda_region_party") + " " + WodaRegionName(status.party_region) + "\n" + text;
	}
	else if (status.region && (state === "requesting" || state === "queued" || state === "ready" || state === "searching" || state === "search_found"))
	{
		text += "\n" + WodaRegionName(status.region);
	}
	label.text = text;
	var note = $("#WodaConnectNote");
	if (note)
	{
		var reason = (state === "queued" && status.reason) ? String(status.reason) : "";
		note.text = reason !== "" ? WodaLocalizeOr("#woda_queue_reason_" + reason, reason) : "";
		note.visible = reason !== "";
	}
	var box = $("#WodaConnectBox");
	box.SetHasClass("Error", state === "error" || state === "search_ban");
	box.SetHasClass("Ready", state === "ready" || state === "relaunch" || state === "search_found");
	box.SetHasClass("CanChange", state === "queued" && !!status.can_change);
}

function WodaApplyStatus(status)
{
	if (!status)
	{
		return;
	}
	g_WodaStatusTime = status.updated_at;
	$("#WodaConnectBox").SetHasClass("Visible", true);
	var state = status.state || "waiting";
	WodaMatchSound(state);
	g_WodaParty.state = state;
	WodaRenderParty();
	if (state === "search_ban")
	{
		WodaHidePicker();
		WodaHideSearch();
		WodaRenderBan(status);
		WodaUpdateStatusText(state, status);
		return;
	}
	WodaHideBan();
	if (state === "search_choose")
	{
		WodaHidePicker();
		$("#WodaSearchBox").SetHasClass("Visible", false);
		g_WodaSearch.status = null;
		WodaRenderSearchChoice(status);
		WodaUpdateStatusText(state, status);
		return;
	}
	if (state === "searching" || state === "search_found")
	{
		WodaHidePicker();
		$("#WodaSearchPicker").SetHasClass("Visible", false);
		WodaRenderSearching(status);
		WodaUpdateStatusText(state, status);
		return;
	}
	WodaHideSearch();
	if (state === "choose" || state === "session")
	{
		if (g_WodaRegion.serial !== status.updated_at)
		{
			g_WodaRegion.serial = status.updated_at;
			var chooseSec = Number(status.choose_sec) || 0;
			g_WodaRegion.deadline = chooseSec > 0 ? Date.now() + chooseSec * 1000 : 0;
		}
		g_WodaRegion.mode = state;
		if (state === "choose")
		{
			WodaCloseSessionConfirm();
			WodaRenderPicker(status);
		}
		else
		{
			WodaRenderSession(status);
		}
		WodaUpdateStatusText(state, status);
		return;
	}
	WodaHidePicker();
	WodaUpdateStatusText(state, status);
}

function WodaOnStatusChanged(tableName, key, value)
{
	if (key === "party")
	{
		WodaApplyParty(value);
		return;
	}
	if (key !== "status")
	{
		return;
	}
	WodaApplyStatus(value);
}

function WodaPollStatus()
{
	var status = CustomNetTables.GetTableValue("woda_connect", "status");
	if (status && status.updated_at !== g_WodaStatusTime)
	{
		WodaApplyStatus(status);
	}
	var party = CustomNetTables.GetTableValue("woda_connect", "party");
	if (party && party.updated_at !== g_WodaParty.updatedAt)
	{
		WodaApplyParty(party);
	}
	$.Schedule(1.0, WodaPollStatus);
}

function WodaReadConvarInt(name)
{
	try
	{
		return Game.GetConvarInt(name) || 0;
	}
	catch (e)
	{
		return 0;
	}
}

function WodaSendPartyInfo()
{
	var ids = [];
	var groups = {};
	var groupOrder = [];
	for (var i = 1; i <= 8; i++)
	{
		var value = WodaReadConvarInt("woda_party_" + i);
		if (value > 0)
		{
			var steamId = String(value);
			ids.push(steamId);
			var group = WodaReadConvarInt("woda_group_" + i) || (100 + i);
			if (!groups[group])
			{
				groups[group] = [];
				groupOrder.push(group);
			}
			groups[group].push(steamId);
		}
	}
	var groupTexts = [];
	for (var g = 0; g < groupOrder.length; g++)
	{
		groupTexts.push(groups[groupOrder[g]].join(","));
	}
	var lang = "";
	try
	{
		lang = String($.Language() || "");
	}
	catch (e)
	{
		lang = "";
	}
	GameEvents.SendCustomGameEventToServer("event_woda_party_info", {
		ids: ids.join(","),
		groups: groupTexts.join("-"),
		mode: WodaReadConvarInt("woda_party_mode"),
		launch: WodaReadConvarInt("woda_local_launch"),
		lang: lang
	});
}

(function()
{
	Game.AutoAssignPlayersToTeams();
	WodaBindButtons();
	CustomNetTables.SubscribeNetTableListener("woda_connect", WodaOnStatusChanged);
	WodaUpdateCountdown();
	WodaPollStatus();
	WodaSendPartyInfo();
	$.Schedule(2.0, WodaSendPartyInfo);
	$.Schedule(6.0, WodaSendPartyInfo);
})();