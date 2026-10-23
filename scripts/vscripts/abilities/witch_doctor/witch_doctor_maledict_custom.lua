--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_witch_doctor_maledict_custom_tracker",
	"abilities/witch_doctor/witch_doctor_maledict_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_maledict_custom",
	"abilities/witch_doctor/witch_doctor_maledict_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_witch_doctor_maledict_custom_legendary_thinker",
	"abilities/witch_doctor/witch_doctor_maledict_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_maledict_custom_haste",
	"abilities/witch_doctor/witch_doctor_maledict_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_maledict_4"
)
LinkLuaModifier(
	"modifier_witch_doctor_maledict_custom_cd_items",
	"abilities/witch_doctor/witch_doctor_maledict_custom",
	LUA_MODIFIER_MOTION_NONE
)

witch_doctor_maledict_custom = class({})
witch_doctor_maledict_custom.talents = {}
witch_doctor_maledict_custom.active_mods = {}

function witch_doctor_maledict_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_witchdoctor/witchdoctor_maledict.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_witchdoctor/witchdoctor_maledict_aoe.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/maledict_legendary_proj.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/maledict_legendary_aoe.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/maledict_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti9/phase_boots_ti9.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/void_astral_slow.vpcf", context)
end

function witch_doctor_maledict_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e1_damage = 0,
			e1_spell = 0,

			e2_radius = 0,
			e2_cd = 0,

			has_e3 = 0,
			e3_magic_stack = 0,
			e3_heal_reduce_stack = 0,
			e3_heal = 0,
			e3_max = caster:GetTalentValue("modifier_witch_doctor_maledict_3", "max", true),

			has_e4 = 0,
			e4_duration = caster:GetTalentValue("modifier_witch_doctor_maledict_4", "duration", true),
			e4_move = caster:GetTalentValue("modifier_witch_doctor_maledict_4", "move", true),
			e4_cd_items = caster:GetTalentValue("modifier_witch_doctor_maledict_4", "cd_items", true),
			e4_effect_duration = caster:GetTalentValue("modifier_witch_doctor_maledict_4", "effect_duration", true),

			has_e7 = 0,
			e7_damage = caster:GetTalentValue("modifier_witch_doctor_maledict_7", "damage", true) / 100,

			has_h5 = 0,
			h5_damage_reduce = caster:GetTalentValue("modifier_witch_doctor_hero_5", "damage_reduce", true),
			h5_cast = caster:GetTalentValue("modifier_witch_doctor_hero_5", "cast", true),
			h5_silence = caster:GetTalentValue("modifier_witch_doctor_hero_5", "silence", true),

			w2_slow = 0,
		}
	end

	if caster:HasTalent("modifier_witch_doctor_maledict_1") then
		self.talents.e1_damage = caster:GetTalentValue("modifier_witch_doctor_maledict_1", "damage") / 100
		self.talents.e1_spell = caster:GetTalentValue("modifier_witch_doctor_maledict_1", "spell")
	end

	if caster:HasTalent("modifier_witch_doctor_maledict_2") then
		self.talents.e2_radius = caster:GetTalentValue("modifier_witch_doctor_maledict_2", "radius")
		self.talents.e2_cd = caster:GetTalentValue("modifier_witch_doctor_maledict_2", "cd")
	end

	if caster:HasTalent("modifier_witch_doctor_maledict_3") then
		self.talents.has_e3 = 1
		self.talents.e3_magic_stack = caster:GetTalentValue("modifier_witch_doctor_maledict_3", "magic")
			/ self.talents.e3_max
		self.talents.e3_heal_reduce_stack = caster:GetTalentValue("modifier_witch_doctor_maledict_3", "heal_reduce")
			/ self.talents.e3_max
		self.talents.e3_heal = caster:GetTalentValue("modifier_witch_doctor_maledict_3", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_witch_doctor_maledict_3",
			type = 1,
			value = function(params)
				if params.inflictor ~= self and params.inflictor ~= caster.maledict_legendary_ability then
					return 0
				end
				return self.talents.e3_heal
			end,
		})
	end

	if caster:HasTalent("modifier_witch_doctor_maledict_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_maledict_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_voodoo_2") then
		self.talents.w2_slow = caster:GetTalentValue("modifier_witch_doctor_voodoo_2", "slow")
	end
end

function witch_doctor_maledict_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "witch_doctor_maledict", self)
end

function witch_doctor_maledict_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_witch_doctor_maledict_custom_tracker"
end

function witch_doctor_maledict_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.e2_cd or 0)
end

function witch_doctor_maledict_custom:GetAOERadius()
	return (self.radius or 0) + (self.talents.e2_radius or 0)
end

function witch_doctor_maledict_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h5 == 1 and self.talents.h5_cast or 0)
end

