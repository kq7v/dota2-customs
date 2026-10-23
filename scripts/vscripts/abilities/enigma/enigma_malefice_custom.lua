--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_enigma_malefice_custom",
	"abilities/enigma/enigma_malefice_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_enigma_malefice_custom_aura",
	"abilities/enigma/enigma_malefice_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_malefice_custom_tracker",
	"abilities/enigma/enigma_malefice_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_malefice_custom_legendary",
	"abilities/enigma/enigma_malefice_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_malefice_custom_legendary_stun",
	"abilities/enigma/enigma_malefice_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_malefice_custom_legendary_effect",
	"abilities/enigma/enigma_malefice_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_malefice_custom_health",
	"abilities/enigma/enigma_malefice_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_enigma_malefice_3"
)
LinkLuaModifier(
	"modifier_enigma_malefice_custom_shield_cd",
	"abilities/enigma/enigma_malefice_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)

enigma_malefice_custom = class({})
enigma_malefice_custom.active_mod = nil
enigma_malefice_custom.talents = {}

function enigma_malefice_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_enigma/enigma_malefice.vpcf", context)
	PrecacheResource("particle", "particles/enigma/malefice_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/enigma/malefice_legendary_damage.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/void_astral_slow.vpcf", context)
	PrecacheResource("particle", "particles/enigma/malefice_shield.vpcf", context)
	PrecacheResource("particle", "particles/enigma/malefice_aoe.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/soul_keeper.vpcf", context)
end

function enigma_malefice_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q1_damage = 0,
			q1_cd = 0,

			has_q3 = 0,
			q3_health = 0,
			q3_eidolon = caster:GetTalentValue("modifier_enigma_malefice_3", "eidolon", true),
			q3_max = caster:GetTalentValue("modifier_enigma_malefice_3", "max", true),
			q3_duration = caster:GetTalentValue("modifier_enigma_malefice_3", "duration", true),

			has_q4 = 0,
			q4_stun = caster:GetTalentValue("modifier_enigma_malefice_4", "stun", true),

			h1_heal = 0,

			has_q7 = 0,
			q7_radius = caster:GetTalentValue("modifier_enigma_malefice_7", "radius", true),
			q7_max = caster:GetTalentValue("modifier_enigma_malefice_7", "max", true),
			q7_stun = caster:GetTalentValue("modifier_enigma_malefice_7", "stun", true),
			q7_damage_end = caster:GetTalentValue("modifier_enigma_malefice_7", "damage_end", true) / 100,
			q7_damage_k = caster:GetTalentValue("modifier_enigma_malefice_7", "damage_k", true),
			q7_stun_reduce = caster:GetTalentValue("modifier_enigma_malefice_7", "stun_reduce", true) / 100,

			has_r3 = 0,
			r3_radius = caster:GetTalentValue("modifier_enigma_blackhole_3", "radius", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_enigma_malefice_1") then
		self.talents.q1_damage = caster:GetTalentValue("modifier_enigma_malefice_1", "damage") / 100
		self.talents.q1_cd = caster:GetTalentValue("modifier_enigma_malefice_1", "cd")
	end

	if caster:HasTalent("modifier_enigma_hero_1") then
		self.talents.h1_heal = caster:GetTalentValue("modifier_enigma_hero_1", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_enigma_hero_1", value = self.talents.h1_heal })
	end

	if caster:HasTalent("modifier_enigma_malefice_3") then
		self.talents.has_q3 = 1
		self.talents.q3_health = caster:GetTalentValue("modifier_enigma_malefice_3", "health")
		caster:AddProc(self.tracker, { land = true, illusion = true })
	end

	if caster:HasTalent("modifier_enigma_malefice_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_enigma_malefice_7") then
		self.talents.has_q7 = 1
		caster:AddProc(self.tracker, { land = true, illusion = true })
	end

	if caster:HasTalent("modifier_enigma_blackhole_3") then
		self.talents.has_r3 = 1
	end

	if caster:HasTalent("modifier_enigma_blackhole_7") then
		self.talents.has_r7 = 1
	end
end

function enigma_malefice_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "enigma_malefice", self)
end

function enigma_malefice_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_enigma_malefice_custom_tracker"
end

function enigma_malefice_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q1_cd or 0)
end

function enigma_malefice_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
end

function enigma_malefice_custom:GetBehavior()
	if self.caster:HasModifier("modifier_enigma_malefice_custom_legendary") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE
end

function enigma_malefice_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_enigma_malefice_custom_legendary") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function enigma_malefice_custom:GetCastAnimation()
	if self.caster:HasModifier("modifier_enigma_malefice_custom_legendary") then
		return ACT_DOTA_MIDNIGHT_PULSE
	end
	return ACT_DOTA_CAST_ABILITY_1
end

function enigma_malefice_custom:GetAOERadius()
	return self.radius or 0
end

function enigma_malefice_custom:GetCastPoint(iLevel)
	if self.caster:HasModifier("modifier_enigma_malefice_custom_legendary") then
		return 0.1
	end
	return self.BaseClass.GetCastPoint(self)
end

function enigma_malefice_custom:OnSpellStart(new_target)
	local target = self:GetCursorTarget()

	if new_target then
		target = new_target
	end

	local mod = self.caster:FindModifierByName("modifier_enigma_malefice_custom_legendary")
	if mod then
		mod:Destroy()
		if IsValid(self.active_mod) then
			self.active_mod:LegendaryProc()
		end
		return
	end

	if not target or target:IsNull() then
		return
	end
	if target:TriggerSpellAbsorb(self) then
		return
	end

	local max = self.stun_instances
	local interval = self.tick_rate

	if self.caster:HasShard() and self.talents.has_q7 == 1 then
		interval = interval + self.shard_interval
	end

	if self.talents.has_q7 == 1 then
		self.caster:AddNewModifier(self.caster, self, "modifier_enigma_malefice_custom_legendary", {})
		self:EndCd(0.5)
	else
		self:EndCd()
	end

	self.active_mod = target:AddNewModifier(
		self.caster,
		self,
		"modifier_enigma_malefice_custom",
		{ max = max, interval = interval, duration = (max - 1) * self.tick_rate + 0.1 }
	)
	target:EmitSound("Hero_Enigma.Malefice")
end

function enigma_malefice_custom:GetDamage()
	return self.damage + self.caster:GetAverageTrueAttackDamage(nil) * self.talents.q1_damage
end

function enigma_malefice_custom:ProcStun(target, sound, talent)
	if not self:IsTrained() then
		return
	end
	local stun = self.stun_duration + (self.talents.has_q4 == 1 and self.talents.q4_stun or 0)

	if self.talents.has_q7 == 1 then
		stun = stun * (1 + self.talents.q7_stun_reduce)
	end

	if sound then
		target:EmitSound("Hero_Enigma.MaleficeTick")
	end

	if target:IsRealHero() and self.caster:GetQuest() == "Enigma.Quest_5" and not self.caster:QuestCompleted() then
		self.caster:UpdateQuest(1)
	end

	local effect = ParticleManager:CreateParticle("particles/enigma/malefice_aoe.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, target:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	local damageTable = { attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL }

	for _, aoe_target in pairs(self.caster:FindTargets(self.radius, target:GetAbsOrigin())) do
		aoe_target:AddNewModifier(
			self.caster,
			self,
			"modifier_stunned",
			{ duration = (1 - aoe_target:GetStatusResistance()) * stun }
		)
		damageTable.victim = aoe_target
		damageTable.damage = self:GetDamage(aoe_target)
		DoDamage(damageTable, talent)
		aoe_target:SendNumber(4, damageTable.damage)
	end
end

modifier_enigma_malefice_custom_tracker = class(mod_hidden)
function modifier_enigma_malefice_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.malefice_ability = self.ability

	self.ability.tick_rate = self.ability:GetSpecialValueFor("tick_rate")
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.stun_instances = self.ability:GetSpecialValueFor("stun_instances")

	self.ability.shard_cd = self.ability:GetSpecialValueFor("shard_cd")
	self.ability.shard_duration = self.ability:GetSpecialValueFor("shard_duration")
	self.ability.shard_interval = self.ability:GetSpecialValueFor("shard_interval")
	self.ability.shard_base = self.ability:GetSpecialValueFor("shard_base")
	self.ability.shard_shield = self.ability:GetSpecialValueFor("shard_shield") / 100

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
end

function modifier_enigma_malefice_custom_tracker:OnRefresh()
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_enigma_malefice_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.ability:IsActivated() and (not self.ability.active_mod or self.ability.active_mod:IsNull()) then
		self.ability.active_mod = nil
		self.ability:StartCd()
	end
end

function modifier_enigma_malefice_custom_tracker:GetProcChance()
	return 100
end

function modifier_enigma_malefice_custom_tracker:AttackProc(params, name)
	local attacker = params.attacker
	local target = params.target
	local is_eidolon = attacker:HasModifier("modifier_enigma_demonic_conversion_custom")

	if attacker ~= self.parent and (not attacker.owner or attacker.owner ~= self.parent or not is_eidolon) then
		return
	end

	if self.ability.talents.has_q3 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_enigma_malefice_custom_health",
			{ attacker = attacker:entindex(), duration = self.ability.talents.q3_duration }
		)
	end

	if self.ability.talents.has_q7 == 0 then
		return
	end

	local mod = target:FindModifierByName("modifier_enigma_malefice_custom")
	if not mod then
		return
	end

	if params.attacker == self.parent then
		mod:AddStack()
	end

	mod:SetDuration(mod.max_duration, true)
end

modifier_enigma_malefice_custom = class(mod_visible)
function modifier_enigma_malefice_custom:IsPurgable()
	return not self.caster:HasShard() and self.ability.talents.has_q7 == 0
end
function modifier_enigma_malefice_custom:GetTexture()
	return "enigma_malefice"
end
function modifier_enigma_malefice_custom:GetEffectName()
	return "particles/units/heroes/hero_enigma/enigma_malefice.vpcf"
end
function modifier_enigma_malefice_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_enigma_malefice.vpcf"
end
function modifier_enigma_malefice_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_enigma_malefice_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max_duration = self:GetRemainingTime()
	self.count = 0

	if not IsServer() then
		return
	end
	self.max = table.max
	self.max_interval = table.interval

	if self.ability.talents.has_r3 == 1 and self.parent:IsRealHero() then
		self.aura_mod =
			self.parent:AddNewModifier(self.caster, self.ability, "modifier_enigma_malefice_custom_aura", {})
	end

	self.RemoveForDuel = true

	self.damage_count = self.max_interval
	self.interval = 0.1

	if self.caster:HasShard() then
		self.parent:AddProc(self, { land = true })
		self.parent:AddSpellEvent(self, true)
	end

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_enigma_malefice_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_q7 == 1 and not self.ended then
		self.caster:UpdateUIshort({
			max_time = self.max_duration,
			time = self:GetRemainingTime(),
			stack = self:GetStackCount(),
			priority = 1,
			style = "EnigmaMalefice",
		})
	end

	self.damage_count = self.damage_count + self.interval
	if self.damage_count < self.max_interval - FrameTime() then
		return
	end
	self.damage_count = 0

	self.ability:ProcStun(self.parent, self.count ~= 0)
	self.count = self.count + 1

	if self.ability.talents.has_q7 == 0 and self.count >= self.max then
		self:Destroy()
	end
end

function modifier_enigma_malefice_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_q7 == 1 then
		self.ended = true
		self.caster:UpdateUIshort({ hide = 1, hide_full = 1, priority = 1, style = "EnigmaMalefice" })
	end

	if IsValid(self.aura_mod) then
		self.aura_mod:Destroy()
	end

	self.caster:RemoveModifierByName("modifier_enigma_malefice_custom_legendary")
	self.ability.active_mod = nil
	self.ability:StartCd()
end

function modifier_enigma_malefice_custom:LegendaryProc()
	if not IsServer() then
		return
	end
	if self.legendary_proc then
		return
	end

	self.legendary_proc = true

	local stun = self:GetStackCount() * self.ability.talents.q7_stun / self.ability.talents.q7_max
	local damage = (
		self.ability.talents.q7_damage_end
		* math.pow(self:GetStackCount() / self.ability.talents.q7_max, self.ability.talents.q7_damage_k)
	) * self.ability:GetDamage(self.parent)
	local radius = self.ability.talents.q7_radius

	self.parent:EmitSound("Enigma.Malefice_legendary_damage")
	self.parent:EmitSound("Enigma.Malefice_legendary_damage2")

	CreateModifierThinker(
		self.caster,
		self.ability,
		"modifier_enigma_malefice_custom_legendary_effect",
		{ duration = math.max(1, stun) },
		self.parent:GetAbsOrigin(),
		self.caster:GetTeamNumber(),
		false
	)

	for _, aoe_target in pairs(self.caster:FindTargets(radius, self.parent:GetAbsOrigin())) do
		aoe_target:AddNewModifier(
			self.caster,
			self.caster:BkbAbility(self.ability, true),
			"modifier_enigma_malefice_custom_legendary_stun",
			{ duration = (1 - aoe_target:GetStatusResistance()) * stun }
		)
		local real_damage = DoDamage(
			{
				victim = aoe_target,
				attacker = self.caster,
				ability = self.ability,
				damage_type = DAMAGE_TYPE_MAGICAL,
				damage = damage,
			},
			"modifier_enigma_malefice_7"
		)
		aoe_target:SendNumber(6, real_damage)
	end

	self:Destroy()
end

function modifier_enigma_malefice_custom:AddStack()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.ability.talents.q7_max then
		return
	end

	if not self.effect and self.ability.talents.has_r7 == 0 then
		self.effect = self.parent:GenericParticle("particles/enigma/malefice_legendary_stack.vpcf", self, true)
	end

	self:IncrementStackCount()

	if self.ability.talents.has_r7 == 1 then
		return
	end

	local number_1 = self:GetStackCount()
	local double = math.floor(number_1 / 10)
	local number_2 = number_1 - double * 10

	ParticleManager:SetParticleControl(self.effect, 1, Vector(double, number_1, number_2))
end

function modifier_enigma_malefice_custom:GetProcChance()
	return 100
end

function modifier_enigma_malefice_custom:AttackProc(params, name)
	self:AddShield()
end

function modifier_enigma_malefice_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end
	self:AddShield()
end

function modifier_enigma_malefice_custom:AddShield()
	if not IsServer() then
		return
	end
	if not self.caster:IsAlive() then
		return
	end
	if self.caster:HasModifier("modifier_enigma_malefice_custom_shield_cd") then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_enigma_malefice_custom_shield_cd",
		{ duration = self.ability.shard_cd }
	)
	local mod = self.caster:AddNewModifier(self.caster, self.ability, "modifier_generic_shield", {
		duration = self.ability.shard_duration,
		max_shield = self.ability.shard_base + self.ability.shard_shield * self.caster:GetMaxHealth(),
		shield_talent = "shard",
		start_full = 1,
	})

	if mod then
		self.caster:EmitSound("Enigma.Malefice_shield")
		local cast_effect = ParticleManager:CreateParticle(
			"particles/enigma/malefice_shield.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControlEnt(
			cast_effect,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(cast_effect, 1, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			cast_effect,
			2,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			true
		)
		mod:AddParticle(cast_effect, false, false, -1, false, false)
	end
end

modifier_enigma_malefice_custom_aura = class(mod_hidden)
function modifier_enigma_malefice_custom_aura:IsAura()
	return self.parent:HasModifier("modifier_enigma_malefice_custom")
end
function modifier_enigma_malefice_custom_aura:GetAuraDuration()
	return 0
end
function modifier_enigma_malefice_custom_aura:GetAuraRadius()
	return self.ability.talents.r3_radius
end
function modifier_enigma_malefice_custom_aura:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_enigma_malefice_custom_aura:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_enigma_malefice_custom_aura:GetModifierAura()
	return "modifier_enigma_black_hole_custom_spell_active"
end
function modifier_enigma_malefice_custom_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
end

function modifier_enigma_malefice_custom_aura:GetAuraEntityReject(hEntity)
	return self.caster ~= hEntity
end

modifier_enigma_malefice_custom_legendary = class(mod_hidden)
function modifier_enigma_malefice_custom_legendary:RemoveOnDeath()
	return false
end

modifier_enigma_malefice_custom_legendary_stun = class(mod_hidden)
function modifier_enigma_malefice_custom_legendary_stun:IsStunDebuff()
	return true
end
function modifier_enigma_malefice_custom_legendary_stun:IsPurgeException()
	return true
end
function modifier_enigma_malefice_custom_legendary_stun:GetStatusEffectName()
	return "particles/status_fx/status_effect_enigma_blackhole_tgt.vpcf"
end
function modifier_enigma_malefice_custom_legendary_stun:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_enigma_malefice_custom_legendary_stun:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_FLAIL, 0.1)
end

