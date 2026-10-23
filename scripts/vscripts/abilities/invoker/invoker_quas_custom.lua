--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_invoker_quas_custom_passive",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_invoker_quas_custom", "abilities/invoker/invoker_quas_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_invoker_cold_snap_custom", "abilities/invoker/invoker_quas_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_invoker_cold_snap_custom_stun",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_ghost_walk_custom",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_invoker_ghost_walk_custom_debuff",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_invoker_ice_wall_custom", "abilities/invoker/invoker_quas_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_invoker_ice_wall_custom_slow",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_cold_snap_custom_legendary",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_invoker_quas_7"
)
LinkLuaModifier(
	"modifier_invoker_cold_snap_custom_legendary_aura",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_cold_snap_custom_legendary_proc",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_invoker_quas_7" }
)
LinkLuaModifier(
	"modifier_invoker_ice_wall_custom_root",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_invoker_quas_4"
)
LinkLuaModifier(
	"modifier_invoker_cold_snap_custom_resist",
	"abilities/invoker/invoker_quas_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_invoker_quas_3"
)

invoker_quas_custom = class({})
invoker_quas_custom.talents = {}

function invoker_quas_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_cold_snap_status.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_cold_snap.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_ghost_walk.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_arcane_start.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_arcane_end.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_ghost_walk_debuff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_ice_wall.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_ice_wall_b.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_ice_wall_debuff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_drow/drow_hypothermia_counter_stack.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_mark.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_crystalmaiden/maiden_frostbite_buff.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_dot_enemy.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/multi_armor.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/frost_legendary_active.vpcf", context)
	PrecacheResource("particle", "particles/invoker/invoker_ice_wall_custom.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/scepter_shields.vpcf", context)
end

function invoker_quas_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q3_heal = 0,

			has_q7 = 0,
			q7_stun = caster:GetTalentValue("modifier_invoker_quas_7", "stun", true),
			q7_radius = caster:GetTalentValue("modifier_invoker_quas_7", "radius", true),
			q7_duration = caster:GetTalentValue("modifier_invoker_quas_7", "duration", true),
			q7_damage = caster:GetTalentValue("modifier_invoker_quas_7", "damage", true) / 100,
			q7_max = caster:GetTalentValue("modifier_invoker_quas_7", "max", true),

			has_s1 = 0,
		}
	end

	if caster:HasTalent("modifier_invoker_quas_3") then
		self.talents.q3_heal = caster:GetTalentValue("modifier_invoker_quas_3", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_invoker_quas_3", type = 1, value = self.talents.q3_heal })
	end

	if caster:HasTalent("modifier_invoker_quas_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_invoker_spells_1") then
		self.talents.has_s1 = 1
	end
end

function invoker_quas_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "invoker_quas", self)
end

function invoker_quas_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_invoker_quas_custom_passive"
end

function invoker_quas_custom:ProcsMagicStick()
	return false
end

function invoker_quas_custom:GetBehavior()
	local bonus = 0
	if self.caster:HasShard() then
		bonus = DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM + DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
		+ bonus
end

function invoker_quas_custom:OnSpellStart()
	local modifier = self.caster:AddNewModifier(self.caster, self, "modifier_invoker_quas_custom", {})

	if IsValid(self.caster.invoke_ability) then
		self.caster.invoke_ability:AddOrb(modifier)
	end
end

modifier_invoker_quas_custom = class(mod_visible)
function modifier_invoker_quas_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_PERMANENT + MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_invoker_quas_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_invoker_quas_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_invoker_quas_custom:GetModifierConstantHealthRegen()
	if self.parent:HasShard() then
		return
	end
	return self.ability.health_regen
end

modifier_invoker_quas_custom_passive = class(mod_hidden)
function modifier_invoker_quas_custom_passive:IsAura()
	return (self.ability.talents.has_q7 == 1 or self.ability.talents.has_s1 == 0)
		and IsServer()
		and self.parent:IsAlive()
