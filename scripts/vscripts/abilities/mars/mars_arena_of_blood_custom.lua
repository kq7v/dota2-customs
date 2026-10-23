--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_thinker",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_projectile_aura",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_tracker",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_legendary",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_legendary_stack",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_mars_arena_7"
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_legendary_slow",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_magic",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_mars_arena_3"
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_unit",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_wall",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_wall_slow",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_wall_blocker",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_wall_leash",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)
LinkLuaModifier(
	"modifier_mars_arena_of_blood_custom_cd_items",
	"abilities/mars/mars_arena_of_blood_custom",
	LUA_MODIFIER_MOTION_NONE
)

mars_arena_of_blood_custom = class({})
mars_arena_of_blood_custom.talents = {}

function mars_arena_of_blood_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/items3_fx/blink_overwhelming_start.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_overwhelming_end.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_mars/mars_arena_of_blood.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_purifyingflames.vpcf", context)
	PrecacheResource("particle", "particles/items/roshan_meteor_burn_.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/ascetic_cap.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/ember_slow.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_break.vpcf", context)
	PrecacheResource("particle", "particles/mars/mars_revenge_pre.vpcf", context)
	PrecacheResource("particle", "particles/mars/mars_revenge.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_mars/mars_shield_bash_crit.vpcf", context)
	PrecacheResource("particle", "particles/mars/mars_taunt_timer.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_brewmaster_thunder_clap.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_mars/mars_arena_of_blood_spear.vpcf", context)
	PrecacheResource("particle", "particles/mars/shard_wall.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/reinc_shield.vpcf", context)
	PrecacheResource("model", "models/heroes/mars/mars_soldier.vmdl", context)
end

function mars_arena_of_blood_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_spell = 0,

			has_r2 = 0,
			r2_cd = 0,
			r2_duration = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_magic = 0,
			r3_duration = caster:GetTalentValue("modifier_mars_arena_3", "duration", true),
			r3_effect_duration = caster:GetTalentValue("modifier_mars_arena_3", "effect_duration", true),
			r3_interval = caster:GetTalentValue("modifier_mars_arena_3", "interval", true),
			r3_max = caster:GetTalentValue("modifier_mars_arena_3", "max", true),

			has_r4 = 0,
			r4_damage_reduce = caster:GetTalentValue("modifier_mars_arena_4", "damage_reduce", true),
			r4_heal = caster:GetTalentValue("modifier_mars_arena_4", "heal", true) / 100,
			r4_duration = caster:GetTalentValue("modifier_mars_arena_4", "duration", true),
			r4_shield = caster:GetTalentValue("modifier_mars_arena_4", "shield", true) / 100,

			has_r7 = 0,
			r7_damage_inc = caster:GetTalentValue("modifier_mars_arena_7", "damage_inc", true) / 100,
			r7_cd_inc = caster:GetTalentValue("modifier_mars_arena_7", "cd_inc", true),

			has_q4 = 0,
			q4_move = caster:GetTalentValue("modifier_mars_spear_4", "move", true),
			q4_cd_items_arena = caster:GetTalentValue("modifier_mars_spear_4", "cd_items_arena", true) / 100,
		}
	end

	if caster:HasTalent("modifier_mars_arena_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_mars_arena_1", "damage") / 100
		self.talents.r1_spell = caster:GetTalentValue("modifier_mars_arena_1", "spell")
	end

	if caster:HasTalent("modifier_mars_arena_2") then
		self.talents.has_r2 = 1
		self.talents.r2_cd = caster:GetTalentValue("modifier_mars_arena_2", "cd")
		self.talents.r2_duration = caster:GetTalentValue("modifier_mars_arena_2", "duration")
	end

	if caster:HasTalent("modifier_mars_arena_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_mars_arena_3", "damage") / 100
		self.talents.r3_magic = caster:GetTalentValue("modifier_mars_arena_3", "magic")
		caster:AddProc(self.tracker, { illusion = true, land = true })
	end

	if caster:HasTalent("modifier_mars_arena_4") then
		self.talents.has_r4 = 1
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_mars_arena_4", type = 1, value = self.talents.r4_heal, proc = "LifestealShield" }
		)
	end

	if caster:HasTalent("modifier_mars_arena_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_mars_spear_4") then
		self.talents.has_q4 = 1
	end
end

function mars_arena_of_blood_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_mars_arena_of_blood_custom_tracker"
end

