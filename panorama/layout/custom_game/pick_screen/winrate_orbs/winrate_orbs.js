--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


const LOCAL_PID = Game.GetLocalPlayerID();

function ApplyOrbBonuses(winrateOrbs) {
	if (!winrateOrbs) return;
	var preGameRoot = FindDotaHudElement("PreGame");
	const heroCards = preGameRoot.FindChildrenWithClassTraverse("HeroCard");
	if (heroCards.length === 0) {
		$.Schedule(0.1, () => ApplyOrbBonuses(winrateOrbs));
		return;
	}

	let heroes_without_bonus = [];
	let playersStats = CustomNetTables.GetTableValue("game_state", "player_stats");
	if (playersStats && playersStats[LOCAL_PID] && playersStats[LOCAL_PID].lastWinnerHeroes) {
		heroes_without_bonus = Object.values(playersStats[LOCAL_PID].lastWinnerHeroes);
	}

	for (var heroCard of heroCards) {
		const heroImage = heroCard.FindChildTraverse("HeroImage");
		heroImage.style.paddingTop = "4px";

		if (!heroImage) continue;

		const shortName = heroImage.heroname;
		const heroName = "npc_dota_hero_" + shortName;

		if (heroes_without_bonus.indexOf(heroName) > -1) continue;

		const count = winrateOrbs[heroName];
		if (!count || count <= 0) continue;

		const bonusOrbBackground =
			heroImage.FindChild("BonusOrbBackground") || $.CreatePanel("Panel", heroImage, "BonusOrbBackground");
		bonusOrbBackground.style.width = "fit-children";
		bonusOrbBackground.style.align = "right top";
		bonusOrbBackground.style.horizontalAlign = "center";
		bonusOrbBackground.style.flowChildren = "right";

		const orbCountLabel =
			bonusOrbBackground.FindChild("BonusOrbCount") ||
			$.CreatePanel("Label", bonusOrbBackground, "BonusOrbCount");
		orbCountLabel.style.height = "31px";
		orbCountLabel.style.textShadow = "0px 0px 3px 3 #22222299";
		orbCountLabel.style.fontFamily = "Reaver";
		orbCountLabel.style.fontSize = "12px";
		orbCountLabel.style.color = "white";
		orbCountLabel.style.fontWeight = "bold";
		orbCountLabel.style.flowChildren = "none";
		orbCountLabel.style.textAlign = "left";
		orbCountLabel.style.horizontalAlign = "center";
		orbCountLabel.style.zIndex = "2";
		orbCountLabel.text = count + "x";

		const orbIconImage =
			bonusOrbBackground.FindChild("BonusOrbIcon") || $.CreatePanel("Panel", bonusOrbBackground, "BonusOrbIcon");
		orbIconImage.style.backgroundImage = `url("file://{images}/custom_game/upgrades/orb_common_bonus_2.png")`;
		orbIconImage.style.backgroundRepeat = "no-repeat";
		orbIconImage.style.backgroundSize = "51px 31px";
		orbIconImage.style.backgroundPosition = "-32px 0px";
		orbIconImage.style.width = "11px";
		orbIconImage.style.height = "31px";
		orbIconImage.style.overflow = "noclip";
		orbIconImage.style.zIndex = "1";
	}
}

SubscribeToNetTableKey("winrates", "orbs", ApplyOrbBonuses);