function modifier_enigma_malefice_custom_legendary_stun:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:FadeGesture(ACT_DOTA_FLAIL)
end

function modifier_enigma_malefice_custom_legendary_stun:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

function modifier_enigma_malefice_custom_legendary_stun:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
	}
end

function modifier_enigma_malefice_custom_legendary_stun:GetVisualZDelta()
	return 50
end

modifier_enigma_malefice_custom_legendary_effect = class(mod_hidden)
function modifier_enigma_malefice_custom_legendary_effect:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max_time = self:GetRemainingTime()
	local radius = self.ability.talents.q7_radius

	self.effect =
		ParticleManager:CreateParticle("particles/enigma/malefice_legendary_damage.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.effect, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(self.effect, 1, Vector(radius, radius, self.max_time))
	ParticleManager:SetParticleControl(self.effect, 4, Vector(0, 0, 0))
	self:AddParticle(self.effect, false, false, -1, false, false)

	self:StartIntervalThink(self.max_time * 0.8)
end

function modifier_enigma_malefice_custom_legendary_effect:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.effect then
		ParticleManager:SetParticleControl(self.effect, 4, Vector(1, 0, 0))
	end

	self:StartIntervalThink(-1)
end

modifier_enigma_malefice_custom_health = class(mod_visible)
function modifier_enigma_malefice_custom_health:GetTexture()
	return "buffs/enigma/malefice_3"
end
function modifier_enigma_malefice_custom_health:OnCreated(table)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q3_max
	self.health = self.ability.talents.q3_health / self.max
	self.eidolon_count = 0

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh(table)
end

function modifier_enigma_malefice_custom_health:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	local attacker = EntIndexToHScript(table.attacker)
	if not IsValid(attacker) then
		return
	end

	local allow_stack = false

	if attacker == self.caster then
		allow_stack = true
	elseif attacker:HasModifier("modifier_enigma_demonic_conversion_custom") then
		self.eidolon_count = self.eidolon_count + 1
		if self.eidolon_count >= self.ability.talents.q3_eidolon then
			self.eidolon_count = 0
			allow_stack = true
		end
	end

	if not allow_stack then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/items4_fx/soul_keeper.vpcf", self)
	end

	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_enigma_malefice_custom_health:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_enigma_malefice_custom_health:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_enigma_malefice_custom_health:GetModifierExtraHealthPercentage()
	return self.health * self:GetStackCount()
end

modifier_enigma_malefice_custom_shield_cd = class(mod_cd)
function modifier_enigma_malefice_custom_shield_cd:GetTexture()
	return "buffs/enigma/hero_5"
end