function mars_arena_of_blood_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.caster:HasScepter() and (self.scepter_cast or 0) or 0)
end

function mars_arena_of_blood_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
		+ (self.caster:HasScepter() and (self.scepter_range or 0) or 0)
end

function mars_arena_of_blood_custom:GetAOERadius()
	return self.radius or 0
end

function mars_arena_of_blood_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.r2_cd or 0)
end

function mars_arena_of_blood_custom:GetBehavior()
	local bonus = 0
	if self.caster:HasScepter() then
		bonus = DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE + bonus
end

function mars_arena_of_blood_custom:GetDamage(target)
	local k = 1
	local mod = target:FindModifierByName("modifier_mars_arena_of_blood_custom_legendary_stack")
	if mod then
		k = 1 + mod:GetStackCount() * self.talents.r7_damage_inc
	end
	return (self.damage + self.caster:GetStrength() * self.talents.r1_damage) * k
end

function mars_arena_of_blood_custom:OnSpellStart()
	local point = self:GetCursorPosition()

	if
		self.caster:HasScepter()
		and not self.caster:IsLeashed()
		and not self.caster:IsRooted()
		and self:GetAutoCastState()
	then
		local old_pos = self.caster:GetAbsOrigin()

		local effect = ParticleManager:CreateParticle(
			"particles/items3_fx/blink_overwhelming_start.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(effect, 0, old_pos)
		ParticleManager:ReleaseParticleIndex(effect)

		FindClearSpaceForUnit(self.caster, point, true)
		ProjectileManager:ProjectileDodge(self.caster)

		self.caster:GenericParticle("particles/items3_fx/blink_overwhelming_end.vpcf")
		self.caster:EmitSound("Mars.Arena_blink_end")
	end

	if
		self.talents.has_r7 == 1
		and IsValid(self.caster.arena_ability_legendary)
		and self.caster.arena_ability_legendary:GetCooldownTimeRemaining() > 0
	then
		self.caster:CdAbility(
			self.caster.arena_ability_legendary,
			self.caster.arena_ability_legendary:GetCooldownTimeRemaining() / self.talents.r7_cd_inc,
			nil,
			"modifier_mars_arena_7"
		)
	end

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_mars_arena_of_blood_custom_thinker",
		{},
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function mars_arena_of_blood_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if not self.caster:HasScepter() then
		return
	end
	if self.scepter_init then
		return
	end

	self:ToggleAutoCast()
	self.scepter_init = true
end

function mars_arena_of_blood_custom:DoDamage(target, damage_ability)
	if not IsServer() then
		return
	end

	local damageTable =
		{ attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL, custom_flag = "mars_r" }
	local damage_k = 1
	if damage_ability == "modifier_mars_arena_3" then
		damage_k = self.talents.r3_damage
	end

	damageTable.victim = target
	damageTable.damage = self:GetDamage(target) * damage_k
	DoDamage(damageTable, damage_ability)

	if self.talents.has_r3 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_mars_arena_of_blood_custom_magic",
			{ duration = self.talents.r3_effect_duration }
		)
	end
end

function mars_arena_of_blood_custom:SpawnSoldier(point)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r3 == 0 then
		return
	end

	local unit = CreateUnitByName("mars_arena_soldier_custom", point, false, nil, nil, self.caster:GetTeamNumber())

	unit.owner = self.caster
	unit:EmitSound("Mars.Bulwark_spawn")
	unit:RemoveGesture(ACT_DOTA_SPAWN)
	unit.ignore_assault = true
	unit:AddNewModifier(self.caster, self, "modifier_mars_arena_of_blood_custom_unit", {})
	unit:AddNewModifier(self.caster, self, "modifier_kill", { duration = self.talents.r3_duration })
end

modifier_mars_arena_of_blood_custom_thinker = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_thinker:IsAura()
	return true
end
function modifier_mars_arena_of_blood_custom_thinker:GetModifierAura()
	return "modifier_mars_arena_of_blood_custom_projectile_aura"
end
function modifier_mars_arena_of_blood_custom_thinker:GetAuraRadius()
	return self.radius
end
function modifier_mars_arena_of_blood_custom_thinker:GetAuraDuration()
	return 0.3
end
function modifier_mars_arena_of_blood_custom_thinker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_BOTH
end
function modifier_mars_arena_of_blood_custom_thinker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_mars_arena_of_blood_custom_thinker:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_mars_arena_of_blood_custom_thinker:GetAuraEntityReject(hEntity)
	return hEntity == self.parent