function witch_doctor_maledict_custom:OnSpellStart()
	local point = self:GetCursorPosition()

	local radius = self:GetAOERadius()
	local duration = self.duration + (self.talents.has_e4 == 1 and self.talents.e4_duration or 0)

	local targets = self.caster:FindTargets(radius, point)
	local sound = "Hero_WitchDoctor.Maledict_CastFail"

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_witchdoctor/witchdoctor_maledict_aoe.vpcf",
		self
	)
	local aoe_pfx = ParticleManager:CreateParticle(particle_name, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(aoe_pfx, 0, point)
	ParticleManager:SetParticleControl(aoe_pfx, 1, Vector(radius, radius, radius))
	ParticleManager:ReleaseParticleIndex(aoe_pfx)

	if #targets > 0 then
		sound = "Hero_WitchDoctor.Maledict_Cast"
		for _, target in pairs(targets) do
			target:RemoveModifierByName("modifier_witch_doctor_maledict_custom")
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_witch_doctor_maledict_custom",
				{ duration = duration + 0.2 }
			)

			if self.talents.has_h5 == 1 then
				if target:IsHero() then
					target:EmitSound("SF.Raze_silence")
				end
				target:AddNewModifier(
					self.caster,
					self,
					"modifier_generic_silence",
					{ duration = (1 - target:GetStatusResistance()) * self.talents.h5_silence }
				)
			end
		end

		self:EndCd()
		if self.talents.has_e7 == 1 and not self:IsHidden() then
			self.caster:SwapAbilities(self:GetName(), "witch_doctor_maledict_custom_legendary", false, true)
		end
	end

	EmitSoundOnLocationWithCaster(point, sound, self.caster)
end

function witch_doctor_maledict_custom:CheckMods()
	if self:IsActivated() then
		return
	end

	local result = true
	for mod, _ in pairs(self.active_mods) do
		if IsValid(mod) then
			result = false
			break
		end
	end

	if not result then
		return
	end
	self:StartCd()
	if self.talents.has_e7 == 1 and self:IsHidden() then
		self.caster:SwapAbilities(self:GetName(), "witch_doctor_maledict_custom_legendary", true, false)
	end
end

modifier_witch_doctor_maledict_custom = class(mod_visible)
function modifier_witch_doctor_maledict_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_maledict.vpcf"
end
function modifier_witch_doctor_maledict_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_witch_doctor_maledict_custom:RemoveOnDeath()
	return false
end
function modifier_witch_doctor_maledict_custom:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.interval = 0.1

	self.tick_interval = self.ability.duration / self.ability.ticks
	self.tick_count = -self.interval

	self.resist_count = -self.interval

	self.damage_interval = 0.5
	self.damage_count = self.damage_interval

	self.legendary_stack = 0

	self.damage = self.ability.damage
	self.health_damage = self.ability.bonus_damage

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.ability.active_mods[self] = true

	self.start_health = self.parent:GetHealth()
	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	if self.parent:IsRealHero() and not self.ability.main_mod and self.ability.talents.has_e7 == 1 then
		self.ability.main_mod = self
	end

	self.max_time = self:GetRemainingTime()

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_witchdoctor/witchdoctor_maledict.vpcf",
		self
	)
	local particle = ParticleManager:CreateParticle(particle_name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self.tick_interval, 0, 0))
	self:AddParticle(particle, false, false, -1, true, false)

	if self.ability.talents.has_e4 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_witch_doctor_maledict_custom_haste",
			{ duration = self.ability.talents.e4_effect_duration }
		)
	end

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_witch_doctor_maledict_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.parent:IsAlive() then
		self:Destroy()
		return
	end

	if self.ability.talents.has_e3 == 1 and self:GetStackCount() < self.ability.talents.e3_max then
		self.resist_count = self.resist_count + self.interval
		if self.resist_count >= 1 then
			self.resist_count = 0
			self:IncrementStackCount()
		end
	end

	if self.ability.main_mod and self.ability.main_mod == self then
		local damage = (self.start_health - self.parent:GetHealth()) * self.health_damage * self:DamageInc()
		self.caster:UpdateUIshort({
			max_time = self.max_time,
			time = self:GetRemainingTime(),
			stack = math.max(0, damage),
			style = "WitchDoctorMaledict",
		})
	end

	self.damage_count = self.damage_count + self.interval
	if self.damage_count >= self.damage_interval then
		self.damage_count = 0
		local damage = (self.damage + self.ability.talents.e1_damage * self.caster:GetIntellect(false))
			* self:DamageInc()
			* self.damage_interval
		self.damageTable.damage = damage
		DoDamage(self.damageTable)
		if IsValid(self.caster.voodoo_ability) then
			self.caster.voodoo_ability:ProcDamage(self.parent)
		end
	end

	self.tick_count = self.tick_count + self.interval
	if self.tick_count < self.tick_interval then
		return
	end
	self.tick_count = 0

	local damage = (self.start_health - self.parent:GetHealth()) * self.health_damage * self:DamageInc()
	self.parent:EmitSound("Hero_WitchDoctor.Maledict_Tick")

	if
		self.caster:IsAlive()
		and self.ability.talents.has_e4 == 1
		and not self.caster:HasModifier("modifier_witch_doctor_maledict_custom_cd_items")
	then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_witch_doctor_maledict_custom_haste",
			{ duration = self.ability.talents.e4_effect_duration }
		)
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_witch_doctor_maledict_custom_cd_items",
			{ duration = 1 }
		)
		self.caster:CdItems(self.ability.talents.e4_cd_items, "modifier_witch_doctor_maledict_4")
	end

	if damage <= 0 then
		return
	end

	self.damageTable.damage = damage
	DoDamage(self.damageTable)
	self.parent:SendNumber(4, damage)

	if
		self.parent:IsRealHero()
		and self.caster:GetQuest() == "WitchDoctor.Quest_7"
		and (self.start_health - self.parent:GetHealth()) * self.health_damage
			>= self.parent:GetMaxHealth() * self.caster.quest.number / 100
	then
		self.caster:UpdateQuest(1)
	end
