--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_ember_spirit_innate_custom",
	"abilities/ember_spirit/ember_spirit_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_innate_custom_burn",
	"abilities/ember_spirit/ember_spirit_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)

ember_spirit_innate_custom = class({})
ember_spirit_innate_custom.talents = {}

function ember_spirit_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_ember_spirit/ember_spirit_smolder.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_brewmaster/brewmaster_fire_immolation_child.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/items_fx/battlefury_cleave_custom.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_ember_spirit.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_ember_spirit", context)
end

function ember_spirit_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_cleave = 0,

			w1_damage = 0,

			w2_heal_reduce = 0,

			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_ember_fist_7", "duration", true),
		}
	end

	if caster:HasTalent("modifier_ember_chain_1") then
		self.talents.has_q1 = 1
		self.talents.q1_cleave = caster:GetTalentValue("modifier_ember_chain_1", "cleave") / 100
	end

	if caster:HasTalent("modifier_ember_fist_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_ember_fist_1", "damage") / 100
	end

	if caster:HasTalent("modifier_ember_fist_2") then
		self.talents.w2_heal_reduce = caster:GetTalentValue("modifier_ember_fist_2", "heal_reduce")
	end

	if caster:HasTalent("modifier_ember_fist_7") then
		self.talents.has_w7 = 1
	end
end

function ember_spirit_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_ember_spirit_innate_custom"
end

modifier_ember_spirit_innate_custom = class(mod_hidden)
function modifier_ember_spirit_innate_custom:RemoveOnDeath()
	return false
end
function modifier_ember_spirit_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.ember_innate = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")

	self.parent:AddProc(self, { land = true })
end

function modifier_ember_spirit_innate_custom:GetProcChance()
	return 100
end

function modifier_ember_spirit_innate_custom:AttackProc(params, name)
	if self.parent:PassivesDisabled() then
		return
	end
	local target = params.target

	if self.ability.talents.has_q1 == 1 then
		DoCleaveAttack(
			self.parent,
			target,
			nil,
			params.damage * self.ability.talents.q1_cleave,
			150,
			360,
			650,
			"particles/items_fx/battlefury_cleave_custom.vpcf"
		)
	end

	target:AddNewModifier(self.parent, self.ability, "modifier_ember_spirit_innate_custom_burn", {})
end

modifier_ember_spirit_innate_custom_burn = class(mod_visible)
function modifier_ember_spirit_innate_custom_burn:IsPurgable()
	return true
end
function modifier_ember_spirit_innate_custom_burn:GetStatusEffectName()
	return "particles/status_fx/status_effect_burn.vpcf"
end
function modifier_ember_spirit_innate_custom_burn:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_ember_spirit_innate_custom_burn:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.interval = self.ability.interval
	self.damage = self.ability.damage
	if not IsServer() then
		return
	end

	self.max = self.ability.duration / self.interval
	if self.ability.talents.has_w7 == 1 then
		self.max = self.ability.talents.w7_duration / self.interval
	end

	self.count = 0

	self.particle_index = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_brewmaster/brewmaster_fire_immolation_child.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		1,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle_index, false, false, -1, false, false)

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
	self:StartIntervalThink(self.interval)
end

function modifier_ember_spirit_innate_custom_burn:OnRefresh()
	if not IsServer() then
		return
	end
	self.count = 0
end

function modifier_ember_spirit_innate_custom_burn:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Ember.Guard_legendary_loop")
end

function modifier_ember_spirit_innate_custom_burn:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_ember_spirit_innate_custom_burn:GetModifierHealChange()
	return self.ability.talents.w2_heal_reduce
end

function modifier_ember_spirit_innate_custom_burn:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.w2_heal_reduce
end

function modifier_ember_spirit_innate_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.count = self.count + 1

	local damage = self.damage + self.ability.talents.w1_damage * self.caster:GetIntellect(false)
	local mod = self.parent:FindModifierByName("modifier_ember_spirit_sleight_of_fist_custom_legendary")
	if mod and mod.damage then
		damage = damage * (1 + mod:GetStackCount() * mod.damage)
		if mod:GetStackCount() >= mod.max / 2 then
			self.parent:EmitSound("Ember.Guard_legendary_damage")
			if not self.effect then
				self.parent:EmitSound("Ember.Guard_legendary_loop")
				self.effect = self.parent:GenericParticle(
					"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
					self
				)
			end
		end
	else
		if self.effect then
			self.parent:StopSound("Ember.Guard_legendary_loop")
			ParticleManager:DestroyParticle(self.effect, false)
			ParticleManager:ReleaseParticleIndex(self.effect)
			self.effect = nil
		end
	end

	self.damageTable.damage = damage * self.interval
	DoDamage(self.damageTable)

	if self.count >= self.max then
		self:Destroy()
		return
	end
end