end
function modifier_invoker_quas_custom_passive:GetAuraDuration()
	return 0.1
end
function modifier_invoker_quas_custom_passive:GetAuraRadius()
	return self.ability.talents.q7_radius
end
function modifier_invoker_quas_custom_passive:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_invoker_quas_custom_passive:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_invoker_quas_custom_passive:GetModifierAura()
	return "modifier_invoker_cold_snap_custom_legendary_aura"
end
function modifier_invoker_quas_custom_passive:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.quas_ability = self.ability

	self.ability.health_regen = self.ability:GetSpecialValueFor("heal")
	self.str = self.ability:GetSpecialValueFor("strength_bonus") * self.ability:GetLevel()

	InvokerAbilityManager(self.parent)
end

function modifier_invoker_quas_custom_passive:OnRefresh()
	self:OnCreated()
end

function modifier_invoker_quas_custom_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_invoker_quas_custom_passive:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_invoker_quas_custom_passive:GetModifierConstantHealthRegen()
	if not self.parent:HasShard() then
		return
	end
	return 3 * self.ability.health_regen
end

function modifier_invoker_quas_custom_passive:GetAuraEntityReject(target)
	if target:IsFieldInvun(self.parent) then
		return true
	end
	return not target:HasModifier("modifier_invoker_cold_snap_custom")
		and not target:HasModifier("modifier_invoker_ghost_walk_custom_debuff")
		and not target:HasModifier("modifier_invoker_ice_wall_custom_slow")
end

modifier_invoker_cold_snap_custom_legendary_aura = class(mod_hidden)
function modifier_invoker_cold_snap_custom_legendary_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self:StartIntervalThink(1)
end

function modifier_invoker_cold_snap_custom_legendary_aura:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.parent:IsInvulnerable() then
		return
	end

	if self.parent:IsRealHero() and self.caster.invoke_ability then
		self.caster.invoke_ability.tracker:ScepterEvent("modifier_invoker_spells_1", 1)
	end

	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_invoker_cold_snap_custom_legendary_proc") then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_invoker_cold_snap_custom_legendary",
		{ duration = self.ability.talents.q7_duration }
	)
end

modifier_invoker_cold_snap_custom_legendary = class(mod_hidden)
function modifier_invoker_cold_snap_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q7_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.effect_cast =
		self.parent:GenericParticle("particles/units/heroes/hero_drow/drow_hypothermia_counter_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_invoker_cold_snap_custom_legendary:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self.effect_cast then
		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
	end

	if self:GetStackCount() >= self.max then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_invoker_cold_snap_custom_legendary_proc",
			{ duration = self.ability.talents.q7_stun }
		)
		self:Destroy()
	end
end

modifier_invoker_cold_snap_custom_legendary_proc = class(mod_hidden)
function modifier_invoker_cold_snap_custom_legendary_proc:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_invoker_cold_snap_custom_legendary_proc:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_invoker_cold_snap_custom_legendary_proc:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.max_time = self:GetRemainingTime()
	if self.parent:IsRealHero() and not IsValid(self.ability.legendary_mod) then
		self.ability.legendary_mod = self
		self:OnIntervalThink()
		self:StartIntervalThink(0.1)
	end

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage_type = DAMAGE_TYPE_MAGICAL,
		ability = self.ability,
		custom_flag = CUSTOM_FLAG_INVOKER_SNAP,
	}
	self.parent:AddDamageEvent_inc(self, true)

	self.parent:GenericParticle("particles/crystal_maiden/maiden_mark.vpcf", self, true)
	self.parent:EmitSound("Invoker.Quas_legendary_max")
end

function modifier_invoker_cold_snap_custom_legendary_proc:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.caster:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self:GetRemainingTime(),
		use_zero = 1,
		style = "InvokerQuas",
		priority = 0,
	})
end

