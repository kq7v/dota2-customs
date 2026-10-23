--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_echo_sabre_custom", "abilities/items/item_echo_sabre_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_echo_sabre_custom_speed",
	"abilities/items/item_echo_sabre_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_echo_sabre_custom_slow",
	"abilities/items/item_echo_sabre_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_echo_sabre_custom = class({})

function item_echo_sabre_custom:GetIntrinsicModifierName()
	return "modifier_item_echo_sabre_custom"
end

function item_echo_sabre_custom:Spawn()
	self.bonus_mana_regen = self:GetSpecialValueFor("bonus_mana_regen")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_strength = self:GetSpecialValueFor("bonus_strength")
	self.slow_duration = self:GetSpecialValueFor("slow_duration")
	self.speed = self:GetSpecialValueFor("speed")
end

modifier_item_echo_sabre_custom = class(mod_hidden)
function modifier_item_echo_sabre_custom:RemoveOnDeath()
	return false
end
function modifier_item_echo_sabre_custom:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if
		self.parent:IsRealHero() and not self.parent:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
	then
		self.parent:AddAttackStartEvent_out(self)
		self.parent:AddProc(self, { group = "echo_harpoon", extra = false, any = true })
	end

	self.regen = self.ability.bonus_mana_regen
	self.damage = self.ability.bonus_damage
	self.str = self.ability.bonus_strength
	self.slow_duration = self.ability.slow_duration
end

function modifier_item_echo_sabre_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
	}
end

function modifier_item_echo_sabre_custom:StartSpeed(target, slow)
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	if self.parent:HasModifier("modifier_marci_unleash_custom") then
		return
	end

	self.ability:StartCd()
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_item_echo_sabre_custom_speed", {})

	if not self.ability then
		return
	end
	if not target:IsUnit() then
		return
	end
	if not slow then
		return
	end
	target:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_item_echo_sabre_custom_slow",
		{ duration = (1 - target:GetStatusResistance()) * self.slow_duration }
	)
end

function modifier_item_echo_sabre_custom:GetProcChance()
	if self.parent:IsRangedAttacker() then
		return 0
	end
	if not self.ability:IsFullyCastable() then
		return 0
	end
	return 100
end

function modifier_item_echo_sabre_custom:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_item_echo_sabre_custom_speed")
	if mod and mod:GetAbility() == self.ability then
		params.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_item_echo_sabre_custom_slow",
			{ duration = (1 - params.target:GetStatusResistance()) * self.slow_duration }
		)
		mod:Destroy()
	end

	if not params.procs or not params.procs[self] then
		return
	end
	self:StartSpeed(params.target, true)
end

function modifier_item_echo_sabre_custom:GetModifierConstantManaRegen()
	return self.regen
end

function modifier_item_echo_sabre_custom:GetModifierPreAttack_BonusDamage()
	return self.damage
end

function modifier_item_echo_sabre_custom:GetModifierBonusStats_Strength()
	return self.str
end

modifier_item_echo_sabre_custom_speed = class(mod_hidden)
function modifier_item_echo_sabre_custom_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.name = self.ability:GetName()

	self.speed = self.ability.speed
	if not IsServer() then
		return
	end
	self:StartIntervalThink(0.2)
end

function modifier_item_echo_sabre_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_item_echo_sabre_custom_speed:GetModifierAttackSpeedBonus_Constant(params)
	if not params.target then
		return
	end
	return self.speed
end

function modifier_item_echo_sabre_custom_speed:OnIntervalThink()
	if not IsServer() then
		return
	end

	local item = self.parent:FindItemInInventory(self.name)

	if not item or item:IsInBackpack() or self.parent:IsRangedAttacker() or not self.ability then
		self:Destroy()
	end
end

modifier_item_echo_sabre_custom_slow = class(mod_visible)
function modifier_item_echo_sabre_custom_slow:IsPurgable()
	return true
end
function modifier_item_echo_sabre_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_item_echo_sabre_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return -100
end