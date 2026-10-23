--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_smoke",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_auto",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_auto_cd",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_hero_5"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_agi",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_blur_2"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_charge",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_blur_3"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_double",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_window",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_cloud",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_cloud_effect",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_blur_4"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_agility",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_illusion",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_invulnerable",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_blur_innate",
	"abilities/phantom_assassin/custom_phantom_assassin_blur",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_hero_1"
)

custom_phantom_assassin_blur = class({})
custom_phantom_assassin_blur.talents = {}

function custom_phantom_assassin_blur:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_active_start.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_active_blur.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin_persona/pa_persona_phantom_blur_active.vpcf",
		context
	)
	PrecacheResource("particle", "particles/phantom_assassin/blur_absorb.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blur_smoke.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_muerta_parting_shot.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blur_linken.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/phantom_proc.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blur_double_attack.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blur_proc.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blur_legendary_active.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blur_legendary_body.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blur_illusion.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/pa_legendary_blur.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_omni_slash_tgt_bladekeeper.vpcf",
		context
	)
end

function custom_phantom_assassin_blur:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_agi = 0,
			e1_chance = caster:GetTalentValue("modifier_phantom_assassin_blur_1", "chance", true),
			e1_radius = caster:GetTalentValue("modifier_phantom_assassin_blur_1", "radius", true),
			e1_illusion_chance = caster:GetTalentValue("modifier_phantom_assassin_blur_1", "illusion_chance", true),
			e1_damage_type = caster:GetTalentValue("modifier_phantom_assassin_blur_1", "damage_type", true),

			has_e2 = 0,
			e2_duration = 0,
			e2_agi = 0,
			e2_agi_duration = caster:GetTalentValue("modifier_phantom_assassin_blur_2", "agi_duration", true),

			has_e3 = 0,
			e3_agi = 0,
			e3_attacks = 0,
			e3_damage = caster:GetTalentValue("modifier_phantom_assassin_blur_3", "damage", true),
			e3_duration = caster:GetTalentValue("modifier_phantom_assassin_blur_3", "duration", true),
			e3_delay = caster:GetTalentValue("modifier_phantom_assassin_blur_3", "delay", true),

			has_e4 = 0,
			e4_cd_reduce = caster:GetTalentValue("modifier_phantom_assassin_blur_4", "cd_reduce", true) / 100,
			e4_attacks = caster:GetTalentValue("modifier_phantom_assassin_blur_4", "attacks", true),
			e4_attacks_legendary = caster:GetTalentValue("modifier_phantom_assassin_blur_4", "attacks_legendary", true),
			e4_slow = caster:GetTalentValue("modifier_phantom_assassin_blur_4", "slow", true),
			e4_duration = caster:GetTalentValue("modifier_phantom_assassin_blur_4", "duration", true),
			e4_radius = caster:GetTalentValue("modifier_phantom_assassin_blur_4", "radius", true),
			e4_window = caster:GetTalentValue("modifier_phantom_assassin_blur_4", "window", true),

			has_e7 = 0,
			e7_damage = caster:GetTalentValue("modifier_phantom_assassin_blur_7", "damage", true),
			e7_agi = caster:GetTalentValue("modifier_phantom_assassin_blur_7", "agi", true),
			e7_duration = caster:GetTalentValue("modifier_phantom_assassin_blur_7", "duration", true),
			e7_illusions = caster:GetTalentValue("modifier_phantom_assassin_blur_7", "illusions", true),
			e7_illusion_incoming = caster:GetTalentValue("modifier_phantom_assassin_blur_7", "illusion_incoming", true),
			e7_illusion_outgoing = caster:GetTalentValue("modifier_phantom_assassin_blur_7", "illusion_outgoing", true),
			e7_illusion_move = caster:GetTalentValue("modifier_phantom_assassin_blur_7", "illusion_move", true),
			e7_heal = caster:GetTalentValue("modifier_phantom_assassin_blur_7", "heal", true) / 100,

			has_h1 = 0,
			h1_duration = caster:GetTalentValue("modifier_phantom_assassin_hero_1", "duration", true),

			has_h5 = 0,
			h5_status = caster:GetTalentValue("modifier_phantom_assassin_hero_5", "status", true),
			h5_damage = caster:GetTalentValue("modifier_phantom_assassin_hero_5", "damage", true),
			h5_duration = caster:GetTalentValue("modifier_phantom_assassin_hero_5", "duration", true),
			h5_talent_cd = caster:GetTalentValue("modifier_phantom_assassin_hero_5", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_phantom_assassin_blur_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_phantom_assassin_blur_1", "damage")
		self.talents.e1_agi = caster:GetTalentValue("modifier_phantom_assassin_blur_1", "agi") / 100
		caster:AddProc(self.tracker, { name = "hit", illusion = true, land = true })
		caster:AddProc(self.tracker, { illusion = true, land = true })
	end

	if caster:HasTalent("modifier_phantom_assassin_blur_2") then
		self.talents.has_e2 = 1
		self.talents.e2_duration = caster:GetTalentValue("modifier_phantom_assassin_blur_2", "duration")
		self.talents.e2_agi = caster:GetTalentValue("modifier_phantom_assassin_blur_2", "agi")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_phantom_assassin_blur_3") then
		self.talents.has_e3 = 1
		self.talents.e3_agi = caster:GetTalentValue("modifier_phantom_assassin_blur_3", "agi") / 100
		self.talents.e3_attacks = caster:GetTalentValue("modifier_phantom_assassin_blur_3", "attacks")
		caster:AddProc(self.tracker, { name = "hit", illusion = true, land = true })
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_phantom_assassin_blur_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { name = "hit", illusion = true, land = true })
	end

	if caster:HasTalent("modifier_phantom_assassin_blur_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_phantom_assassin_hero_1") then
		self.talents.has_h1 = 1
	end

	if caster:HasTalent("modifier_phantom_assassin_hero_5") then
		self.talents.has_h5 = 1
	end