function modifier_invoker_cold_snap_custom_legendary_proc:OnDestroy()
	if not IsServer() then
		return
	end
	if self.ability.legendary_mod ~= self then
		return
	end
	self.ability.legendary_mod = nil
	self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "InvokerQuas", priority = 0 })
end

function modifier_invoker_cold_snap_custom_legendary_proc:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_FROZEN] = true,
	}
end

function modifier_invoker_cold_snap_custom_legendary_proc:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if not params.attacker then
		return
	end
	if self.caster:GetTeamNumber() ~= params.attacker:GetTeamNumber() then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if params.damage < 10 and params.damage ~= 0 then
		return
	end
	if params.custom_flag and params.custom_flag == CUSTOM_FLAG_INVOKER_SNAP then
		return
	end
	if
		params.inflictor
		and (
			params.inflictor:GetName() == "item_phylactery_custom"
			or params.inflictor:GetName() == "item_angels_demise_custom"
		)
	then
		return
	end
	if not IsValid(self.caster.snap_ability) then
		return
	end

	self.damageTable.damage = self.caster.snap_ability:GetDamage(self.parent) * self.ability.talents.q7_damage

	local real_damage = DoDamage(self.damageTable, "modifier_invoker_quas_7")
	self.parent:SendNumber(4, real_damage)

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_invoker/invoker_cold_snap.vpcf",
		PATTACH_POINT_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControl(effect_cast, 1, params.attacker:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect_cast)

	self.parent:EmitSound("Invoker.Legendary_snap_damage")
end

invoker_cold_snap_custom = class({})
invoker_cold_snap_custom.talents = {}

function invoker_cold_snap_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_damage = 0,
			q1_creeps = 0,
			q1_duration = 0,

			q2_cd = 0,

			has_q3 = 0,
			q3_magic = 0,
			q3_heal_reduce = 0,
			q3_wall = caster:GetTalentValue("modifier_invoker_quas_3", "wall", true),
			q3_duration = caster:GetTalentValue("modifier_invoker_quas_3", "duration", true),
			q3_max = caster:GetTalentValue("modifier_invoker_quas_3", "max", true),

			has_s1 = 0,
			s1_stun_cd = caster:GetTalentValue("modifier_invoker_spells_1", "stun_cd", true),
		}
	end

	if caster:HasTalent("modifier_invoker_quas_1") then
		self.talents.has_q1 = 1
		self.talents.q1_damage = caster:GetTalentValue("modifier_invoker_quas_1", "damage") / 100
		self.talents.q1_creeps = caster:GetTalentValue("modifier_invoker_quas_1", "creeps")
		self.talents.q1_duration = caster:GetTalentValue("modifier_invoker_quas_1", "duration")
	end

	if caster:HasTalent("modifier_invoker_quas_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_invoker_quas_2", "cd")
	end

	if caster:HasTalent("modifier_invoker_quas_3") then
		self.talents.has_q3 = 1
		self.talents.q3_magic = caster:GetTalentValue("modifier_invoker_quas_3", "magic")
		self.talents.q3_heal_reduce = caster:GetTalentValue("modifier_invoker_quas_3", "heal_reduce")
	end

	if caster:HasTalent("modifier_invoker_spells_1") then
		self.talents.has_s1 = 1
	end
end

function invoker_cold_snap_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "invoker_cold_snap", self)
end

function invoker_cold_snap_custom:GetIntrinsicModifierName()
	if self:GetCaster():GetUnitName() == "npc_dota_hero_invoker" then
		return
	end
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_invoker_stolen_ability_tracker"
end

function invoker_cold_snap_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)
end

function invoker_cold_snap_custom:OnAbilityPhaseStart()
	self.caster:StartGesture(ACT_DOTA_CAST_COLD_SNAP)
	return true
end

function invoker_cold_snap_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_CAST_COLD_SNAP)
end

