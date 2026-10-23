--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_tracker",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_legendary",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_carapace_7"
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_legendary_effect",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_speed",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_carapace_1"
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_attack",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_attack_cd",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_attack_health",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_carapace_3"
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_armor",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_hero_2"
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_move",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_hero_6"
)
LinkLuaModifier(
	"modifier_nyx_assassin_spiked_carapace_custom_heal_bonus",
	"abilities/nyx_assassin/nyx_assassin_spiked_carapace_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_carapace_2"
)

nyx_assassin_spiked_carapace_custom = class({})
nyx_assassin_spiked_carapace_custom.talents = {}

function nyx_assassin_spiked_carapace_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_nyx_assassin/nyx_assassin_spiked_carapace_hit.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_nyx_assassin/nyx_assassin_spiked_carapace.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_charge_mark.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/carapace_legendary_attack.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/carapace_legendary_attack2.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_proc.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_legendary.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/carapace_attack.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_speed.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/carapace_haste.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/mind_refresh.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_nyx_assassin/status_effect_nyx_assassin_spiked_carapace.vpcf",
		context
	)
end

function nyx_assassin_spiked_carapace_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_agi = 0,
			e1_max = caster:GetTalentValue("modifier_nyx_carapace_1", "max", true),
			e1_duration = caster:GetTalentValue("modifier_nyx_carapace_1", "duration", true),

			has_e2 = 0,
			e2_heal = 0,
			e2_duration = caster:GetTalentValue("modifier_nyx_carapace_2", "duration", true),
			e2_bonus = caster:GetTalentValue("modifier_nyx_carapace_2", "bonus", true),

			has_h2 = 0,
			h2_status = 0,
			h2_armor = 0,
			h2_max = caster:GetTalentValue("modifier_nyx_hero_2", "max", true),
			h2_duration = caster:GetTalentValue("modifier_nyx_hero_2", "duration", true),

			has_e3 = 0,
			e3_health = 0,
			e3_cd = 0,
			e3_radius = caster:GetTalentValue("modifier_nyx_carapace_3", "radius", true),
			e3_max = caster:GetTalentValue("modifier_nyx_carapace_3", "max", true),
			e3_duration = caster:GetTalentValue("modifier_nyx_carapace_3", "duration", true),

			has_e4 = 0,
			e4_damage_reduce = caster:GetTalentValue("modifier_nyx_carapace_4", "damage_reduce", true),
			e4_duration = caster:GetTalentValue("modifier_nyx_carapace_4", "duration", true),

			has_h6 = 0,
			h6_move = caster:GetTalentValue("modifier_nyx_hero_6", "move", true),
			h6_cd = caster:GetTalentValue("modifier_nyx_hero_6", "cd", true),
			h6_duration = caster:GetTalentValue("modifier_nyx_hero_6", "duration", true),
			h6_stun = caster:GetTalentValue("modifier_nyx_hero_6", "stun", true),

			has_e7 = 0,
			e7_health = caster:GetTalentValue("modifier_nyx_carapace_7", "health", true) / 100,
			e7_bva = caster:GetTalentValue("modifier_nyx_carapace_7", "bva", true),
			e7_cd_inc = caster:GetTalentValue("modifier_nyx_carapace_7", "cd_inc", true) / 100,
			e7_duration = caster:GetTalentValue("modifier_nyx_carapace_7", "duration", true),
			e7_creeps = caster:GetTalentValue("modifier_nyx_carapace_7", "creeps", true),
			e7_damage = caster:GetTalentValue("modifier_nyx_carapace_7", "damage", true),
		}
	end

	if caster:HasTalent("modifier_nyx_carapace_1") then
		self.talents.has_e1 = 1
		self.talents.e1_agi = caster:GetTalentValue("modifier_nyx_carapace_1", "agi")
	end

	if caster:HasTalent("modifier_nyx_carapace_2") then
		self.talents.has_e2 = 1
		self.talents.e2_heal = caster:GetTalentValue("modifier_nyx_carapace_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_nyx_carapace_2",
			type = 2,
			value = function()
				if caster:HasModifier("modifier_nyx_assassin_spiked_carapace_custom_heal_bonus") then
					return self.talents.e2_heal * self.talents.e2_bonus, nil, true
				end
				return self.talents.e2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_nyx_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_status = caster:GetTalentValue("modifier_nyx_hero_2", "status")
		self.talents.h2_armor = caster:GetTalentValue("modifier_nyx_hero_2", "armor")
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_nyx_carapace_3") then
		self.talents.has_e3 = 1
		self.talents.e3_health = caster:GetTalentValue("modifier_nyx_carapace_3", "health")
		self.talents.e3_cd = caster:GetTalentValue("modifier_nyx_carapace_3", "cd")
		caster:AddProc(self.tracker, { land = true })
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_nyx_carapace_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_nyx_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_nyx_carapace_7") then
		self.talents.has_e7 = 1
	end
end

function nyx_assassin_spiked_carapace_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "nyx_assassin_spiked_carapace", self)
end

