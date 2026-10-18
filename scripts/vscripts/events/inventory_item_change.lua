--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- disabled (was not used anyway)
-- Fired when hero loses item from inventory
function Events:OnInventoryItemChange(event)
	local item = EntIndexToHScript(event.item_entindex) ---@type CDOTA_Item
	local hero = EntIndexToHScript(event.hero_entindex) ---@type CDOTA_BaseNPC_Hero

	if not IsValidEntity(item) or not IsValidEntity(hero) or hero:IsIllusion() then
		return
	end
	if not event.removed and not event.dropped then
		print("discarded item change - not applicable to neutrals")
		return
	end

	local container = item:GetContainer()
end