function invoker_cold_snap_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	if target:TriggerSpellAbsorb(self) then
		return
	end

	local duration = self.duration + self.talents.q1_duration

	if IsValid(self.caster.invoke_ability) then
		self.caster.invoke_ability:AbilityHit(target)
	end

	target:AddNewModifier(self.caster, self, "modifier_invoker_cold_snap_custom", { duration = duration })

	target:EmitSound("Hero_Invoker.ColdSnap.Cast")
	target:EmitSound("Hero_Invoker.ColdSnap")
end

function invoker_cold_snap_custom:ProcResist(target, is_wall)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_q3 == 0 then
		return
	end

	local wall = 0
	if is_wall then
		wall = 1
	end
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_invoker_cold_snap_custom_resist",
		{ duration = self.talents.q3_duration, wall = wall }
	)
end

function invoker_cold_snap_custom:GetDamage(target)
	if not IsServer() then
		return
	end
	local real_damage = self.freeze_damage

	if self.talents.has_q1 == 1 then
		if target:IsCreep() then
			real_damage = real_damage + self.talents.q1_creeps
		else
			real_damage = real_damage + target:GetMaxHealth() * self.talents.q1_damage
		end
	end
	return real_damage
end

modifier_invoker_cold_snap_custom = class(mod_visible)
function modifier_invoker_cold_snap_custom:IsPurgable()
	return self.ability.talents.has_s1 == 0 or not self.caster:HasScepter()
end
function modifier_invoker_cold_snap_custom:GetEffectName()
	return "particles/units/heroes/hero_invoker/invoker_cold_snap_status.vpcf"
end
function modifier_invoker_cold_snap_custom:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_invoker_cold_snap_custom:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability.freeze_duration
	self.cooldown = self.ability.freeze_cooldown
	self.threshold = self.ability.damage_trigger

	if not IsServer() then
		return
	end

	if self.ability.talents.has_s1 == 1 and self.caster:HasScepter() then
		self.cooldown = self.cooldown + self.ability.talents.s1_stun_cd
	end

	self.ability:EndCd()

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage_type = self.ability:GetAbilityDamageType(),
		ability = self.ability,
	}

	self.parent:AddDamageEvent_inc(self, true)

	self.onCooldown = false
	self:Freeze(self.caster)
end

function modifier_invoker_cold_snap_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

function modifier_invoker_cold_snap_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if not params.attacker then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if params.damage < self.threshold and params.damage ~= 0 then
		return
	end
	if self.onCooldown then
		return
	end
	self:Freeze(params.attacker)
end

function modifier_invoker_cold_snap_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.onCooldown = false
	self:StartIntervalThink(-1)
end

function modifier_invoker_cold_snap_custom:Freeze(attacker)
	if not IsServer() then
		return
	end
	if self.onCooldown then
		return
	end

	self.onCooldown = true

	self.damageTable.damage = self.ability:GetDamage(self.parent)
	DoDamage(self.damageTable)

	if
		self.caster:GetQuest() == "Invoker.Quest_5"
		and not self.caster:QuestCompleted()
		and self.parent:IsRealHero()
	then
		self.caster:UpdateQuest(1)
	end

	self.ability:ProcResist(self.parent)

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_invoker/invoker_cold_snap.vpcf",
		PATTACH_POINT_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControl(effect_cast, 1, attacker:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect_cast)
	self.parent:EmitSound("Hero_Invoker.ColdSnap.Freeze")

	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_invoker_cold_snap_custom_stun",
		{ duration = self.duration * (1 - self.parent:GetStatusResistance()) }
	)
	self:StartIntervalThink(self.cooldown)
end

modifier_invoker_cold_snap_custom_stun = class(mod_hidden)
function modifier_invoker_cold_snap_custom_stun:IsPurgeException()
	return true
end
function modifier_invoker_cold_snap_custom_stun:IsStunDebuff()
	return true
end
function modifier_invoker_cold_snap_custom_stun:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_invoker_cold_snap_custom_stun:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_invoker_cold_snap_custom_stun:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_FROZEN] = true,
	}
end