function nyx_assassin_spiked_carapace_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_nyx_assassin_spiked_carapace_custom_tracker"
end

function nyx_assassin_spiked_carapace_custom:GetBehavior()
	local bonus = self.talents.has_e4 == 1 and DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE or 0
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + bonus
end

function nyx_assassin_spiked_carapace_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.has_h6 == 1 and self.talents.h6_cd or 0)
end

function nyx_assassin_spiked_carapace_custom:OnSpellStart()
	local duration = self.reflect_duration + (self.talents.has_e4 == 1 and self.talents.e4_duration or 0)

	self.caster:EmitSound("Hero_NyxAssassin.SpikedCarapace")
	self.caster:RemoveModifierByName("modifier_nyx_assassin_spiked_carapace_custom_legendary")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_nyx_assassin_spiked_carapace_custom",
		{ duration = duration }
	)
end

function nyx_assassin_spiked_carapace_custom:SpeedStack()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e1 == 0 then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_nyx_assassin_spiked_carapace_custom_speed",
		{ duration = self.talents.e1_duration }
	)
end

modifier_nyx_assassin_spiked_carapace_custom_tracker = class(mod_hidden)
function modifier_nyx_assassin_spiked_carapace_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.carapace_ability = self.ability

	self.ability.reflect_duration = self.ability:GetSpecialValueFor("reflect_duration")
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
	self.ability.damage_creeps = self.ability:GetSpecialValueFor("damage_creeps")
	self.ability.damage_reflect_pct = self.ability:GetSpecialValueFor("damage_reflect_pct") / 100
end

function modifier_nyx_assassin_spiked_carapace_custom_tracker:OnRefresh()
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
	self.ability.damage_creeps = self.ability:GetSpecialValueFor("damage_creeps")
end

function modifier_nyx_assassin_spiked_carapace_custom_tracker:GetProcChance()
	return 100
end

function modifier_nyx_assassin_spiked_carapace_custom_tracker:AttackProc(params, name)
	if self.ability.talents.has_e3 == 0 then
		return
	end

	local target = params.target
	target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_nyx_assassin_spiked_carapace_custom_attack_health",
		{ duration = self.ability.talents.e3_duration }
	)
end

function modifier_nyx_assassin_spiked_carapace_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	local attacker = params.attacker

	if not attacker:IsUnit() then
		return
	end

	if self.ability.talents.has_h2 == 1 and not params.inflictor then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_nyx_assassin_spiked_carapace_custom_armor",
			{ duration = self.ability.talents.h2_duration }
		)
	end

	if self.ability.talents.has_e3 == 0 then
		return
	end
	if bit.band(params.damage_flags, DOTA_DAMAGE_FLAG_REFLECTION) == DOTA_DAMAGE_FLAG_REFLECTION then
		return
	end
	if self.parent:HasModifier("modifier_nyx_assassin_vendetta_custom") then
		return
	end
	if not attacker:IsAlive() then
		return
	end
	if (attacker:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.ability.talents.e3_radius then
		return
	end
	if attacker:HasModifier("modifier_nyx_assassin_spiked_carapace_custom_attack_cd") then
		return
	end

	attacker:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_nyx_assassin_spiked_carapace_custom_attack_cd",
		{ duration = self.ability.talents.e3_cd }
	)
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_nyx_assassin_spiked_carapace_custom_attack", {})
	self.parent:PerformAttack(attacker, true, true, true, true, false, false, true)
	self.parent:RemoveModifierByName("modifier_nyx_assassin_spiked_carapace_custom_attack")

	local caster_pfx = ParticleManager:CreateParticle(
		"particles/nyx_assassin/carapace_attack.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		caster_pfx,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		caster_pfx,
		1,
		attacker,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		attacker:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(caster_pfx)

	attacker:EmitSound("Nyx.Carapace_attack")
end

function modifier_nyx_assassin_spiked_carapace_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_nyx_assassin_spiked_carapace_custom_tracker:GetModifierStatusResistanceStacking()
	return self.ability.talents.h2_status
end

modifier_nyx_assassin_spiked_carapace_custom = class(mod_visible)
function modifier_nyx_assassin_spiked_carapace_custom:GetStatusEffectName()
	return wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_nyx_assassin/status_effect_nyx_assassin_spiked_carapace.vpcf",
		self.ability
	)