end

function modifier_witch_doctor_maledict_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.main_mod and self.ability.main_mod == self then
		self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "WitchDoctorMaledict" })
		self.ability.main_mod = nil
	end

	self.ability.active_mods[self] = nil
	self.ability:CheckMods()
end

function modifier_witch_doctor_maledict_custom:DamageInc()
	if not IsServer() then
		return
	end
	local result = 1
	if self.ability.talents.has_e7 == 1 then
		result = result * (1 + self.legendary_stack * self.ability.talents.e7_damage)
	end
	return result
end

function modifier_witch_doctor_maledict_custom:AddStack()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	self.legendary_stack = self.legendary_stack + 1

	if not self.particle then
		self.particle = self.parent:GenericParticle("particles/witch_doctor/maledict_legendary_stack.vpcf", self, true)
	end

	if not self.particle then
		return
	end
	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self.legendary_stack, 0))
end

function modifier_witch_doctor_maledict_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_witch_doctor_maledict_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.w2_slow
end

function modifier_witch_doctor_maledict_custom:GetModifierMagicalResistanceBonus()
	return self.ability.talents.e3_magic_stack * self:GetStackCount()
end

function modifier_witch_doctor_maledict_custom:GetModifierHealChange()
	return self.ability.talents.e3_heal_reduce_stack * self:GetStackCount()
end

function modifier_witch_doctor_maledict_custom:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.e3_heal_reduce_stack * self:GetStackCount()
end

function modifier_witch_doctor_maledict_custom:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_damage_reduce
end

function modifier_witch_doctor_maledict_custom:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_damage_reduce
end

modifier_witch_doctor_maledict_custom_tracker = class(mod_hidden)
function modifier_witch_doctor_maledict_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.maledict_ability = self.ability
	self.parent.maledict_legendary_ability = self.parent:FindAbilityByName("witch_doctor_maledict_custom_legendary")

	if IsValid(self.parent.maledict_legendary_ability) then
		if IsServer() and not self.parent.maledict_legendary_ability:IsTrained() then
			self.parent.maledict_legendary_ability:SetLevel(1)
		end
		self.parent.maledict_legendary_ability:UpdateTalents()
	end

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage") / 100
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.ticks = self.ability:GetSpecialValueFor("ticks")
	self.ability.duration = self.ability:GetSpecialValueFor("AbilityDuration")

	self:StartIntervalThink(2)
end

function modifier_witch_doctor_maledict_custom_tracker:OnRefresh()
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage") / 100
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_witch_doctor_maledict_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.ability:CheckMods()
end

function modifier_witch_doctor_maledict_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_witch_doctor_maledict_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.e1_spell
end

modifier_witch_doctor_maledict_custom_haste = class(mod_visible)
function modifier_witch_doctor_maledict_custom_haste:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e4_move
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/econ/events/ti9/phase_boots_ti9.vpcf", self)
end

function modifier_witch_doctor_maledict_custom_haste:CheckState()
	return {
		[MODIFIER_STATE_UNSLOWABLE] = true,
	}
end

function modifier_witch_doctor_maledict_custom_haste:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_witch_doctor_maledict_custom_haste:GetModifierMoveSpeedBonus_Percentage()
	return self.speed
end

modifier_witch_doctor_maledict_custom_cd_items = class(mod_hidden)