modifier_invoker_cold_snap_custom_resist = class(mod_visible)
function modifier_invoker_cold_snap_custom_resist:GetTexture()
	return "buffs/invoker/quas_3"
end
function modifier_invoker_cold_snap_custom_resist:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q3_max
	self.resist = self.ability.talents.q3_magic
	self.heal_reduce = self.ability.talents.q3_heal_reduce
	self.wall_count = 0

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh(kv)
end

function modifier_invoker_cold_snap_custom_resist:OnRefresh(kv)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	if kv.wall == 1 then
		self.wall_count = self.wall_count + 1
		if self.wall_count < self.ability.talents.q3_wall then
			return
		end
		self.wall_count = 0
	end

	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/drow_ranger/multi_armor.vpcf", self, true)
		self.parent:GenericParticle("particles/drow_ranger/frost_legendary_active.vpcf", self)
	end
end

function modifier_invoker_cold_snap_custom_resist:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_invoker_cold_snap_custom_resist:GetModifierMagicalResistanceBonus()
	return self.resist * self:GetStackCount()
end

function modifier_invoker_cold_snap_custom_resist:GetModifierHealChange()
	return self.heal_reduce * self:GetStackCount()
end

function modifier_invoker_cold_snap_custom_resist:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * self:GetStackCount()
end

invoker_ghost_walk_custom = class({})
invoker_ghost_walk_custom.talents = {}

function invoker_ghost_walk_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q2_cd = 0,

			has_h4 = 0,
			h4_damage_reduce = caster:GetTalentValue("modifier_invoker_hero_4", "damage_reduce", true),
			h4_regen = caster:GetTalentValue("modifier_invoker_hero_4", "regen", true) / 100,
			h4_duration = caster:GetTalentValue("modifier_invoker_hero_4", "duration", true),
		}
	end

	if caster:HasTalent("modifier_invoker_quas_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_invoker_quas_2", "cd")
	end

	if caster:HasTalent("modifier_invoker_hero_4") then
		self.talents.has_h4 = 1
	end
end

function invoker_ghost_walk_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "invoker_ghost_walk", self)
end

function invoker_ghost_walk_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
		+ DOTA_ABILITY_BEHAVIOR_HIDDEN
		+ DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
		+ DOTA_ABILITY_BEHAVIOR_SHOW_IN_GUIDES
end

function invoker_ghost_walk_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)
end

function invoker_ghost_walk_custom:OnSpellStart()
	self.caster:StartGesture(ACT_DOTA_CAST_GHOST_WALK)

	self.caster:AddNewModifier(self.caster, self, "modifier_invoker_ghost_walk_custom", { duration = self.duration })
	self.caster:GenericParticle("particles/units/heroes/hero_invoker/invoker_ghost_walk.vpcf")
	self.caster:EmitSound("Hero_Invoker.GhostWalk")
end

modifier_invoker_ghost_walk_custom = class(mod_visible)
function modifier_invoker_ghost_walk_custom:IsAura()
	return true
end
function modifier_invoker_ghost_walk_custom:GetModifierAura()
	return "modifier_invoker_ghost_walk_custom_debuff"
end
function modifier_invoker_ghost_walk_custom:GetAuraRadius()
	return self.radius
end
function modifier_invoker_ghost_walk_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_invoker_ghost_walk_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_invoker_ghost_walk_custom:GetAuraDuration()
	return self.aura_duration
end
function modifier_invoker_ghost_walk_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.area_of_effect
	self.aura_duration = self.ability.aura_fade_time
	self.self_slow = self.ability.self_slow
	self.enemy_slow = self.ability.enemy_slow
	self.health_regen = self.ability.health_regen
	self.mana_regen = self.ability.mana_regen
	if not IsServer() then
		return
	end

	self.parent:AddAttackStartEvent_out(self, true)
	self.parent:AddSpellEvent(self, true)

	if self.ability.talents.has_h4 == 1 then
		self.parent:GenericParticle("particles/arc_warden/scepter_shields.vpcf", self)
	end

	self.ability:EndCd()
	self.allow_abilities = {
		["invoker_quas_custom"] = true,
		["invoker_wex_custom"] = true,
		["invoker_exort_custom"] = true,
		["invoker_invoke_custom"] = true,
	}

	self.ended = false
