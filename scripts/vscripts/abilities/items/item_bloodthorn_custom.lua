--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_bloodthorn_custom", "abilities/items/item_bloodthorn_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_bloodthorn_custom_debuff",
	"abilities/items/item_bloodthorn_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_bloodthorn_custom_unmiss",
	"abilities/items/item_bloodthorn_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_bloodthorn_custom = class({})
function item_bloodthorn_custom:GetIntrinsicModifierName()
	return "modifier_item_bloodthorn_custom"
end

function item_bloodthorn_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items2_fx/bloodthorn.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/orchid_pop.vpcf", context)
end

function item_bloodthorn_custom:Spawn()
	self.bonus_intellect = self:GetSpecialValueFor("bonus_intellect")
	self.bonus_attack_speed = self:GetSpecialValueFor("bonus_attack_speed")
	self.bonus_mana_regen = self:GetSpecialValueFor("bonus_mana_regen")
	self.silence_duration = self:GetSpecialValueFor("silence_duration")
	self.silence_damage_percent = self:GetSpecialValueFor("silence_damage_percent") / 100
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.proc_damage = self:GetSpecialValueFor("proc_damage")
	self.proc_damage_creeps = self:GetSpecialValueFor("proc_damage_creeps")
	self.passive_proc_damage = self:GetSpecialValueFor("passive_proc_damage")
	self.proc_chance = self:GetSpecialValueFor("proc_chance")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
end

function item_bloodthorn_custom:OnSpellStart()
	local caster = self:GetCaster()
	local target = self:GetCursorTarget()

	if target:TriggerSpellAbsorb(self) then
		return
	end

	target:EmitSound("DOTA_Item.Bloodthorn.Activate")
	target:RemoveModifierByName("modifier_item_bloodthorn_custom_debuff")
	target:AddNewModifier(
		caster,
		self,
		"modifier_item_bloodthorn_custom_debuff",
		{ duration = self.silence_duration * (1 - target:GetStatusResistance()) }
	)
end

modifier_item_bloodthorn_custom_debuff = class(mod_visible)
function modifier_item_bloodthorn_custom_debuff:IsPurgable()
	return true
end
function modifier_item_bloodthorn_custom_debuff:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.damage = self.ability.silence_damage_percent
	self.count = 0

	if not IsServer() then
		return
	end
	local hit_effect =
		ParticleManager:CreateParticle("particles/items2_fx/bloodthorn.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(hit_effect, false, false, -1, false, false)
	self.parent:AddDamageEvent_inc(self, true)
	self.parent:AddAttackRecordEvent_inc(self)
end

function modifier_item_bloodthorn_custom_debuff:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_item_bloodthorn_custom_debuff:AttackRecordEvent_inc(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end
	if self.parent ~= params.target then
		return
	end
	if params.attacker:FindOwner() ~= self.caster then
		return
	end

	local unmiss = params.attacker:FindModifierByName("modifier_item_bloodthorn_custom_unmiss")
	if unmiss and unmiss:GetRemainingTime() >= self:GetRemainingTime() - 0.1 then
		return
	end

	params.attacker:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_item_bloodthorn_custom_unmiss",
		{ duration = self:GetRemainingTime() }
	)
end

function modifier_item_bloodthorn_custom_debuff:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end
	if params.attacker:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end

	if not params.inflictor then
		local damage = params.attacker:IsHero() and self.ability.proc_damage or self.ability.proc_damage_creeps
		self.parent:SendNumber(4, damage)
		self.parent:EmitSound("DOTA_Item.Nullifier.Slow")
		DoDamage({
			victim = self.parent,
			attacker = self.caster,
			ability = self.ability,
			damage_type = DAMAGE_TYPE_MAGICAL,
			damage = damage,
		})
	end

	if params.damage <= 0 then
		return
	end
	self.count = self.count + params.damage * self.damage
end

function modifier_item_bloodthorn_custom_debuff:OnDestroy()
	if not IsServer() then
		return
	end
	if self:GetRemainingTime() > 0.1 then
		return
	end
	if self.count <= 0 then
		return
	end

	local hit_effect =
		ParticleManager:CreateParticle("particles/items2_fx/orchid_pop.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControl(hit_effect, 1, Vector(self.count, 0, 0))
	ParticleManager:ReleaseParticleIndex(hit_effect)

	DoDamage({
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage = self.count,
	})
end

modifier_item_bloodthorn_custom = class(mod_hidden)
function modifier_item_bloodthorn_custom:RemoveOnDeath()
	return false
end
function modifier_item_bloodthorn_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddProc(self, { accuracy = true })
end

function modifier_item_bloodthorn_custom:GetProcChance()
	return self.ability.proc_chance
end

function modifier_item_bloodthorn_custom:GetModifierProcAttack_BonusDamage_Magical(params)
	if not IsServer() then
		return
	end
	if not self.parent:IsProc(self, params.record) then
		return
	end

	params.target:SendNumber(4, self.ability.passive_proc_damage)
	return self.ability.passive_proc_damage
end

function modifier_item_bloodthorn_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_bloodthorn_custom:GetModifierConstantManaRegen()
	return self.ability.bonus_mana_regen
end

function modifier_item_bloodthorn_custom:GetModifierAttackSpeedBonus_Constant()
	return self.ability.bonus_attack_speed
end

function modifier_item_bloodthorn_custom:GetModifierPreAttack_BonusDamage()
	return self.ability.bonus_damage
end

function modifier_item_bloodthorn_custom:GetModifierBonusStats_Intellect()
	return self.ability.bonus_intellect
end

function modifier_item_bloodthorn_custom:GetModifierHealthBonus()
	return self.ability.bonus_health
end

modifier_item_bloodthorn_custom_unmiss = class(mod_hidden)
function modifier_item_bloodthorn_custom_unmiss:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end