end

function custom_phantom_assassin_blur:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "phantom_assassin_blur", self)
end

function custom_phantom_assassin_blur:GetIntrinsicModifierName()
	return "modifier_phantom_assassin_phantom_blur"
end

function custom_phantom_assassin_blur:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.caster:HasShard() and (self.shard_cast or 0) or 0)
end

function custom_phantom_assassin_blur:OnSpellStart()
	if self.caster:HasShard() then
		self.caster:Purge(false, true, false, false, false)
	end

	ProjectileManager:ProjectileDodge(self.caster)
	self.caster:RemoveModifierByName("modifier_phantom_assassin_phantom_blur_agility")

	self.attacks = self.talents.has_e7 == 1 and self.talents.e4_attacks_legendary or self.talents.e4_attacks
	self.attacks_step = self.talents.e4_cd_reduce / self.attacks

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_phantom_assassin_phantom_smoke",
		{ duration = self.duration + self.talents.e2_duration }
	)
end

function custom_phantom_assassin_blur:ProcSplash(target, source)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e1 ~= 1 then
		return
	end

	self.caster:LogProc("modifier_phantom_assassin_blur_1_" .. source, nil, target)
	local damageTable = {
		attacker = self.caster,
		ability = self,
		damage = self.talents.e1_damage + self.caster:GetAgility() * self.talents.e1_agi,
		damage_type = self.talents.e1_damage_type,
	}
	target:GenericParticle("particles/phantom_assassin/blur_proc.vpcf")

	local particle = ParticleManager:CreateParticle(
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_omni_slash_tgt_bladekeeper.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		target,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		target,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	target:EmitSound("PA.Blur_legendary_damage")

	for _, enemy in pairs(self.caster:FindTargets(self.talents.e1_radius, target:GetAbsOrigin())) do
		damageTable.victim = enemy
		local real_damage = DoDamage(damageTable, "modifier_phantom_assassin_blur_1")
		enemy:SendNumber(4, real_damage)

		local effect = ParticleManager:CreateParticle(
			"particles/phantom_assassin/phantom_proc.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			enemy
		)
		ParticleManager:SetParticleControlEnt(
			effect,
			0,
			enemy,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			enemy:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect)
	end
end

function custom_phantom_assassin_blur:ProcDouble(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 ~= 1 then
		return
	end
	if not target:IsUnit() then
		return
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return
	end

	local charge = self.caster:FindModifierByName("modifier_phantom_assassin_phantom_blur_charge")
	if not charge then
		return
	end

	charge:DecrementStackCount()

	if charge:GetStackCount() <= 0 then
		charge:Destroy()
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_phantom_assassin_phantom_blur_double",
		{ duration = self.talents.e3_delay }
	)
end

modifier_phantom_assassin_phantom_blur = class(mod_hidden)
function modifier_phantom_assassin_phantom_blur:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()
	self.parent.blur_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.evasion = self.ability:GetSpecialValueFor("evasion")
	self.ability.movespeed_bonus = self.ability:GetSpecialValueFor("active_movespeed_bonus")
	self.ability.shard_cast = self.ability:GetSpecialValueFor("shard_cast")
	self.ability.shard_invul = self.ability:GetSpecialValueFor("shard_invul")
	self.ability.attacks = 0
	self.ability.attacks_step = 0

	self.parent:AddAttackStartEvent_out(self, true)
end

function modifier_phantom_assassin_phantom_blur:OnRefresh(kv)
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.evasion = self.ability:GetSpecialValueFor("evasion")
	self.ability.movespeed_bonus = self.ability:GetSpecialValueFor("active_movespeed_bonus")
end

function modifier_phantom_assassin_phantom_blur:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EVASION_CONSTANT,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_ABSORB_SPELL,
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
	}