end

function modifier_invoker_ghost_walk_custom:OnRefresh()
	self.ended = false
end

function modifier_invoker_ghost_walk_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

function modifier_invoker_ghost_walk_custom:CheckState()
	local state_table = {
		[MODIFIER_STATE_INVISIBLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}

	if self.ability.talents.has_h4 == 1 then
		state_table[MODIFIER_STATE_UNSLOWABLE] = true
	end
	return state_table
end

function modifier_invoker_ghost_walk_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_INVISIBILITY_LEVEL,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_invoker_ghost_walk_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.allow_abilities[params.ability:GetName()] then
		return
	end
	if params.unit ~= self.parent then
		return
	end

	self:EndEffect()
end

function modifier_invoker_ghost_walk_custom:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.attacker then
		return
	end
	if params.attacker ~= self.parent then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	self:EndEffect()
end

function modifier_invoker_ghost_walk_custom:EndEffect()
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end

	self.ended = true

	if self.ability.talents.has_h4 == 1 then
		self:SetDuration(self.ability.talents.h4_duration, true)
	else
		self:Destroy()
	end
end

function modifier_invoker_ghost_walk_custom:GetModifierConstantHealthRegen()
	return self.health_regen
		+ (self.ability.talents.has_h4 == 1 and self.parent:GetMaxHealth() * self.ability.talents.h4_regen or 0)
end

function modifier_invoker_ghost_walk_custom:GetModifierConstantManaRegen()
	return self.mana_regen
end

function modifier_invoker_ghost_walk_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.self_slow
end

function modifier_invoker_ghost_walk_custom:GetModifierInvisibilityLevel()
	return 1
end

function modifier_invoker_ghost_walk_custom:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_damage_reduce
end

modifier_invoker_ghost_walk_custom_debuff = class(mod_visible)
function modifier_invoker_ghost_walk_custom_debuff:GetEffectName()
	return "particles/units/heroes/hero_invoker/invoker_ghost_walk_debuff.vpcf"
end
function modifier_invoker_ghost_walk_custom_debuff:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_invoker_ghost_walk_custom_debuff:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_invoker_ghost_walk_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_invoker_ghost_walk_custom_debuff:OnCreated()
	self.ability = self:GetAbility()
	self.enemy_slow = self.ability.enemy_slow
end

function modifier_invoker_ghost_walk_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_invoker_ghost_walk_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.enemy_slow
end

invoker_ice_wall_custom = class({})
invoker_ice_wall_custom.talents = {}

function invoker_ice_wall_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q2_cd = 0,

			has_q4 = 0,
			q4_range = caster:GetTalentValue("modifier_invoker_quas_4", "range", true),
			q4_root = caster:GetTalentValue("modifier_invoker_quas_4", "root", true),
		}
	end

	if caster:HasTalent("modifier_invoker_quas_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_invoker_quas_2", "cd")
	end

	if caster:HasTalent("modifier_invoker_quas_4") then
		self.talents.has_q4 = 1
	end
end

function invoker_ice_wall_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "invoker_ice_wall", self)
end

function invoker_ice_wall_custom:GetBehavior()
	if self.talents.has_q4 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT
			+ DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
			+ DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
end

function invoker_ice_wall_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)
end

function invoker_ice_wall_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_q4 ~= 1 then
		return
	end
	return self.talents.q4_range
end

function invoker_ice_wall_custom:OnSpellStart()
	local target_point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * self.wall_place_distance
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_invoker_ice_wall_custom",
		{ duration = self.duration },
		target_point,
		self.caster:GetTeamNumber(),
		false
	)
end

