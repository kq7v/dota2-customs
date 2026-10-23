--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_crystal_maiden_blueheart_custom",
	"abilities/crystal_maiden/crystal_maiden_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)

crystal_maiden_innate_custom = class({})

function crystal_maiden_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_crystal_maiden.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/vo_custom/crystal_maiden_vo_custom.vsndevts", context)
end

function crystal_maiden_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_crystal_maiden_blueheart_custom"
end

modifier_crystal_maiden_blueheart_custom = class(mod_hidden)
function modifier_crystal_maiden_blueheart_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.mana = self.ability:GetSpecialValueFor("mana")
	self.int = self.ability:GetSpecialValueFor("int") / 100

	if not IsServer() then
		return
	end
	self:StartIntervalThink(1)
end

function modifier_crystal_maiden_blueheart_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:HasModifier("modifier_player_main_custom") then
		return
	end

	self.parent:AddPercentStat({ int = self.int }, self)
	self:StartIntervalThink(-1)
end

function modifier_crystal_maiden_blueheart_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE,
	}
end

function modifier_crystal_maiden_blueheart_custom:GetModifierTotalPercentageManaRegen()
	return self.mana
end