end

function modifier_phantom_assassin_phantom_blur:GetModifierBonusStats_Agility()
	if not IsValid(self.parent) then
		return
	end
	if self.ability.talents.has_e2 ~= 1 then
		return
	end
	if not self.parent:CheckOwner():HasModifier("modifier_phantom_assassin_phantom_blur_agi") then
		return
	end

	return self.ability.talents.e2_agi
end

function modifier_phantom_assassin_phantom_blur:GetModifierBaseAttack_BonusDamage()
	if not IsValid(self.parent) then
		return
	end
	return self.parent:GetAgility() * self.ability.talents.e3_agi
end

function modifier_phantom_assassin_phantom_blur:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if not self.parent.pa_e3 then
		return
	end

	return self.ability.talents.e3_damage - 100
end

function modifier_phantom_assassin_phantom_blur:GetModifierEvasion_Constant()
	if not IsValid(self.parent) then
		return
	end
	if self.parent:PassivesDisabled() then
		return 0
	end
	return self.ability.evasion or 0
end

function modifier_phantom_assassin_phantom_blur:GetModifierStatusResistanceStacking()
	if not IsValid(self.parent) then
		return
	end
	if self.ability.talents.has_h5 ~= 1 then
		return
	end
	if self.parent:PassivesDisabled() then
		return 0
	end
	return self.ability.talents.h5_status
end

function modifier_phantom_assassin_phantom_blur:GetAbsorbSpell(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 ~= 1 then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not params.ability then
		return
	end

	local caster = params.ability:GetCaster()

	if not caster then
		return
	end
	if caster:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if caster:IsCreep() then
		return
	end

	if self.parent:HasModifier("modifier_phantom_assassin_phantom_smoke") then
		return
	end
	if self.parent:HasModifier("modifier_phantom_assassin_phantom_blur_auto_cd") then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_phantom_assassin_phantom_blur_auto",
		{ duration = self.ability.talents.h5_duration }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_phantom_assassin_phantom_blur_auto_cd",
		{ duration = self.ability.talents.h5_talent_cd }
	)
	self.parent:LogProc("modifier_phantom_assassin_hero_5")
end