end
function modifier_mars_arena_of_blood_custom_thinker:OnCreated(kv)
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()

	self.duration = self.ability.duration + self.ability.talents.r2_duration
	self.radius = self.ability:GetAOERadius()

	if not IsServer() then
		return
	end

	self.ability:EndCd()

	self.parent.radius = self.radius
	self.caster.current_arena = self.parent

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_mars/mars_arena_of_blood.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius + 50, 0, 0))
	ParticleManager:SetParticleControl(particle, 2, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(particle, 3, self.parent:GetOrigin())
	self:AddParticle(particle, false, false, -1, false, false)

	self.parent:EmitSound("Hero_Mars.ArenaOfBlood.Start")

	self:StartIntervalThink(self.ability.formation_time)
end

function modifier_mars_arena_of_blood_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetOrigin(), self.radius, self.duration, false)
	EmitSoundOn("Hero_Mars.ArenaOfBlood", self.parent)

	self.parent:AddNewModifier(self.caster, self.ability, "modifier_mars_arena_of_blood", {})
	self.caster:AddNewModifier(self.caster, self.ability, "modifier_can_not_push", { duration = self.duration })

	if self.ability.talents.has_q4 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_mars_arena_of_blood_custom_cd_items",
			{ duration = self.duration }
		)
	end

	self:SetDuration(self.duration, true)
	self:StartIntervalThink(-1)
end

function modifier_mars_arena_of_blood_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability:StartCd()
	self.caster.current_arena = nil

	self.parent:EmitSound("Hero_Mars.ArenaOfBlood.End")
	StopSoundOn("Hero_Mars.ArenaOfBlood", self.parent)

	local modifiers = {}
	for k, v in pairs(self.parent:FindAllModifiers()) do
		modifiers[k] = v
	end
	for k, v in pairs(modifiers) do
		v:Destroy()
	end

	UTIL_Remove(self.parent)
end

modifier_mars_arena_of_blood_custom_projectile_aura = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_projectile_aura:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.is_enemy = self.parent:GetTeamNumber() ~= self.caster:GetTeamNumber()

	if not IsServer() then
		return
	end

	if self.is_enemy and self.caster:HasScepter() then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_mars_arena_of_blood_custom_legendary",
			{ thinker = self:GetAuraOwner():entindex() }
		)
	end
end

function modifier_mars_arena_of_blood_custom_projectile_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_mars_arena_of_blood_custom_projectile_aura:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if not self.is_enemy then
		return
	end
	return self.ability.talents.r4_damage_reduce
end

function modifier_mars_arena_of_blood_custom_projectile_aura:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if not self.is_enemy then
		return
	end
	return self.ability.talents.r4_damage_reduce
end

modifier_mars_arena_of_blood_custom_legendary = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true

	self.radius = self.ability.radius
	self.thinker = EntIndexToHScript(table.thinker)

	self.interval = FrameTime()
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_mars_arena_of_blood_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.parent:IsOutOfGame() then
		return
	end
	if self.parent:IsInvulnerable() then
		return
	end

	if not IsValid(self.thinker) then
		self:Destroy()
		return
	end

	local abs = self.thinker:GetAbsOrigin()
	local dir = self.parent:GetAbsOrigin() - abs
	local length = dir:Length2D()

	dir.z = 0
	dir = dir:Normalized()

	if length < self.radius then
		return
	end

	local point = abs + dir * self.radius * 0.7
	self.parent:SetOrigin(point)

	FindClearSpaceForUnit(self.parent, point, false)
	self.parent:InterruptMotionControllers(false)
	self.parent:AddNewModifier(self.caster, self.ability, "modifier_stunned", { duration = 0.2 })
end

modifier_mars_arena_of_blood_custom_tracker = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.arena_ability = self.ability

	self.parent.arena_ability_legendary = self.parent:FindAbilityByName("mars_revenge_custom")
	if self.parent.arena_ability_legendary then
		self.parent.arena_ability_legendary:UpdateTalents()
	end

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.formation_time = self.ability:GetSpecialValueFor("formation_time")
	self.ability.scepter_cast = self.ability:GetSpecialValueFor("scepter_cast")
	self.ability.scepter_range = self.ability:GetSpecialValueFor("scepter_range")

	self.parent:AddDamageEvent_out(self, true)