function invoker_ice_wall_custom:OnVectorCastStart(vStartLocation, vDirection)
	local target = self:GetCursorPosition()
	if target == self.caster:GetAbsOrigin() then
		target = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	local ice_wall_length = self.wall_element_spacing * self.num_wall_elements
	local pos1 = GetGroundPosition(vStartLocation + (ice_wall_length / 2) * vDirection, nil)
	local pos2 = GetGroundPosition(vStartLocation - (ice_wall_length / 2) * vDirection, nil)

	CreateModifierThinker(self.caster, self, "modifier_invoker_ice_wall_custom", {
		duration = self.duration,
		start_x = pos1.x,
		start_y = pos1.y,
		start_z = pos1.z,
		end_x = pos2.x,
		end_y = pos2.y,
		end_z = pos2.z,
	}, target, self.caster:GetTeamNumber(), false)
end

modifier_invoker_ice_wall_custom = class(mod_hidden)
function modifier_invoker_ice_wall_custom:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()

	self.caster:StartGesture(ACT_DOTA_CAST_ICE_WALL)
	self.parent:EmitSound("Hero_Invoker.IceWall.Cast")

	self.hit_targets = {}
	self.walls = {}

	self.ice_wall_length = self.ability.wall_element_spacing * self.ability.num_wall_elements

	self:CreateWall(kv)

	if self.ability.talents.has_q4 == 1 and self.walls[1] then
		local dir = (self.walls[1].ice_wall_end_point - self.walls[1].ice_wall_start_point):Normalized()
		dir = Vector(-dir.y, dir.x, 0)

		local pos1 = self.parent:GetAbsOrigin() + dir * self.ice_wall_length / 2
		local pos2 = self.parent:GetAbsOrigin() - dir * self.ice_wall_length / 2

		self:CreateWall({
			start_x = pos1.x,
			start_y = pos1.y,
			start_z = pos1.z,
			end_x = pos2.x,
			end_y = pos2.y,
			end_z = pos2.z,
		})
	end

	self.slow_duration = self.ability.slow_duration
	self.ice_wall_area_of_effect = self.ability.wall_element_radius / 3
	self.search_area = self.ice_wall_length + (self.ice_wall_area_of_effect * 2)
	self.origin = self.parent:GetAbsOrigin()

	self.max_count = 0.5
	self.damage = self.ability.damage_per_second * self.max_count

	self.interval = 0.1
	self.count = self.max_count

	self.damageTable =
		{ attacker = self.caster, damage = self.damage, damage_type = DAMAGE_TYPE_MAGICAL, ability = self.ability }

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_invoker_ice_wall_custom:CreateWall(kv)
	if not IsServer() then
		return
	end
	local index = #self.walls + 1

	self.walls[index] = {}
	local caster_direction = self.caster:GetForwardVector()
	local cast_direction = Vector(-caster_direction.y, caster_direction.x, caster_direction.z)
	local endpoint_distance_from_center = (cast_direction * self.ice_wall_length) / 2
	local ice_wall_point = GetGroundPosition(self.parent:GetAbsOrigin(), nil)

	if kv.start_x then
		self.walls[index].ice_wall_start_point = Vector(kv.start_x, kv.start_y, kv.start_z)
		self.walls[index].ice_wall_end_point = Vector(kv.end_x, kv.end_y, kv.end_z)
	else
		self.walls[index].ice_wall_start_point = ice_wall_point - endpoint_distance_from_center
		self.walls[index].ice_wall_end_point = ice_wall_point + endpoint_distance_from_center
	end

	local ice_wall_particle_effect =
		ParticleManager:CreateParticle("particles/invoker/invoker_ice_wall_custom.vpcf", PATTACH_CUSTOMORIGIN, nil)
	ParticleManager:SetParticleControl(ice_wall_particle_effect, 0, self.walls[index].ice_wall_start_point)
	ParticleManager:SetParticleControl(ice_wall_particle_effect, 1, self.walls[index].ice_wall_end_point)
	ParticleManager:SetParticleControl(ice_wall_particle_effect, 3, Vector(self.ability.wall_element_radius, 0, 0))
	self:AddParticle(ice_wall_particle_effect, false, false, -1, false, true)

	local ice_spikes_particle_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_invoker/invoker_ice_wall_b.vpcf",
		PATTACH_CUSTOMORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(ice_spikes_particle_effect, 0, self.walls[index].ice_wall_start_point)
	ParticleManager:SetParticleControl(ice_spikes_particle_effect, 1, self.walls[index].ice_wall_end_point)
	self:AddParticle(ice_spikes_particle_effect, false, false, -1, false, true)