function modifier_phantom_assassin_phantom_blur:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target
	local mod = self.parent:FindModifierByName("modifier_phantom_assassin_phantom_smoke")

	if mod and self.ability.talents.has_e7 == 1 then
		mod:IncrementStackCount()
		mod:OnIntervalThink()

		target:EmitSound("PA.Blur_legendary_attack")
		local effect = ParticleManager:CreateParticle(
			"particles/phantom_assassin/pa_legendary_blur.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect)
	end

	if params.no_attack_cooldown then
		return
	end

	local window = self.parent:FindModifierByName("modifier_phantom_assassin_phantom_blur_window")
	local cloud = window ~= nil

	if window then
		window:Destroy()
	end

	if mod and self.ability.talents.has_e7 ~= 1 then
		mod:Destroy()
		cloud = self.ability.talents.has_e4 == 1
	end

	if cloud then
		params.target:EmitSound("Pa.Blur_smoke")
		CreateModifierThinker(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_blur_cloud",
			{ duration = self.ability.talents.e4_duration },
			target:GetAbsOrigin(),
			self.parent:GetTeamNumber(),
			false
		)
	end
end

function modifier_phantom_assassin_phantom_blur:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if self.parent.crit_ability.tracker.records[params.record] then
		return 0
	end
	if params.attacker:IsIllusion() then
		return self.ability.talents.e1_illusion_chance
	end
	return self.ability.talents.e1_chance
end

function modifier_phantom_assassin_phantom_blur:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	if not params.no_attack_cooldown then
		if self.parent == params.attacker then
			self.ability:ProcDouble(params.target)
		end

		if
			self.ability.talents.has_e4 == 1
			and self.ability.attacks > 0
			and self.ability:GetCooldownTimeRemaining() > 0
		then
			local illusion = params.attacker:IsIllusion()

			if
				(self.ability.talents.has_e7 == 1 and illusion) or (self.ability.talents.has_e7 ~= 1 and not illusion)
			then
				self.ability.attacks = self.ability.attacks - 1
				self.parent:CdAbility(self.ability, nil, self.ability.attacks_step, "modifier_phantom_assassin_blur_4")
			end
		end
	end

	if not params.procs[self].default then
		return
	end

	self.ability:ProcSplash(params.target, params.attacker:IsIllusion() and "illusion" or "attack")
end

function modifier_phantom_assassin_phantom_blur:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_e2 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_blur_agi",
			{ duration = self.ability.talents.e2_agi_duration }
		)
	end

	if self.ability.talents.has_e3 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_blur_charge",
			{ duration = self.ability.talents.e3_duration }
		)
	end
end

modifier_phantom_assassin_phantom_blur_agi = class(mod_hidden)

modifier_phantom_assassin_phantom_blur_charge = class(mod_visible)
function modifier_phantom_assassin_phantom_blur_charge:GetTexture()
	return "buffs/phantom_assassin/blur_3"
end
function modifier_phantom_assassin_phantom_blur_charge:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_phantom_assassin_phantom_blur_charge:OnRefresh()
	if not IsServer() then
		return
	end

	self:SetStackCount(self.ability.talents.e3_attacks)
end

modifier_phantom_assassin_phantom_blur_window = class(mod_hidden)

modifier_phantom_assassin_phantom_blur_cloud = class(mod_hidden)
function modifier_phantom_assassin_phantom_blur_cloud:IsAura()
	return true
end
function modifier_phantom_assassin_phantom_blur_cloud:GetAuraDuration()
	return 0
end
function modifier_phantom_assassin_phantom_blur_cloud:GetAuraRadius()
	return self.ability.talents.e4_radius
end
function modifier_phantom_assassin_phantom_blur_cloud:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_phantom_assassin_phantom_blur_cloud:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_phantom_assassin_phantom_blur_cloud:GetModifierAura()
	return "modifier_phantom_assassin_phantom_blur_cloud_effect"