end

function modifier_mars_arena_of_blood_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_mars_arena_of_blood_custom_tracker:LifestealShield(params, heal)
	if not self.parent:HasModifier("modifier_mars_arena_of_blood_custom_projectile_aura") then
		return
	end
	local max_shield = self.parent:GetMaxHealth() * self.ability.talents.r4_shield

	if not IsValid(self.shield_mod) then
		self.shield_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield_multiple", {
			duration = self.ability.talents.r4_duration,
			shield_talent = "modifier_mars_arena_4",
			max_shield = max_shield,
		})
		if self.shield_mod then
			local particle = ParticleManager:CreateParticle(
				"particles/wraith_king/reinc_shield.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
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
			self.shield_mod:AddParticle(particle, false, false, -1, false, false)

			self.shield_mod:SetReduceDamage(function(params)
				local caster = params.caster
				local result = 1
				if IsValid(caster.bulwark_ability) then
					result = caster.bulwark_ability:GetReduction(params)
				end
				return 1 + result / 100
			end)
		end
	end

	if IsValid(self.shield_mod) then
		self.shield_mod:AddShield(heal, max_shield)
		self.shield_mod:SetDuration(self.ability.talents.r4_duration, true)
	end
end

function modifier_mars_arena_of_blood_custom_tracker:PlayEffect(abs, dir)
	if not IsServer() then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_mars/mars_arena_of_blood_spear.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, GetGroundPosition(abs, nil))
	ParticleManager:SetParticleControlForward(particle, 0, dir)
	ParticleManager:ReleaseParticleIndex(particle)
end

function modifier_mars_arena_of_blood_custom_tracker:GetProcChance()
	return 100
end

function modifier_mars_arena_of_blood_custom_tracker:AttackProc(params, name)
	if self.ability.talents.has_r3 == 0 then
		return
	end

	local attacker = params.attacker
	local target = params.target
	if
		not attacker.owner
		or attacker.owner ~= self.parent
		or not attacker:HasModifier("modifier_mars_arena_of_blood_custom_unit")
	then
		return
	end

	local dir = (target:GetAbsOrigin() - attacker:GetAbsOrigin()):Normalized()
	dir.z = 0

	local abs = target:GetAbsOrigin() - dir * 150
	self:PlayEffect(abs, dir)

	target:EmitSound("Hero_Mars.Attack_custom")
	self.ability:DoDamage(target, "modifier_mars_arena_3")
end

function modifier_mars_arena_of_blood_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.inflictor or params.inflictor ~= self.ability then
		return
	end
	if params.custom_flag == "mars_r" then
		return
	end

	if IsValid(self.parent.current_arena) then
		local dir = (params.unit:GetAbsOrigin() - self.parent.current_arena:GetAbsOrigin()):Normalized()
		dir.z = 0

		local abs = self.parent.current_arena:GetAbsOrigin() + dir * self.ability.radius * 0.8
		self:PlayEffect(abs, -dir)
	end

	self.ability:DoDamage(params.unit)
end

function modifier_mars_arena_of_blood_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_mars_arena_of_blood_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.r1_spell
end

modifier_mars_arena_of_blood_custom_magic = class(mod_visible)
function modifier_mars_arena_of_blood_custom_magic:GetTexture()
	return "buffs/mars/arena_3"
end
function modifier_mars_arena_of_blood_custom_magic:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_mars_arena_of_blood_custom_magic:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
	end
end

function modifier_mars_arena_of_blood_custom_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_mars_arena_of_blood_custom_magic:GetModifierMagicalResistanceBonus()
	return (self:GetStackCount() * self.ability.talents.r3_magic) / self.max
end

modifier_mars_arena_of_blood_custom_unit = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_unit:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.target = nil
	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_mars_arena_of_blood_custom_unit:OnIntervalThink()
	if not IsServer() then
		return
	end

	local target = self.parent:RandomTarget(self.parent:Script_GetAttackRange() + 50)
	if target then
		self.parent:SetForceAttackTarget(target)
	end
end

function modifier_mars_arena_of_blood_custom_unit:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_ROOTED] = true,
	}
end

function modifier_mars_arena_of_blood_custom_unit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_FIXED_ATTACK_RATE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_mars_arena_of_blood_custom_unit:GetModifierFixedAttackRate()
	return self.ability.talents.r3_interval