witch_doctor_maledict_custom_legendary = class({})
witch_doctor_maledict_custom_legendary.talents = {}

function witch_doctor_maledict_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e7_impact_damage = caster:GetTalentValue("modifier_witch_doctor_maledict_7", "impact_damage", true) / 100,
			e7_base = caster:GetTalentValue("modifier_witch_doctor_maledict_7", "base", true),
			e7_speed = caster:GetTalentValue("modifier_witch_doctor_maledict_7", "speed", true),
			e7_talent_cd = caster:GetTalentValue("modifier_witch_doctor_maledict_7", "talent_cd", true),
			e7_damage_type = caster:GetTalentValue("modifier_witch_doctor_maledict_7", "damage_type", true),
			e7_radius = caster:GetTalentValue("modifier_witch_doctor_maledict_7", "radius", true),

			e2_radius = 0,
		}
	end

	if caster:HasTalent("modifier_witch_doctor_maledict_2") then
		self.talents.e2_radius = caster:GetTalentValue("modifier_witch_doctor_maledict_2", "radius")
	end
end

function witch_doctor_maledict_custom_legendary:GetCooldown()
	return self.talents.e7_talent_cd or 0
end

function witch_doctor_maledict_custom_legendary:GetAOERadius()
	return (self.talents.e7_radius or 0) + (self.talents.e2_radius or 0)
end

function witch_doctor_maledict_custom_legendary:OnSpellStart()
	local point = self:GetCursorPosition()
	local origin = self.caster:GetAbsOrigin()

	if point == origin then
		point = origin + self.caster:GetForwardVector() * 50
	end

	local vec = point - origin
	local speed = self.talents.e7_speed
	local duration = vec:Length2D() / speed

	local dummy = CreateUnitByName("npc_dota_target_custom", point, false, nil, nil, self.caster:GetTeamNumber())
	dummy:AddNewModifier(
		self.caster,
		self,
		"modifier_witch_doctor_maledict_custom_legendary_thinker",
		{ duration = duration + 1 }
	)
	dummy:SetAbsOrigin(dummy:GetAbsOrigin() + Vector(0, 0, 20))
	dummy.maledict_target = true

	self.caster:EmitSound("WD.Maledict_legendary_cast")
	self.caster:EmitSound("WD.Maledict_legendary_cast2")

	local info = {
		Target = dummy,
		Source = self.caster,
		Ability = self,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		EffectName = "particles/witch_doctor/maledict_legendary_proj.vpcf",
		iMoveSpeed = speed,
		bDodgeable = false,
		bVisibleToEnemies = true,
		bProvidesVision = false,
	}
	ProjectileManager:CreateTrackingProjectile(info)
end

function witch_doctor_maledict_custom_legendary:OnProjectileHit(target, location)
	if not IsValid(target) then
		return
	end
	if not target.maledict_target then
		return
	end
	local radius = self:GetAOERadius()
	local point = GetGroundPosition(location, nil)

	AddFOWViewer(self.caster:GetTeamNumber(), point, radius, 3, false)
	EmitSoundOnLocationWithCaster(point, "WD.Maledict_legendary_hit", self.caster)

	local aoe_pfx =
		ParticleManager:CreateParticle("particles/witch_doctor/maledict_legendary_aoe.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(aoe_pfx, 0, point)
	ParticleManager:SetParticleControl(aoe_pfx, 1, Vector(radius, radius, radius))
	ParticleManager:ReleaseParticleIndex(aoe_pfx)

	local damageTable = {
		damage = self.talents.e7_base + self.caster:GetIntellect(false) * self.talents.e7_impact_damage,
		ability = self,
		damage_type = self.talents.e7_damage_type,
		attacker = self.caster,
	}
	local targets = self.caster:FindTargets(radius, point)

	for _, target in pairs(targets) do
		damageTable.victim = target
		DoDamage(damageTable, "modifier_witch_doctor_maledict_7")
		local mod = target:FindModifierByName("modifier_witch_doctor_maledict_custom")
		if mod then
			mod:AddStack()
		end

		if IsValid(self.caster.voodoo_ability) then
			self.caster.voodoo_ability:ProcDamage(target, true)
		end
	end

	if #targets > 0 then
		EmitSoundOnLocationWithCaster(point, "WD.Maledict_legendary_hit2", self.caster)
	end
end

modifier_witch_doctor_maledict_custom_legendary_thinker = class(mod_hidden)
function modifier_witch_doctor_maledict_custom_legendary_thinker:OnCreated()
	self.parent = self:GetParent()
end

function modifier_witch_doctor_maledict_custom_legendary_thinker:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_witch_doctor_maledict_custom_legendary_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	UTIL_Remove(self.parent)
end