--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_enhancement_audacious_custom",
	"abilities/items/neutral/item_enhancement_audacious_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_enhancement_audacious_custom_double",
	"abilities/items/neutral/item_enhancement_audacious_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_enhancement_audacious_custom = class({})

function item_enhancement_audacious_custom:GetIntrinsicModifierName()
	return "modifier_item_enhancement_audacious_custom"
end

function item_enhancement_audacious_custom:Spawn()
	self.attack_speed = self:GetSpecialValueFor("attack_speed")
	self.damage_reduce = self:GetSpecialValueFor("damage_reduce")
	self.chance = self:GetSpecialValueFor("chance")
end

modifier_item_enhancement_audacious_custom = class(mod_hidden)
function modifier_item_enhancement_audacious_custom:RemoveOnDeath()
	return false
end
function modifier_item_enhancement_audacious_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.attack_speed = self.ability.attack_speed
	self.damage_reduce = self.ability.damage_reduce
	self.chance = self.ability.chance

	if not IsServer() then
		return
	end

	if not self.parent:IsRealHero() then
		return
	end
	if self.parent:IsTempestDouble() then
		return
	end

	self.parent:AddProc(self, { extra = false, illusion = true })
end

function modifier_item_enhancement_audacious_custom:GetProcChance()
	return self.chance
end

function modifier_item_enhancement_audacious_custom:AttackProcStart(params)
	params.attacker:AddNewModifier(
		params.attacker,
		self.ability,
		"modifier_item_enhancement_audacious_custom_double",
		{ target = params.target:entindex(), duration = 0.2 }
	)
end

function modifier_item_enhancement_audacious_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_item_enhancement_audacious_custom:GetModifierAttackSpeedBonus_Constant()
	return self.attack_speed
end

function modifier_item_enhancement_audacious_custom:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

modifier_item_enhancement_audacious_custom_double = class(mod_hidden)
function modifier_item_enhancement_audacious_custom_double:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_enhancement_audacious_custom_double:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.target = EntIndexToHScript(table.target)
end

function modifier_item_enhancement_audacious_custom_double:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent or self.parent:IsNull() or not self.parent:IsAlive() then
		return
	end
	if not self.target or self.target:IsNull() or not self.target:IsAlive() then
		return
	end

	if IsValid(self.parent.burning_spears_ability) and IsValid(self.parent.burning_spears_ability.tracker) then
		local data = {}
		data.target = self.target
		data.attacker = self.parent
		self.parent.burning_spears_ability.tracker:AttackRecordEvent_out(data)
	end

	self.parent:PerformAttack(self.target, true, true, true, true, true, false, false)
end