end

function modifier_mars_arena_of_blood_custom_unit:GetModifierAttackRangeBonus()
	return 150
end

modifier_mars_arena_of_blood_custom_cd_items = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_cd_items:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move = self.ability.talents.q4_move
	self.cd_items = self.ability.talents.q4_cd_items_arena
	self.interval = 0.5

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", self)
	self:StartIntervalThink(self.interval)
end

function modifier_mars_arena_of_blood_custom_cd_items:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:CdItems(self.cd_items * self.interval, "modifier_mars_spear_4")
end

function modifier_mars_arena_of_blood_custom_cd_items:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_mars_arena_of_blood_custom_cd_items:GetActivityTranslationModifiers()
	return "spear_stun"
end

function modifier_mars_arena_of_blood_custom_cd_items:GetModifierMoveSpeedBonus_Percentage()
	if self.parent:HasModifier("modifier_mars_spear_custom_hit_speed") then
		return
	end
	return self.move
end

mars_revenge_custom = class({})
mars_revenge_custom.talents = {}

function mars_revenge_custom:CreateTalent()
	self:SetHidden(false)
end

function mars_revenge_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_damage = caster:GetTalentValue("modifier_mars_arena_7", "damage", true) / 100,
			r7_radius = caster:GetTalentValue("modifier_mars_arena_7", "radius", true),
			r7_knock_duration = caster:GetTalentValue("modifier_mars_arena_7", "knock_duration", true),
			r7_knock_distance = caster:GetTalentValue("modifier_mars_arena_7", "knock_distance", true),
			r7_duration = caster:GetTalentValue("modifier_mars_arena_7", "duration", true),
			r7_slow_duration = caster:GetTalentValue("modifier_mars_arena_7", "slow_duration", true),
			r7_cast = caster:GetTalentValue("modifier_mars_arena_7", "cast", true),
			r7_max = caster:GetTalentValue("modifier_mars_arena_7", "max", true),
			r7_talent_cd = caster:GetTalentValue("modifier_mars_arena_7", "talent_cd", true),
			r7_cd_inc = caster:GetTalentValue("modifier_mars_arena_7", "cd_inc", true),
			r7_slow = caster:GetTalentValue("modifier_mars_arena_7", "slow", true),

			has_q2 = 0,
			q2_radius = 0,
		}
	end

	if caster:HasTalent("modifier_mars_spear_2") then
		self.talents.has_q2 = 1
		self.talents.q2_radius = caster:GetTalentValue("modifier_mars_spear_2", "radius")
	end
end

function mars_revenge_custom:GetCooldown()
	local k = 1
	if self.caster:HasModifier("modifier_mars_arena_of_blood_custom_projectile_aura") then
		k = self.talents.r7_cd_inc or 1
	end
	return (self.talents.r7_talent_cd or 0) / k
end

function mars_revenge_custom:GetCastAnimation()
	return 0
end

function mars_revenge_custom:GetCastPoint()
	return self.talents.r7_cast or 0
end

function mars_revenge_custom:GetCastRange(vLocation, hTarget)
	return self:GetAOERadius() - self.caster:GetCastRangeBonus()
end

function mars_revenge_custom:GetAOERadius()
	return (self.talents.r7_radius or 0) + (self.talents.q2_radius or 0)
end

function mars_revenge_custom:OnAbilityPhaseStart()
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_4, 0.3)
	self.caster:EmitSound("Mars.Revenge_pre")
	self.caster:EmitSound("Mars.Revenge_pre2")

	local timer = self.talents.r7_cast
	local radius = self:GetAOERadius()

	self.effect_cast =
		ParticleManager:CreateParticle("particles/mars/mars_revenge_pre.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.caster:GetOrigin())
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(radius, 0, -radius / timer))
	ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(timer, 0, 0))
	return true
end

function mars_revenge_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_4)
	ParticleManager:DestroyParticle(self.effect_cast, true)
	ParticleManager:ReleaseParticleIndex(self.effect_cast)
end