end
function modifier_phantom_assassin_phantom_blur_cloud:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/phantom_assassin/blur_smoke.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(
		particle,
		1,
		Vector(self.ability.talents.e4_radius, self.ability.talents.e4_radius, self.ability.talents.e4_radius)
	)
	self:AddParticle(particle, false, false, -1, false, false)
end

modifier_phantom_assassin_phantom_blur_cloud_effect = class(mod_hidden)
function modifier_phantom_assassin_phantom_blur_cloud_effect:GetStatusEffectName()
	return "particles/status_fx/status_effect_muerta_parting_shot.vpcf"
end
function modifier_phantom_assassin_phantom_blur_cloud_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_phantom_assassin_phantom_blur_cloud_effect:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
end

function modifier_phantom_assassin_phantom_blur_cloud_effect:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:IsAlive() then
		return
	end
	self.caster:LogProc("modifier_phantom_assassin_blur_4_death", nil, self.parent)
end

function modifier_phantom_assassin_phantom_blur_cloud_effect:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

function modifier_phantom_assassin_phantom_blur_cloud_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_phantom_assassin_phantom_blur_cloud_effect:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.e4_slow
end

modifier_phantom_assassin_phantom_blur_double = class(mod_hidden)
function modifier_phantom_assassin_phantom_blur_double:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_phantom_assassin_phantom_blur_double:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	local targetPos = self.parent:GetAbsOrigin()
	local vec = (self.caster:GetAbsOrigin() - targetPos):Normalized()
	vec.z = 0
	local dist = RandomInt(340, 420)

	local baseBehindPos = targetPos + vec * dist
	local resultPos = RotatePosition(targetPos, QAngle(0, RandomFloat(-75, 75), 0), baseBehindPos)

	self.parent:EmitSound("Pa.Blur_double_attack")
	local effect = ParticleManager:CreateParticle(
		"particles/phantom_assassin/blur_double_attack.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect, 0, resultPos)
	ParticleManager:SetParticleControl(effect, 1, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(effect, 4, resultPos)
	ParticleManager:ReleaseParticleIndex(effect)
end

function modifier_phantom_assassin_phantom_blur_double:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local effect = ParticleManager:CreateParticle(
		"particles/phantom_assassin/phantom_proc.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	self.caster.pa_e3 = true
	self.caster:PerformAttack(
		self.parent,
		true,
		true,
		true,
		true,
		false,
		false,
		true,
		{ attack = "pa_e3", damage = "pa_e3" }
	)
	self.parent:EmitSound("Pa.Blur_double_attack_end")
	self.caster.pa_e3 = nil
	self.caster:LogProc("modifier_phantom_assassin_blur_3", nil, self.parent)
end

local mod_blur = class(mod_visible)
function mod_blur:StartBlur()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_active_start.vpcf",
		self
	)
	local particle_name_2 = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_active_blur.vpcf",
		self
	)

	self.parent:GenericParticle(particle_name)
	self.parent:GenericParticle(particle_name_2, self)
	self.parent:EmitSound("Hero_PhantomAssassin.Blur")

	if self.ability.talents.has_h5 ~= 1 then
		return
	end

	self.parent:GenericParticle("particles/phantom_assassin/blur_absorb.vpcf", self)
end

function mod_blur:EndBlur()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 1 then
		return
	end
	self.parent:EmitSound("Hero_PhantomAssassin.Blur.Break")
end

function mod_blur:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR_FOR_ENEMIES] = true,
		[MODIFIER_STATE_UNTARGETABLE_ENEMY] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES] = true,
	}
end

function mod_blur:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_INVISIBILITY_LEVEL,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function mod_blur:GetModifierInvisibilityLevel()
	return 1
end

function mod_blur:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.movespeed_bonus or 0
end

function mod_blur:GetModifierIncomingDamage_Percentage()
	if not IsValid(self.parent) then
		return
	end
	if self.ability.talents.has_h5 ~= 1 then
		return
	end
	if self.parent:PassivesDisabled() then
		return 0
	end
	return self.ability.talents.h5_damage
end