end

function modifier_invoker_ice_wall_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.count = self.count + self.interval

	for _, enemy in pairs(self.caster:FindTargets(self.search_area, self.origin)) do
		if self:IsUnitInProximity(enemy:GetAbsOrigin()) then
			if not self.hit_targets[enemy] then
				self.hit_targets[enemy] = true
				if IsValid(self.caster.invoke_ability) then
					self.caster.invoke_ability:AbilityHit(enemy)
				end
				if self.ability.talents.has_q4 == 1 then
					enemy:AddNewModifier(
						self.caster,
						self.ability,
						"modifier_invoker_ice_wall_custom_root",
						{ duration = (1 - enemy:GetStatusResistance()) * self.ability.talents.q4_root }
					)
				end
			end

			if self.count >= self.max_count then
				self.damageTable.damage = self.damage
				self.damageTable.victim = enemy
				DoDamage(self.damageTable)

				if IsValid(self.caster.snap_ability) then
					self.caster.snap_ability:ProcResist(enemy, true)
				end
			end

			enemy:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_invoker_ice_wall_custom_slow",
				{ duration = self.slow_duration }
			)
		end
	end

	if self.count >= self.max_count then
		self.count = 0
	end
end

function modifier_invoker_ice_wall_custom:IsUnitInProximity(target_position)
	local hit = false

	for _, data in pairs(self.walls) do
		local ice_wall = data.ice_wall_end_point - data.ice_wall_start_point
		local target_vector = target_position - data.ice_wall_start_point
		local ice_wall_normalized = ice_wall:Normalized()
		local ice_wall_dot_vector = target_vector:Dot(ice_wall_normalized)
		local search_point
		if ice_wall_dot_vector <= 0 then
			search_point = data.ice_wall_start_point
		elseif ice_wall_dot_vector >= ice_wall:Length2D() then
			search_point = data.ice_wall_end_point
		else
			search_point = data.ice_wall_start_point + (ice_wall_normalized * ice_wall_dot_vector)
		end
		local distance = target_position - search_point

		if distance:Length2D() <= self.ice_wall_area_of_effect * 3 then
			hit = true
			break
		end
	end

	return hit
end

modifier_invoker_ice_wall_custom_slow = class(mod_visible)
function modifier_invoker_ice_wall_custom_slow:GetEffectName()
	return "particles/units/heroes/hero_invoker/invoker_ice_wall_debuff.vpcf"
end
function modifier_invoker_ice_wall_custom_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_invoker_ice_wall_custom_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_invoker_ice_wall_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.slow = self.ability.slow
end

function modifier_invoker_ice_wall_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_invoker_ice_wall_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_invoker_ice_wall_custom_root = class(mod_hidden)
function modifier_invoker_ice_wall_custom_root:IsPurgable()
	return true
end
function modifier_invoker_ice_wall_custom_root:GetEffectName()
	return "particles/units/heroes/hero_crystalmaiden/maiden_frostbite_buff.vpcf"
end
function modifier_invoker_ice_wall_custom_root:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_invoker_ice_wall_custom_root:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_invoker_ice_wall_custom_root:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_invoker_ice_wall_custom_root:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:EmitSound("hero_Crystal.frostbite")
end

function modifier_invoker_ice_wall_custom_root:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("hero_Crystal.frostbite")
end

function modifier_invoker_ice_wall_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end