function mars_revenge_custom:OnSpellStart()
	self.caster:RemoveGesture(ACT_DOTA_CAST_ABILITY_4)
	self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_4)

	ParticleManager:DestroyParticle(self.effect_cast, true)
	ParticleManager:ReleaseParticleIndex(self.effect_cast)

	self.caster:EmitSound("Mars.Revenge_end")
	self.caster:EmitSound("Mars.Revenge_end2")

	if not self.caster.arena_ability then
		return
	end
	local radius = self:GetAOERadius()

	local effect_cast =
		ParticleManager:CreateParticle("particles/mars/mars_revenge.vpcf", PATTACH_WORLDORIGIN, self.caster)
	ParticleManager:SetParticleControl(effect_cast, 0, self.caster:GetOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(radius, radius, radius))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	for _, enemy in pairs(self.caster:FindTargets(radius)) do
		enemy:EmitSound("Mars.Revenge_end_target")
		local damage = self.caster.arena_ability:GetDamage(enemy) * self.talents.r7_damage

		local effect_cast = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_mars/mars_shield_bash_crit.vpcf",
			PATTACH_WORLDORIGIN,
			enemy
		)
		ParticleManager:SetParticleControl(effect_cast, 0, enemy:GetOrigin())
		ParticleManager:SetParticleControl(effect_cast, 1, enemy:GetOrigin())
		ParticleManager:SetParticleControlForward(
			effect_cast,
			1,
			(enemy:GetAbsOrigin() - self.caster:GetAbsOrigin()):Normalized()
		)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		local real_damage = DoDamage(
			{
				victim = enemy,
				attacker = self.caster,
				damage = damage,
				damage_type = DAMAGE_TYPE_MAGICAL,
				ability = self,
			},
			"modifier_mars_arena_7"
		)
		enemy:SendNumber(106, real_damage)

		if self.caster:HasModifier("modifier_mars_arena_of_blood_custom_projectile_aura") then
			local center = self.caster:GetAbsOrigin()
			local dir = (enemy:GetAbsOrigin() - center):Normalized()
			local point = self.caster:GetAbsOrigin() + dir * self.talents.r7_knock_distance

			local knockbackProperties = {
				center_x = center.x,
				center_y = center.y,
				center_z = center.z,
				duration = self.talents.r7_knock_duration,
				knockback_duration = self.talents.r7_knock_duration,
				knockback_distance = (point - enemy:GetAbsOrigin()):Length2D(),
				knockback_height = 0,
				should_stun = 0,
			}
			enemy:AddNewModifier(self.caster, self, "modifier_knockback", knockbackProperties)
		end

		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_mars_arena_of_blood_custom_legendary_stack",
			{ duration = self.talents.r7_duration }
		)
		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_mars_arena_of_blood_custom_legendary_slow",
			{ duration = self.talents.r7_slow_duration * (1 - enemy:GetStatusResistance()) }
		)
	end
end

modifier_mars_arena_of_blood_custom_legendary_stack = class(mod_visible)
function modifier_mars_arena_of_blood_custom_legendary_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r7_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_mars_arena_of_blood_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if not self.effect_cast then
		self.effect_cast = self.parent:GenericParticle("particles/mars/mars_taunt_timer.vpcf", self, true)
	end
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
end

modifier_mars_arena_of_blood_custom_legendary_slow = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_legendary_slow:IsPurgable()
	return true
end
function modifier_mars_arena_of_blood_custom_legendary_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_brewmaster_thunder_clap.vpcf"
end
function modifier_mars_arena_of_blood_custom_legendary_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_mars_arena_of_blood_custom_legendary_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.r7_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", self)
end

function modifier_mars_arena_of_blood_custom_legendary_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_mars_arena_of_blood_custom_legendary_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

mars_wall_custom = class({})
function mars_wall_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/mars/shard_wall.vpcf", context)
	PrecacheResource("particle", "particles/centaur/return_legendary_pulses.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", context)
end

function mars_wall_custom:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.damage = self:GetLevelSpecialValueFor("damage", 1)
	self.leash = self:GetLevelSpecialValueFor("leash", 1)
	self.slow = self:GetLevelSpecialValueFor("slow", 1)
	self.radius = self:GetLevelSpecialValueFor("radius", 1)
	self.duration = self:GetLevelSpecialValueFor("duration", 1)
	self.knock_duration = self:GetLevelSpecialValueFor("knock_duration", 1)
	self.knock_distance = self:GetLevelSpecialValueFor("knock_distance", 1)
end

function mars_wall_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 50
	end

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_mars_arena_of_blood_custom_wall",
		{ duration = self.duration },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_mars_arena_of_blood_custom_wall = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_wall:IsAura()
	return true
