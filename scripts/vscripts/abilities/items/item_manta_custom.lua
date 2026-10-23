--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("item_manta_custom_invulnerable", "abilities/items/item_manta_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("item_manta_custom_passive", "abilities/items/item_manta_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("item_manta_custom_illusion", "abilities/items/item_manta_custom", LUA_MODIFIER_MOTION_NONE)

item_manta_custom = class({})

function item_manta_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "item_manta", self)
end

function item_manta_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items2_fx/manta_phase.vpcf", context)
end

function item_manta_custom:GetIntrinsicModifierName()
	return "item_manta_custom_passive"
end

function item_manta_custom:Spawn()
	self.invuln_duration = self:GetSpecialValueFor("invuln_duration")
	self.vision_radius = self:GetSpecialValueFor("vision_radius")
	self.illusion_damage_range = self:GetSpecialValueFor("illusion_damage_range")
	self.illusion_damage_melee = self:GetSpecialValueFor("illusion_damage_melee")
	self.illusion_incoming = self:GetSpecialValueFor("illusion_incoming")
	self.illusion_duration = self:GetSpecialValueFor("illusion_duration")
	self.images_count = self:GetSpecialValueFor("images_count")
	self.bonus_agility = self:GetSpecialValueFor("bonus_agility")
	self.bonus_strength = self:GetSpecialValueFor("bonus_strength")
	self.bonus_intellect = self:GetSpecialValueFor("bonus_intellect")
	self.bonus_movement_speed = self:GetSpecialValueFor("bonus_movement_speed")
	self.bonus_attack_speed = self:GetSpecialValueFor("bonus_attack_speed")
	self.illusion_heal = self:GetSpecialValueFor("illusion_heal")
	self.illusion_move = self:GetSpecialValueFor("illusion_move")
end

function item_manta_custom:OnSpellStart()
	local caster = self:GetCaster()

	caster:EmitSound("DOTA_Item.Manta.Activate")
	caster:Purge(false, true, false, false, false)
	caster:AddNewModifier(caster, self, "item_manta_custom_invulnerable", { duration = self.invuln_duration })

	ProjectileManager:ProjectileDodge(caster)
end

item_manta_custom_invulnerable = class(mod_hidden)
function item_manta_custom_invulnerable:GetEffectName()
	return "particles/items2_fx/manta_phase.vpcf"
end
function item_manta_custom_invulnerable:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function item_manta_custom_invulnerable:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end

	self.parent:Stop()

	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetAbsOrigin(), self.ability.vision_radius, 1, false)

	local damage = self.parent:IsRangedAttacker() and self.ability.illusion_damage_range
		or self.ability.illusion_damage_melee
	local incoming = self.ability.illusion_incoming - 100
	local duration = self.ability.illusion_duration

	local illusions = CreateIllusions(self.parent, self.parent, {
		outgoing_damage = damage - 100,
		incoming_damage = incoming,
		bounty_base = self.parent:GetLevel() * 2,
		bounty_growth = nil,
		outgoing_damage_structure = nil,
		outgoing_damage_roshan = nil,
		duration = duration,
	}, self.ability.images_count, 120, true, true)

	for _, illusion in pairs(illusions) do
		illusion.owner = self.parent

		for _, mod in pairs(self.parent:FindAllModifiers()) do
			if mod.StackOnIllusion ~= nil and mod.StackOnIllusion == true then
				illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount(), mod)
			end
		end

		illusion:AddNewModifier(illusion, self.ability, "item_manta_custom_illusion", {})
	end
end

function item_manta_custom_invulnerable:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

item_manta_custom_passive = class(mod_hidden)
function item_manta_custom_passive:RemoveOnDeath()
	return false
end
function item_manta_custom_passive:GetUniqueStat()
	return self.move
end
function item_manta_custom_passive:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.agi = self.ability.bonus_agility
	self.str = self.ability.bonus_strength
	self.int = self.ability.bonus_intellect

	self.move = self.ability.bonus_movement_speed
	self.attack = self.ability.bonus_attack_speed
	self.heal = self.ability.illusion_heal / 100
	self.parent:AddUniqueStat(self, "move_bonus")

	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { land = true, illusion = true })
end

function item_manta_custom_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function item_manta_custom_passive:GetProcChance()
	return 100
end

function item_manta_custom_passive:AttackProc(params, name)
	if not IsValid(self.ability) then
		return
	end

	local attacker = params.attacker
	if
		not attacker.owner
		or attacker.owner ~= self.parent
		or not attacker:HasModifier("item_manta_custom_illusion")
	then
		return
	end

	local heal = self.parent:GetAgility() * self.heal
	attacker:GenericHeal(heal, self.ability, true, false)

	if self.parent:IsAlive() then
		self.parent:GenericHeal(heal, self.ability, true, false)
	end
end

function item_manta_custom_passive:GetModifierBonusStats_Agility()
	return self.agi
end

function item_manta_custom_passive:GetModifierBonusStats_Strength()
	return self.str
end

function item_manta_custom_passive:GetModifierAttackSpeedBonus_Constant()
	return self.attack
end

function item_manta_custom_passive:GetModifierBonusStats_Intellect()
	return self.int
end

function item_manta_custom_passive:GetModifierMoveSpeedBonus_Percentage_Unique()
	if not IsValid(self.parent) then
		return
	end
	return self.parent:UniqueStat(self, "move_bonus")
end

item_manta_custom_illusion = class(mod_hidden)
function item_manta_custom_illusion:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.move = self.ability.illusion_move
end

function item_manta_custom_illusion:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function item_manta_custom_illusion:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end