end
function modifier_nyx_assassin_spiked_carapace_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_nyx_assassin_spiked_carapace_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.stun = self.ability.stun_duration + (self.ability.talents.has_h6 == 1 and self.ability.talents.h6_stun or 0)
	self.damage = self.ability.damage_reflect_pct
	self.damage_creeps = self.ability.damage_creeps

	if not IsServer() then
		return
	end
	self.ability:EndCd()

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_nyx_assassin/nyx_assassin_spiked_carapace.vpcf",
		self.ability
	)
	self.parent:GenericParticle(particle_name, self)

	self.damageTable = { attacker = self.parent, ability = self.ability, damage_flags = DOTA_DAMAGE_FLAG_REFLECTION }
	self.targets = {}

	if self.ability.talents.has_e7 == 0 then
		return
	end
	self.health = self.parent:GetMaxHealth() * self.ability.talents.e7_health
	self.mod = self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_nyx_assassin_spiked_carapace_custom_legendary",
		{ duration = self:GetRemainingTime() + 0.1 }
	)
end

function modifier_nyx_assassin_spiked_carapace_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if not self.proced and self.ability.talents.has_e7 == 1 then
		self.parent:CdAbility(self.ability, nil, self.ability.talents.e7_cd_inc, "modifier_nyx_carapace_7")
		local particle = ParticleManager:CreateParticle(
			"particles/nyx_assassin/mind_refresh.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end
end

function modifier_nyx_assassin_spiked_carapace_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_nyx_assassin_spiked_carapace_custom:GetAbsoluteNoDamagePhysical(params)
	return self:ReflectDamage(params)
end

function modifier_nyx_assassin_spiked_carapace_custom:GetAbsoluteNoDamagePure(params)
	return self:ReflectDamage(params)
end

function modifier_nyx_assassin_spiked_carapace_custom:GetAbsoluteNoDamageMagical(params)
	return self:ReflectDamage(params)
end

function modifier_nyx_assassin_spiked_carapace_custom:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_nyx_assassin_burrow_custom") then
		return
	end
	return self.ability.talents.e4_damage_reduce * (1 - self.parent:GetHealthPercent() / 100)
end

function modifier_nyx_assassin_spiked_carapace_custom:ProcStun(params)
	if not IsServer() then
		return
	end
	local attacker = params.victim
	if not IsValid(attacker) then
		return
	end

	if IsValid(self.parent.impale_ability) then
		self.parent.impale_ability:AbilityHit(attacker)
		if not self.cd_proc then
			self.cd_proc = true
			self.parent.impale_ability:ProcCd()
		end
	end

	if IsValid(self.parent.vendetta_ability) and not self.scarab_proc then
		self.scarab_proc = true
		self.parent.vendetta_ability:SpawnScarab(attacker:GetAbsOrigin())
	end

	if self.ability.talents.has_e2 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_nyx_assassin_spiked_carapace_custom_heal_bonus",
			{ duration = self.ability.talents.e2_duration }
		)
	end

	if not self.speed_proc then
		self.speed_proc = true
		self.ability:SpeedStack()
	end

	if self.ability.talents.has_h6 == 1 and not self.move_proc then
		self.move_proc = true
		self.parent:Purge(false, true, false, false, false)
		self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_dispel_magic.vpcf")
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_nyx_assassin_spiked_carapace_custom_move",
			{ duration = self.ability.talents.h6_duration }
		)
	end

	if not attacker:IsAlive() then
		return
	end

	self.damageTable.damage_type = params.damage_type
	self.damageTable.damage = params.damage
	self.damageTable.victim = attacker

	local stun = self.stun * (1 - attacker:GetStatusResistance())
	attacker:AddNewModifier(self.parent, self.ability, "modifier_stunned", { duration = stun })

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_nyx_assassin/nyx_assassin_spiked_carapace_hit.vpcf",
		self.ability
	)

	local stun_effect = ParticleManager:CreateParticle(particle_name, PATTACH_CUSTOMORIGIN_FOLLOW, attacker)
	ParticleManager:SetParticleControlEnt(
		stun_effect,
		1,
		attacker,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		attacker:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControl(stun_effect, 2, Vector(stun, 0, 0))
	ParticleManager:ReleaseParticleIndex(stun_effect)

	attacker:EmitSound("Hero_NyxAssassin.SpikedCarapace.Stun")
	DoDamage(self.damageTable)
end

function modifier_nyx_assassin_spiked_carapace_custom:ReflectDamage(params)
	if not IsServer() then
		return
	end
	if self.proced then
		return
	end

	local attacker = params.attacker
	if not attacker then
		return
	end
	if params.damage == 0 and not attacker:IsCreep() then
		return
	end
	if not attacker:IsUnit() then
		return
	end

	if params.target ~= self.parent then
		return
	end
	if bit.band(params.damage_flags, DOTA_DAMAGE_FLAG_REFLECTION) == DOTA_DAMAGE_FLAG_REFLECTION then
		return
	end
	if attacker:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end

	local block = 0
	if not self.targets[attacker] then
		local new_data = {
			damage_type = attacker:IsCreep() and DAMAGE_TYPE_MAGICAL or params.damage_type,
			damage = attacker:IsCreep() and self.damage_creeps or params.damage * self.damage,
			victim = attacker,
		}

		self.targets[attacker] = new_data
		if self.ability.talents.has_e7 == 0 then
			self:ProcStun(self.targets[attacker])
		else
			attacker:GenericParticle("particles/legion_commander/lc_odd_charge_mark.vpcf", self, true)
		end
		block = 1
	end

	if IsValid(self.mod) then
		local k = 1
		if attacker:IsCreep() and not towers[attacker:GetTeamNumber()] then
			k = self.ability.talents.e7_creeps
		end
		self.health = self.health - params.damage * k

		if self.health <= 0 then
			self.proced = true
			self.mod:ChangeStage()
			for _, data in pairs(self.targets) do
				self:ProcStun(data)
			end
		else
			self.mod:OnIntervalThink()
		end
	end

	return block
end

modifier_nyx_assassin_spiked_carapace_custom_legendary = class(mod_hidden)
function modifier_nyx_assassin_spiked_carapace_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.mod = self.parent:FindModifierByName("modifier_nyx_assassin_spiked_carapace_custom")
	if not self.mod then
		self:Destroy()
		return
	end

	self.parent:EmitSound("Nyx.Carapace_legendary_vo")

	self.max_time = self.mod:GetRemainingTime()
	self:SetStackCount(0)
	self.model = 0

	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	local time = 0
	local stack = 0
	local active = 0

	if self:GetStackCount() == 0 and IsValid(self.mod) then
		time = self.mod:GetRemainingTime()
		stack = self.mod.health
	end

	if self:GetStackCount() == 1 then
		time = self:GetRemainingTime()
		stack = "+" .. math.floor(self.ability.talents.e7_damage) .. "%"
		active = 1
	end

	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = time,
		stack = stack,
		active = active,
		priority = 2,
		style = "NyxCarapace",
	})
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, priority = 2, hide_full = 1, style = "NyxCarapace" })
	self.parent:RemoveModifierByName("modifier_nyx_assassin_spiked_carapace_custom_legendary_effect")
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:ChangeStage()
	if not IsServer() then
		return
	end
	if self:GetStackCount() == 1 then
		return
	end

	self:SetStackCount(1)
	self.model = 10
	self.max_time = self.ability.talents.e7_duration
	self:SetDuration(self.ability.talents.e7_duration, true)

	self.parent:EmitSound("Nyx.Carapace_legendary_start")
	self.parent:EmitSound("Nyx.Carapace_legendary_start2")
	self.parent:GenericParticle("particles/bristleback/brist_proc.vpcf")
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_3)

	self.legendary_particle =
		ParticleManager:CreateParticle("particles/bloodseeker/thirst_legendary.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.legendary_particle, false, false, -1, false, false)

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_nyx_assassin_spiked_carapace_custom_legendary_effect",
		{ duration = self:GetRemainingTime() }
	)
	self.parent:AddAttackRecordEvent_out(self, true)
	self.parent:AddProc(self, { land = true, any = true })
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:GetProcChance()
	return 100
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:AttackProc(params, name)
	params.target:EmitSound("Nyx.Carapace_legendary_attack")
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	local target = params.target

	if not target:IsUnit() then
		return
	end

	local dir = (target:GetOrigin() - self.parent:GetOrigin()):Normalized()
	local name = RandomInt(1, 2) == 1 and "particles/nyx_assassin/carapace_legendary_attack.vpcf"
		or "particles/nyx_assassin/carapace_legendary_attack2.vpcf"

	local particle = ParticleManager:CreateParticle(name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlForward(particle, 1, dir)
	ParticleManager:SetParticleControl(particle, 2, Vector(1, 1, 1))
	ParticleManager:SetParticleControlForward(particle, 5, dir)
	ParticleManager:ReleaseParticleIndex(particle)
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:GetModifierModelScale()
	if self:GetStackCount() <= 0 then
		return
	end
	return 10
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:GetModifierBaseDamageOutgoing_Percentage()
	if self:GetStackCount() <= 0 then
		return
	end
	return self.ability.talents.e7_damage
end

function modifier_nyx_assassin_spiked_carapace_custom_legendary:GetModifierBaseAttackTimeConstant()
	if self:GetStackCount() <= 0 then
		return
	end
	return self.ability.talents.e7_bva
end

modifier_nyx_assassin_spiked_carapace_custom_legendary_effect = class(mod_hidden)
function modifier_nyx_assassin_spiked_carapace_custom_legendary_effect:GetStatusEffectName()
	return "particles/status_fx/status_effect_life_stealer_rage.vpcf"
end
function modifier_nyx_assassin_spiked_carapace_custom_legendary_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end

modifier_nyx_assassin_spiked_carapace_custom_speed = class(mod_visible)
function modifier_nyx_assassin_spiked_carapace_custom_speed:GetTexture()
	return "buffs/nyx_assassin/carapace_1"
end
function modifier_nyx_assassin_spiked_carapace_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.agi = self.ability.talents.e1_agi
	self.max = self.ability.talents.e1_max

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_nyx_assassin_spiked_carapace_custom_speed:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_nyx_assassin_spiked_carapace_custom_speed:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_nyx_assassin_spiked_carapace_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
	}