end
function modifier_mars_arena_of_blood_custom_wall:GetModifierAura()
	return "modifier_mars_arena_of_blood_custom_wall_slow"
end
function modifier_mars_arena_of_blood_custom_wall:GetAuraRadius()
	return self.radius
end
function modifier_mars_arena_of_blood_custom_wall:GetAuraDuration()
	return 0.5
end
function modifier_mars_arena_of_blood_custom_wall:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_mars_arena_of_blood_custom_wall:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_mars_arena_of_blood_custom_wall:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.radius = self.ability.radius
	self.duration = self.ability.duration
	self.point = self.parent:GetAbsOrigin()

	self.parent:EmitSound("Mars.Wall_start")
	self.parent:EmitSound("Mars.Wall_start2")

	local dir = (self.point - self.caster:GetAbsOrigin()):Normalized()
	dir.z = 0
	local point = self.point + dir * 150

	point = RotatePosition(self.point, QAngle(0, -90, 0), point)
	local new_dir = (point - self.point):Normalized()
	new_dir.z = 0

	local width = 70
	local wall_count = 5
	local start_point = self.point - math.floor(wall_count / 2) * new_dir * width

	for i = 1, wall_count do
		local new_point = GetGroundPosition((start_point + new_dir * (i - 1) * width), nil)
		CreateModifierThinker(
			self.caster,
			self.ability,
			"modifier_mars_arena_of_blood_custom_wall_blocker",
			{ duration = self.duration },
			new_point,
			self.caster:GetTeamNumber(),
			true
		)
	end

	width = 95
	start_point = self.point - width * new_dir

	for i = 0, 1 do
		local new_point = GetGroundPosition((start_point + new_dir * i * width * 2), nil)
		local particle = ParticleManager:CreateParticle("particles/mars/shard_wall.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, new_point)
		ParticleManager:SetParticleControlForward(particle, 0, new_dir)
		self:AddParticle(particle, false, false, -1, false, false)
	end

	local targets = self.caster:FindTargets(self.radius, self.point)
	if (self.caster:GetAbsOrigin() - self.point):Length2D() <= self.radius then
		table.insert(targets, self.caster)
	end

	local damageTable = {
		attacker = self.caster,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage = self.ability.damage,
	}

	for _, target in pairs(targets) do
		local vec = (target:GetAbsOrigin() - self.point):Normalized()
		if target:GetAbsOrigin() == self.point then
			vec = target:GetForwardVector()
		end
		FindClearSpaceForUnit(target, target:GetAbsOrigin(), false)

		local dist = self.ability.knock_distance
		local duration = self.ability.knock_duration
		if self.caster ~= target then
			damageTable.victim = target
			DoDamage(damageTable)
		end
		target:AddNewModifier(self.caster, self.caster:BkbAbility(self.ability, true), "modifier_generic_knockback", {
			direction_x = vec.x,
			direction_y = vec.y,
			distance = dist,
			height = 0,
			duration = duration,
			IsStun = false,
			IsFlail = true,
			Purgable = 1,
		})
		target:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_mars_arena_of_blood_custom_wall_leash",
			{ duration = (1 - target:GetStatusResistance()) * self.ability.leash }
		)
	end

	self:OnIntervalThink()
	self:StartIntervalThink(1.5)
end

function modifier_mars_arena_of_blood_custom_wall:OnIntervalThink()
	if not IsServer() then
		return
	end
	local effect_cast = ParticleManager:CreateParticle(
		"particles/centaur/return_legendary_pulses.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(effect_cast, 0, self.parent, PATTACH_ABSORIGIN_FOLLOW, nil, self.point, true)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, self.radius, self.radius))
	ParticleManager:SetParticleControlEnt(effect_cast, 2, self.parent, PATTACH_ABSORIGIN_FOLLOW, nil, self.point, true)
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function modifier_mars_arena_of_blood_custom_wall:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:EmitSound("Mars.Wall_end")
end

modifier_mars_arena_of_blood_custom_wall_slow = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_wall_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", self)
end

function modifier_mars_arena_of_blood_custom_wall_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_mars_arena_of_blood_custom_wall_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_mars_arena_of_blood_custom_wall_leash = class(mod_hidden)
function modifier_mars_arena_of_blood_custom_wall_leash:IsPurgable()
	return true
end
function modifier_mars_arena_of_blood_custom_wall_leash:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_mars_arena_of_blood_custom_wall_blocker = class(mod_hidden)