modifier_phantom_assassin_phantom_blur_auto_cd = class(mod_cd)
function modifier_phantom_assassin_phantom_blur_auto_cd:GetTexture()
	return "buffs/phantom_assassin/hero_5"
end

modifier_phantom_assassin_phantom_blur_auto = class(mod_blur)
function modifier_phantom_assassin_phantom_blur_auto:IsHidden()
	return true
end
function modifier_phantom_assassin_phantom_blur_auto:OnCreated()
	self:StartBlur()

	if not IsServer() then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/phantom_assassin/blur_linken.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)
	self.parent:EmitSound("PA.Blur_absorb")
end

function modifier_phantom_assassin_phantom_blur_auto:OnDestroy()
	if not IsServer() then
		return
	end
	self:EndBlur()
end

modifier_phantom_assassin_phantom_smoke = class(mod_blur)
function modifier_phantom_assassin_phantom_smoke:OnCreated()
	self:StartBlur()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.ability:EndCd()

	if self.ability.talents.has_e7 ~= 1 then
		return
	end

	self:SetStackCount(0)
	self:StartIntervalThink(0.1)
	self:OnIntervalThink()
end

function modifier_phantom_assassin_phantom_smoke:OnIntervalThink()
	if self.ability.talents.has_e7 ~= 1 then
		return
	end

	self.parent:UpdateUIshort({
		max_time = self:GetDuration(),
		time = self:GetDuration() - self:GetRemainingTime(),
		stack = "+" .. (self:GetStackCount() * self.ability.talents.e7_agi) .. "%",
		priority = 2,
		style = "PhantomBlur",
	})
end

function modifier_phantom_assassin_phantom_smoke:CheckState()
	local state = {
		[MODIFIER_STATE_NO_HEALTH_BAR_FOR_ENEMIES] = true,
		[MODIFIER_STATE_UNTARGETABLE_ENEMY] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES] = true,
	}

	if self.parent:HasShard() and self:GetElapsedTime() < self.ability.shard_invul then
		state[MODIFIER_STATE_INVULNERABLE] = true
		state[MODIFIER_STATE_NO_HEALTH_BAR] = true
	end

	return state
end

function modifier_phantom_assassin_phantom_smoke:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_INVISIBILITY_LEVEL,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_phantom_assassin_phantom_smoke:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_e7 ~= 1 then
		return
	end

	return self.ability.talents.e7_damage
end

function modifier_phantom_assassin_phantom_smoke:OnDestroy()
	if not IsServer() then
		return
	end

	self:EndBlur()
	self.ability:StartCd()

	if self.ability.talents.has_h1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_blur_innate",
			{ duration = self.ability.talents.h1_duration }
		)
	end

	if self.parent:GetQuest() == "Phantom.Quest_7" then
		self.parent:StartCd("phantom_quest_7")
	end

	if self.ability.talents.has_e4 == 1 and self.ability.talents.has_e7 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_blur_window",
			{ duration = self.ability.talents.e4_window }
		)
	end

	if self.ability.talents.has_e7 ~= 1 then
		return
	end

	self.parent:UpdateUIshort({ hide = 1, priority = 2, style = "PhantomBlur" })

	if not self.parent:IsAlive() then
		return
	end
	local stacks = self:GetStackCount()

	self.parent:EmitSound("PA.Blur_legendary_start")

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_phantom_assassin_phantom_blur_agility",
		{ duration = self.ability.talents.e7_duration, stacks = stacks }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_phantom_assassin_phantom_blur_invulnerable",
		{ duration = 0.1, stacks = stacks }
	)

	ProjectileManager:ProjectileDodge(self.parent)
end

modifier_phantom_assassin_phantom_blur_agility = class(mod_hidden)
function modifier_phantom_assassin_phantom_blur_agility:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.agi = self.ability.talents.e7_agi * table.stacks
	self.parent:AddPercentStat({ agi = self.agi / 100 }, self)
	self.parent:GenericParticle("particles/phantom_assassin/blur_legendary_active.vpcf", self, true)
	self.parent:GenericParticle("particles/phantom_assassin/blur_legendary_body.vpcf", self)

	if self.parent:IsIllusion() then
		return
	end

	self:StartIntervalThink(0.1)
	self:OnIntervalThink()