end

function modifier_nyx_assassin_spiked_carapace_custom_speed:GetModifierBonusStats_Agility()
	return self.agi * self:GetStackCount()
end

modifier_nyx_assassin_spiked_carapace_custom_move = class(mod_hidden)
function modifier_nyx_assassin_spiked_carapace_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move = self.ability.talents.h6_move

	if not IsServer() then
		return
	end

	if self.ability.talents.has_h6 == 1 then
		self.parent:GenericParticle(
			self.ability.talents.has_e7 == 1 and "particles/nyx_assassin/carapace_haste.vpcf"
				or "particles/zeus/zuus_speed.vpcf",
			self
		)
	end
end

function modifier_nyx_assassin_spiked_carapace_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_nyx_assassin_spiked_carapace_custom_move:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

modifier_nyx_assassin_spiked_carapace_custom_attack_cd = class(mod_hidden)
modifier_nyx_assassin_spiked_carapace_custom_attack = class(mod_hidden)

modifier_nyx_assassin_spiked_carapace_custom_attack_health = class(mod_visible)
function modifier_nyx_assassin_spiked_carapace_custom_attack_health:GetTexture()
	return "buffs/nyx_assassin/carapace_3"
end
function modifier_nyx_assassin_spiked_carapace_custom_attack_health:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max
	self.health_reduce = self.ability.talents.e3_health

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_nyx_assassin_spiked_carapace_custom_attack_health:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_nyx_assassin_spiked_carapace_custom_attack_health:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_nyx_assassin_spiked_carapace_custom_attack_health:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_nyx_assassin_spiked_carapace_custom_attack_health:GetModifierExtraHealthPercentage()
	return self.health_reduce * self:GetStackCount()
end

modifier_nyx_assassin_spiked_carapace_custom_armor = class(mod_visible)
function modifier_nyx_assassin_spiked_carapace_custom_armor:GetTexture()
	return "buffs/nyx_assassin/hero_3"
end
function modifier_nyx_assassin_spiked_carapace_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.h2_max
	self.armor = self.ability.talents.h2_armor

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_nyx_assassin_spiked_carapace_custom_armor:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_nyx_assassin_spiked_carapace_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_nyx_assassin_spiked_carapace_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor * self:GetStackCount()
end

modifier_nyx_assassin_spiked_carapace_custom_heal_bonus = class(mod_visible)
function modifier_nyx_assassin_spiked_carapace_custom_heal_bonus:GetTexture()
	return "buffs/nyx_assassin/carapace_2"
end