end

function modifier_phantom_assassin_phantom_blur_agility:OnIntervalThink()
	self.parent:UpdateUIshort({
		max_time = self.ability.talents.e7_duration,
		time = self:GetRemainingTime(),
		stack = "+" .. math.floor(self.agi) .. "%",
		active = 1,
		priority = 2,
		style = "PhantomBlur",
	})
end

function modifier_phantom_assassin_phantom_blur_agility:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:IsIllusion() then
		return
	end

	self.parent:UpdateUIshort({ hide = 1, priority = 2, style = "PhantomBlur" })
end

modifier_phantom_assassin_phantom_blur_invulnerable = class(mod_hidden)
function modifier_phantom_assassin_phantom_blur_invulnerable:GetEffectName()
	return "particles/items2_fx/manta_phase.vpcf"
end
function modifier_phantom_assassin_phantom_blur_invulnerable:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.stacks = table.stacks
end

function modifier_phantom_assassin_phantom_blur_invulnerable:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_phantom_assassin_phantom_blur_invulnerable:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end

	self.parent:Stop()

	local data = {
		outgoing_damage = self.ability.talents.e7_illusion_outgoing - 100,
		incoming_damage = self.ability.talents.e7_illusion_incoming - 100,
		duration = self.ability.talents.e7_duration,
	}

	local forward = self.parent:GetForwardVector()
	local origin = self.parent:GetAbsOrigin() + forward
	local right = self.parent:GetRightVector()

	local points = {
		origin,
		origin + forward * 90 + right * 150,
		origin + forward * 90 - right * 150,
	}

	local units = { self.parent }

	for _, illusion in
		pairs(CreateIllusions(self.parent, self.parent, data, self.ability.talents.e7_illusions, 0, false, true))
	do
		illusion.owner = self.parent

		for _, mod in pairs(self.parent:FindAllModifiers()) do
			if mod.StackOnIllusion ~= nil and mod.StackOnIllusion == true then
				illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount(), mod)
			end
		end

		illusion:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_blur_agility",
			{ duration = self.ability.talents.e7_duration, stacks = self.stacks }
		)
		illusion:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_blur_illusion",
			{ duration = self.ability.talents.e7_duration }
		)

		table.insert(units, illusion)
	end

	for _, unit in pairs(units) do
		if #points == 0 then
			break
		end

		local index = RandomInt(1, #points)

		FindClearSpaceForUnit(unit, points[index], true)
		unit:GenericParticle("particles/phantom_assassin/blur_illusion.vpcf")
		unit:MoveToPositionAggressive(points[index])

		table.remove(points, index)
	end
end

modifier_phantom_assassin_phantom_blur_innate = class(mod_hidden)
function modifier_phantom_assassin_phantom_blur_innate:OnCreated()
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

modifier_phantom_assassin_phantom_blur_illusion = class(mod_hidden)
function modifier_phantom_assassin_phantom_blur_illusion:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
end

function modifier_phantom_assassin_phantom_blur_illusion:OnDestroy()
	if not IsServer() then
		return
	end
	self.caster:LogProc("modifier_phantom_assassin_blur_7_illusion", self:GetElapsedTime())
end

function modifier_phantom_assassin_phantom_blur_illusion:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
	}
end

function modifier_phantom_assassin_phantom_blur_illusion:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.e7_illusion_move
end

function modifier_phantom_assassin_phantom_blur_illusion:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	self.caster:LogProc("modifier_phantom_assassin_blur_7_attack", nil, params.target)

	local result = self.caster:CanLifesteal(params.target)
	if not result then
		return
	end

	self.caster:GenericHeal(
		self.caster:GetAgility() * self.ability.talents.e7_heal * result,
		self.ability,
		true,
		nil,
		"modifier_phantom_assassin_blur_7"
	)
end