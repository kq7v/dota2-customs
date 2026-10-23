--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_abaddon_aphotic_shield_custom",
	"abilities/abaddon/abaddon_aphotic_shield_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_abaddon_aphotic_shield_custom_legendary_effect",
	"abilities/abaddon/abaddon_aphotic_shield_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_aphotic_shield_custom_legendary_magic",
	"abilities/abaddon/abaddon_aphotic_shield_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_aphotic_7"
)
LinkLuaModifier(
	"modifier_abaddon_aphotic_shield_custom_blink",
	"abilities/abaddon/abaddon_aphotic_shield_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_aphotic_shield_custom_tracker",
	"abilities/abaddon/abaddon_aphotic_shield_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_aphotic_shield_custom_immune",
	"abilities/abaddon/abaddon_aphotic_shield_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_aphotic_7"
)
LinkLuaModifier(
	"modifier_abaddon_aphotic_shield_custom_str_stack",
	"abilities/abaddon/abaddon_aphotic_shield_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_aphotic_4"
)
LinkLuaModifier(
	"modifier_abaddon_aphotic_shield_custom_burn",
	"abilities/abaddon/abaddon_aphotic_shield_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_aphotic_3"
)

abaddon_aphotic_shield_custom = class({})
abaddon_aphotic_shield_custom.talents = {}

function abaddon_aphotic_shield_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_aphotic_shield.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_aphotic_shield_hit.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/shield_stun.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/shield_legendary.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf",
		context
	)
	PrecacheResource("particle", "particles/abaddon/shield_legendary_target.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/shield_blink.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_shield_active.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/shield_immune.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/shield_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/snapfire_lizard_blobs_arced.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_burning_shield.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/shield_legendary_immune.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/shield_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_burn.vpcf", context)
end

function abaddon_aphotic_shield_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_base = 0,
			w1_shield = 0,

			w2_mana = 0,
			w2_cd = 0,

			has_w3 = 0,
			w3_base = 0,
			w3_damage = 0,
			w3_heal = caster:GetTalentValue("modifier_abaddon_aphotic_3", "heal", true) / 100,
			w3_interval = caster:GetTalentValue("modifier_abaddon_aphotic_3", "interval", true),
			w3_duration = caster:GetTalentValue("modifier_abaddon_aphotic_3", "duration", true),
			w3_stack = caster:GetTalentValue("modifier_abaddon_aphotic_3", "stack", true),
			w3_damage_type = caster:GetTalentValue("modifier_abaddon_aphotic_3", "damage_type", true),

			has_w4 = 0,
			w4_stun = caster:GetTalentValue("modifier_abaddon_aphotic_4", "stun", true),
			w4_max = caster:GetTalentValue("modifier_abaddon_aphotic_4", "max", true),
			w4_duration = caster:GetTalentValue("modifier_abaddon_aphotic_4", "duration", true),
			w4_str = caster:GetTalentValue("modifier_abaddon_aphotic_4", "str", true),
			w4_stun_stack = caster:GetTalentValue("modifier_abaddon_aphotic_4", "stun_stack", true),
			w4_damage = caster:GetTalentValue("modifier_abaddon_aphotic_4", "damage", true),

			has_w7 = 0,
			w7_radius = caster:GetTalentValue("modifier_abaddon_aphotic_7", "radius", true),
			w7_heal = caster:GetTalentValue("modifier_abaddon_aphotic_7", "heal", true) / 100,
			w7_slow = caster:GetTalentValue("modifier_abaddon_aphotic_7", "slow", true),
			w7_max = caster:GetTalentValue("modifier_abaddon_aphotic_7", "max", true),
			w7_duration = caster:GetTalentValue("modifier_abaddon_aphotic_7", "duration", true),
			w7_interval = caster:GetTalentValue("modifier_abaddon_aphotic_7", "interval", true),
			w7_magic = caster:GetTalentValue("modifier_abaddon_aphotic_7", "magic", true),
			w7_effect_duration = caster:GetTalentValue("modifier_abaddon_aphotic_7", "effect_duration", true),
			w7_damage = caster:GetTalentValue("modifier_abaddon_aphotic_7", "damage", true) / 100,

			h2_magic = 0,
			h2_armor = 0,
			h2_bonus = caster:GetTalentValue("modifier_abaddon_hero_2", "bonus", true),

			has_h5 = 0,
			h5_range = caster:GetTalentValue("modifier_abaddon_hero_5", "range", true),
			h5_duration = caster:GetTalentValue("modifier_abaddon_hero_5", "duration", true),
		}
	end

	if caster:HasTalent("modifier_abaddon_aphotic_1") then
		self.talents.w1_base = caster:GetTalentValue("modifier_abaddon_aphotic_1", "base")
		self.talents.w1_shield = caster:GetTalentValue("modifier_abaddon_aphotic_1", "shield") / 100
	end

	if caster:HasTalent("modifier_abaddon_aphotic_2") then
		self.talents.w2_mana = caster:GetTalentValue("modifier_abaddon_aphotic_2", "mana")
		self.talents.w2_cd = caster:GetTalentValue("modifier_abaddon_aphotic_2", "cd")
	end

	if caster:HasTalent("modifier_abaddon_aphotic_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_abaddon_aphotic_3", "damage") / 100
		self.talents.w3_base = caster:GetTalentValue("modifier_abaddon_aphotic_3", "base")
	end

	if caster:HasTalent("modifier_abaddon_aphotic_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_abaddon_aphotic_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_abaddon_hero_2") then
		self.talents.h2_magic = caster:GetTalentValue("modifier_abaddon_hero_2", "magic")
		self.talents.h2_armor = caster:GetTalentValue("modifier_abaddon_hero_2", "armor")
	end

	if caster:HasTalent("modifier_abaddon_hero_5") then
		self.talents.has_h5 = 1
	end
end

function abaddon_aphotic_shield_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "abaddon_aphotic_shield", self)
end

function abaddon_aphotic_shield_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_abaddon_aphotic_shield_custom_tracker"
end

function abaddon_aphotic_shield_custom:GetCastRange()
	if self.talents.has_h5 == 1 then
		if IsClient() then
			return self.talents.h5_range
		else
			return 999999
		end
	end
	return self.radius or 0
end

function abaddon_aphotic_shield_custom:GetCastPoint()
	if self.talents.has_h5 == 1 then
		return 0
	end
	return self.BaseClass.GetCastPoint(self)
end

function abaddon_aphotic_shield_custom:GetBehavior()
	if IsSoloMode() then
		local result = DOTA_ABILITY_BEHAVIOR_NO_TARGET
		if self.talents.has_h5 == 1 then
			result = DOTA_ABILITY_BEHAVIOR_POINT
		end
		return result
	else
		local result = DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
		if self.talents.has_h5 == 1 then
			result = result + DOTA_ABILITY_BEHAVIOR_POINT
		end
		return result
	end
end

function abaddon_aphotic_shield_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.w2_cd or 0)
end

function abaddon_aphotic_shield_custom:OnSpellStart()
	local target = self.caster

	if self:GetCursorTarget() and self:GetCursorTarget() ~= self.caster then
		target = self:GetCursorTarget()
	else
		if self.talents.has_h5 == 1 and not self.caster:IsRooted() and not self.caster:IsLeashed() then
			local range = self.talents.h5_range + self.caster:GetCastRangeBonus()
			local point = self:GetCursorPosition()

			if point == self.caster:GetAbsOrigin() then
				point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
			end

			local dir = (point - self.caster:GetAbsOrigin()):Normalized()

			if (point - self.caster:GetAbsOrigin()):Length2D() > range then
				point = self.caster:GetAbsOrigin() + dir * range
			end

			self.caster:FacePoint(point)
			EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Abaddon.Shield_blink_start", self.caster)
			EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Abaddon.Shield_blink_start2", self.caster)
			EmitSoundOnLocationWithCaster(point, "Abaddon.Shield_blink_end1", self.caster)
			self.caster:AddNewModifier(
				self.caster,
				self,
				"modifier_abaddon_aphotic_shield_custom_blink",
				{ x = point.x, y = point.y, duration = self.talents.h5_duration }
			)
		end
	end

	if self.talents.has_h5 == 1 then
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_4)
	end

	target:AddNewModifier(self.caster, self, "modifier_abaddon_aphotic_shield_custom", { duration = self.duration })
	target:Purge(false, true, false, true, true)
end

function abaddon_aphotic_shield_custom:AddBurn(target, is_shield)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end

	local stack = is_shield and self.talents.w3_stack or 1
	for i = 1, stack do
		target:AddNewModifier(self.caster, self, "modifier_abaddon_aphotic_shield_custom_burn", {})
	end
end

modifier_abaddon_aphotic_shield_custom = class(mod_visible)
function modifier_abaddon_aphotic_shield_custom:IsAura()
	return IsServer() and self.is_caster and self.parent:IsAlive() and self.ability.talents.has_w7 == 1
end
function modifier_abaddon_aphotic_shield_custom:GetAuraDuration()
	return 0.1
end
function modifier_abaddon_aphotic_shield_custom:GetAuraRadius()
	return self.legendary_radius
end
function modifier_abaddon_aphotic_shield_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_abaddon_aphotic_shield_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_abaddon_aphotic_shield_custom:GetModifierAura()
	return "modifier_abaddon_aphotic_shield_custom_legendary_effect"
end
function modifier_abaddon_aphotic_shield_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.barrier = self.ability.damage_absorb
		+ self.ability.talents.w1_base
		+ self.ability.talents.w1_shield * self.parent:GetMaxHealth()
	self.radius = self.ability.radius
	self.damage = self.barrier

	self.max_shield = self.barrier
	self.shield = self.max_shield

	self.size = 90

	if not IsServer() then
		return
	end
	self.is_caster = self.caster == self.parent

	self:SetHasCustomTransmitterData(true)
	self.RemoveForDuel = true

	local legendary = self.caster.aphotic_legendary_ability
	if self.ability.talents.has_w7 == 1 and self.is_caster and IsValid(legendary) and not self.ability:IsHidden() then
		self.parent:SwapAbilities(self.ability:GetName(), legendary:GetName(), false, true)
		legendary:StartCooldown(0.2)
	end

	self.max_timer = self:GetRemainingTime()
	self.ability:EndCd()

	self.parent:EmitSound("Hero_Abaddon.AphoticShield.Cast")
	self.parent:EmitSound("Hero_Abaddon.AphoticShield.Loop")

	self.damageTable =
		{ attacker = self.caster, damage_type = self.ability:GetAbilityDamageType(), ability = self.ability }

	self:PlayEffects()
	self:ScepterProc()

	if not self.is_caster then
		return
	end
	self.damage_count = 0

	if self.ability.talents.has_w4 == 1 then
		self.parent:AddDamageEvent_out(self, true)
	end

	if self.ability.talents.has_w7 == 0 then
		return
	end
	self.parent:AddLifesteal(self, {
		name = "modifier_abaddon_aphotic_7",
		heal = false,
		proc = "LifestealShield",
		value = function()
			if not self.parent:HasModifier("modifier_abaddon_aphotic_shield_custom_immune") then
				return 0
			end
			return self.ability.talents.w7_heal
		end,
	})

	self.legendary_radius = self.ability.talents.w7_radius
	self.legendary_damage = self.ability.talents.w7_damage
	self.damage_interval = self.ability.talents.w7_interval

	local effect_cast =
		ParticleManager:CreateParticle("particles/abaddon/shield_legendary.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(
		effect_cast,
		2,
		Vector(self.legendary_radius, self.legendary_radius, self.legendary_radius)
	)
	self:AddParticle(effect_cast, false, false, -1, false, false)

	self.parent:EmitSound("Abaddon.Shield_legendary_start")
	self.parent:EmitSound("Abaddon.Shield_legendary_start2")
	self.parent:EmitSound("Abaddon.Shield_legendary_loop")

	self.count = self.damage_interval
	self.stack_count = 0
	self.interval = 0.1

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_abaddon_aphotic_shield_custom:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.unit:IsRealHero() then
		return
	end
	if params.damage <= 0 then
		return
	end

	local final = self.damage_count + params.damage
	if final >= self.ability.talents.w4_damage then
		local delta = math.floor(final / self.ability.talents.w4_damage)
		for i = 1, delta do
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_abaddon_aphotic_shield_custom_str_stack",
				{ duration = self.ability.talents.w4_duration }
			)
		end
		self.damage_count = final - delta * self.ability.talents.w4_damage
	else
		self.damage_count = final
	end
end

function modifier_abaddon_aphotic_shield_custom:LifestealShield(params, shield)
	self.shield = math.min(self.max_shield, self.shield + shield)
	self:SendBuffRefreshToClients()
end

function modifier_abaddon_aphotic_shield_custom:ScepterProc()
	if not IsServer() then
		return
	end
	if not self.caster:HasScepter() then
		return
	end
	if not IsValid(self.caster.mist_ability) then
		return
	end

	local target = self.caster:RandomTarget(self.ability.scepter_radius)
	if not target then
		return
	end

	self.caster.mist_ability:OnSpellStart(target, "scepter")
end

function modifier_abaddon_aphotic_shield_custom:AddCustomTransmitterData()
	return {
		shield = self.shield,
	}
end

function modifier_abaddon_aphotic_shield_custom:HandleCustomTransmitterData(data)
	self.shield = data.shield
end

function modifier_abaddon_aphotic_shield_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.count = self.count + self.interval

	if self.count >= self.damage_interval - FrameTime() then
		self.count = 0
		local real_damage = (self.legendary_damage * self.parent:GetMaxHealth()) * self.damage_interval
		for _, target in pairs(self.parent:FindTargets(self.legendary_radius)) do
			local hit_effect = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_abaddon/abaddon_burning_shield.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
				target
			)
			ParticleManager:SetParticleControlEnt(
				hit_effect,
				0,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetAbsOrigin(),
				false
			)
			ParticleManager:SetParticleControlEnt(
				hit_effect,
				1,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				false
			)
			ParticleManager:ReleaseParticleIndex(hit_effect)
			DoDamage(
				{
					victim = target,
					attacker = self.parent,
					damage_type = DAMAGE_TYPE_MAGICAL,
					ability = self.ability,
					damage = real_damage,
				},
				"modifier_abaddon_aphotic_7"
			)
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_abaddon_aphotic_shield_custom_legendary_magic",
				{ duration = self.ability.talents.w7_effect_duration }
			)
		end
	end

	self.parent:UpdateUIshort({
		time = self:GetRemainingTime(),
		max_time = self.max_timer,
		stack = self:GetRemainingTime(),
		use_zero = 1,
		active = self.ability:IsHidden() and 0 or 1,
		style = "AbaddonShield",
	})
end

function modifier_abaddon_aphotic_shield_custom:OnDestroy()
	if not IsServer() then
		return
	end

	self:ScepterProc()

	if IsValid(self.caster.mist_ability) then
		self.caster.mist_ability:ProcMove(true)
	end

	if self.ability.talents.has_w7 == 1 then
		self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "AbaddonShield" })
		self.parent:StopSound("Abaddon.Shield_legendary_loop")
		self.parent:StopSound("Abaddon.Shield_legendary_start2")
	end

	if self.ability.talents.has_w7 == 1 and self.ability:IsHidden() then
		self.parent:SwapAbilities(self.ability:GetName(), "abaddon_aphotic_shield_custom_legendary", true, false)
	end

	self.ability:StartCd()
	local stun = 0
	local mod = self.parent:FindModifierByName("modifier_abaddon_aphotic_shield_custom_str_stack")
	if mod and mod:GetStackCount() >= self.ability.talents.w4_stun_stack and self.ability.talents.has_w4 == 1 then
		stun = 1
	end

	for _, enemy in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
		if stun == 1 then
			local hit_effect =
				ParticleManager:CreateParticle("particles/abaddon/shield_stun.vpcf", PATTACH_CUSTOMORIGIN, enemy)
			ParticleManager:SetParticleControlEnt(
				hit_effect,
				0,
				enemy,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				enemy:GetAbsOrigin(),
				false
			)
			ParticleManager:SetParticleControlEnt(
				hit_effect,
				1,
				enemy,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				enemy:GetAbsOrigin(),
				false
			)
			ParticleManager:ReleaseParticleIndex(hit_effect)
			enemy:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_stunned",
				{ duration = (1 - enemy:GetStatusResistance()) * self.ability.talents.w4_stun }
			)
		end
		self.damageTable.damage = self.damage
		self.damageTable.victim = enemy
		DoDamage(self.damageTable)

		self.ability:AddBurn(enemy, true)
	end

	self.parent:StopSound("Hero_Abaddon.AphoticShield.Loop")
	self.parent:EmitSound("Hero_Abaddon.AphoticShield.Destroy")
end

function modifier_abaddon_aphotic_shield_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT,
	}
end

function modifier_abaddon_aphotic_shield_custom:GetModifierIncomingDamageConstant(params)
	if IsClient() then
		if params.report_max then
			return self.max_shield
		else
			return self.shield
		end
	end

	local attacker = params.attacker
	local damage = params.damage

	self:PlayEffects2()

	local blocked_damage = math.min(damage, self.shield)
	self.parent:AddShieldInfo({ shield_mod = self, healing = blocked_damage, healing_type = "shield" })

	if not self.parent:HasModifier("modifier_abaddon_aphotic_shield_custom_immune") then
		self.shield = self.shield - blocked_damage
		self:SendBuffRefreshToClients()
	else
		blocked_damage = damage
		self.parent:EmitSound("Abaddon.Shield_immune_damage")
	end

	if
		self.caster:GetQuest() == "Abaddon.Quest_6"
		and not self.caster:QuestCompleted()
		and attacker
		and attacker:IsRealHero()
	then
		self.caster:UpdateQuest(blocked_damage)
	end

	if self.shield <= 0 then
		self:Destroy()
	end

	return -blocked_damage
end

function modifier_abaddon_aphotic_shield_custom:PlayEffects()
	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_abaddon/abaddon_aphotic_shield.vpcf",
		self.ability
	)
	self.effect_cast = ParticleManager:CreateParticle(particle_name, PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(self.size, self.size, self.size))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)
end

function modifier_abaddon_aphotic_shield_custom:PlayEffects2()
	local size = self.size * 0.75
	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_abaddon/abaddon_aphotic_shield_hit.vpcf",
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
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(size, size, size))
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

modifier_abaddon_aphotic_shield_custom_legendary_effect = class(mod_hidden)
function modifier_abaddon_aphotic_shield_custom_legendary_effect:GetStatusEffectName()
	return "particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf"
end
function modifier_abaddon_aphotic_shield_custom_legendary_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_abaddon_aphotic_shield_custom_legendary_effect:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.w7_slow
	if not IsServer() then
		return
	end
	self.pfx = ParticleManager:CreateParticle(
		"particles/abaddon/shield_legendary_target.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.pfx, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		self.pfx,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	self:AddParticle(self.pfx, false, false, -1, false, false)
end

function modifier_abaddon_aphotic_shield_custom_legendary_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_abaddon_aphotic_shield_custom_legendary_effect:GetModifierMoveSpeedBonus_Percentage()
	if not self.caster:HasModifier("modifier_abaddon_aphotic_shield_custom_immune") then
		return
	end
	return self.slow
end

modifier_abaddon_aphotic_shield_custom_blink = class(mod_hidden)
function modifier_abaddon_aphotic_shield_custom_blink:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.point = GetGroundPosition(Vector(params.x, params.y, 0), nil)

	self.parent:RemoveGesture(ACT_DOTA_CAST_ABILITY_4)

	local effect_cast = ParticleManager:CreateParticle("particles/abaddon/shield_blink.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, self.point + Vector(0, 0, 100))
	ParticleManager:SetParticleControl(effect_cast, 1, self.parent:GetAbsOrigin() + Vector(0, 0, 100))
	ParticleManager:SetParticleControl(effect_cast, 2, self.point)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	self.parent:NoDraw(self)
	self.parent:AddNoDraw()
end

function modifier_abaddon_aphotic_shield_custom_blink:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
	}
end

function modifier_abaddon_aphotic_shield_custom_blink:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_4)

	FindClearSpaceForUnit(self.parent, self.point, true)
	self.parent:RemoveNoDraw()
	self.parent:Stop()

	EmitSoundOnLocationWithCaster(self.point, "Abaddon.Shield_blink_end2", self.parent)
end

modifier_abaddon_aphotic_shield_custom_tracker = class(mod_hidden)
function modifier_abaddon_aphotic_shield_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.aphotic_ability = self.ability
	self.parent.aphotic_legendary_ability = self.parent:FindAbilityByName("abaddon_aphotic_shield_custom_legendary")

	if IsValid(self.parent.aphotic_legendary_ability) then
		if IsServer() and not self.parent.aphotic_legendary_ability:IsTrained() then
			self.parent.aphotic_legendary_ability:SetLevel(1)
		end
		self.parent.aphotic_legendary_ability:UpdateTalents()
	end

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.damage_absorb = self.ability:GetSpecialValueFor("damage_absorb")
	self.ability.scepter_radius = self.ability:GetSpecialValueFor("scepter_radius")
	self.ability.scepter_damage = self.ability:GetSpecialValueFor("scepter_damage") / 100
end

function modifier_abaddon_aphotic_shield_custom_tracker:OnRefresh()
	self.ability.damage_absorb = self.ability:GetSpecialValueFor("damage_absorb")
end

function modifier_abaddon_aphotic_shield_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_abaddon_aphotic_shield_custom_tracker:GetModifierPercentageManacostStacking()
	return self.ability.talents.w2_mana
end

function modifier_abaddon_aphotic_shield_custom_tracker:GetModifierMagicalResistanceBonus()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h2_magic
		* (self.parent:HasModifier("modifier_abaddon_aphotic_shield_custom") and self.ability.talents.h2_bonus or 1)
end

function modifier_abaddon_aphotic_shield_custom_tracker:GetModifierPhysicalArmorBonus()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h2_armor
		* (self.parent:HasModifier("modifier_abaddon_aphotic_shield_custom") and self.ability.talents.h2_bonus or 1)
end

modifier_abaddon_aphotic_shield_custom_immune = class(mod_hidden)
function modifier_abaddon_aphotic_shield_custom_immune:GetEffectName()
	return "particles/abaddon/shield_immune.vpcf"
end
function modifier_abaddon_aphotic_shield_custom_immune:GetStatusEffectName()
	return "particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf"
end
function modifier_abaddon_aphotic_shield_custom_immune:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_abaddon_aphotic_shield_custom_immune:OnCreated()
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	local size = 135
	self.legendary_effect = ParticleManager:CreateParticle(
		"particles/abaddon/shield_legendary_immune.vpcf",
		PATTACH_POINT_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControl(self.legendary_effect, 1, Vector(size, size, size))
	self:AddParticle(self.legendary_effect, false, false, -1, false, false)

	self.parent:EmitSound("Abaddon.Shield_immune")
end

function modifier_abaddon_aphotic_shield_custom_immune:OnDestroy()
	if not IsServer() then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_abaddon_aphotic_shield_custom")

	if mod and mod.shield <= 0 then
		mod:Destroy()
	end
end

modifier_abaddon_aphotic_shield_custom_str_stack = class(mod_visible)
function modifier_abaddon_aphotic_shield_custom_str_stack:GetTexture()
	return "buffs/abaddon/aphotic_4"
end
function modifier_abaddon_aphotic_shield_custom_str_stack:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.str = self.ability.talents.w4_str
	self.max = self.ability.talents.w4_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_abaddon_aphotic_shield_custom_str_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self:GetStackCount() >= self.ability.talents.w4_stun_stack and not self.particle then
		self.parent:EmitSound("Abaddon.Shield_buff")
		self.particle =
			ParticleManager:CreateParticle("particles/abaddon/shield_buff.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(self.particle, 1, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(self.particle, 2, self.parent:GetAbsOrigin())
		self:AddParticle(self.particle, false, false, 0, true, false)
	end

	self.parent:CalculateStatBonus(true)
end

function modifier_abaddon_aphotic_shield_custom_str_stack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_abaddon_aphotic_shield_custom_str_stack:GetModifierBonusStats_Strength()
	return self:GetStackCount() * self.str
end

function modifier_abaddon_aphotic_shield_custom_str_stack:GetModifierModelScale()
	return self:GetStackCount() * 2
end

modifier_abaddon_aphotic_shield_custom_legendary_magic = class(mod_visible)
function modifier_abaddon_aphotic_shield_custom_legendary_magic:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.stack = 1 / self.ability.talents.w7_interval
	self.max = self.ability.talents.w7_max
	self.count = 0
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.particle = self.parent:GenericParticle("particles/abaddon/shield_legendary_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_abaddon_aphotic_shield_custom_legendary_magic:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self.count = self.count + 1

	if self.count < self.stack then
		return
	end
	self.count = 0
	self:IncrementStackCount()

	local number_1 = self:GetStackCount()
	local double = math.floor(number_1 / 10)
	local number_2 = number_1 - double * 10

	ParticleManager:SetParticleControl(self.particle, 1, Vector(double, number_1, number_2))
end

function modifier_abaddon_aphotic_shield_custom_legendary_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_abaddon_aphotic_shield_custom_legendary_magic:GetModifierMagicalResistanceBonus()
	return self:GetStackCount() * self.ability.talents.w7_magic
end

modifier_abaddon_aphotic_shield_custom_burn = class(mod_hidden)
function modifier_abaddon_aphotic_shield_custom_burn:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.talents.w3_interval
	self.duration = self.ability.talents.w3_duration
	self.damage = self.ability.talents.w3_damage
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage_type = self.ability.talents.w3_damage_type,
		ability = self.ability,
	}
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.can_lifesteal = self.caster:CanLifesteal(self.parent)
	self.parent:GenericParticle("particles/abaddon/ulti_burn.vpcf", self)

	self:OnRefresh()
	self:StartIntervalThink(self.interval)
end

function modifier_abaddon_aphotic_shield_custom_burn:OnRefresh()
	if not IsServer() then
		return
	end
	self.total_damage = self.total_damage + self.ability.talents.w3_base + self.caster:GetMaxHealth() * self.damage
	self.tick = self.total_damage / self.duration
	self.count = self.duration / self.interval
	self.damageTable.damage = self.tick
end

function modifier_abaddon_aphotic_shield_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable, "modifier_abaddon_aphotic_3")
	self.parent:SendNumber(4, real_damage)

	if self.can_lifesteal then
		self.caster:GenericHeal(
			real_damage * self.can_lifesteal * self.ability.talents.w3_heal,
			self.ability,
			true,
			"particles/items3_fx/octarine_core_lifesteal.vpcf",
			"modifier_abaddon_aphotic_3"
		)
	end

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1

	if self.count <= 0 then
		self:Destroy()
		return
	end
end

abaddon_aphotic_shield_custom_legendary = class({})
abaddon_aphotic_shield_custom_legendary.talents = {}

function abaddon_aphotic_shield_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w7_duration = caster:GetTalentValue("modifier_abaddon_aphotic_7", "duration", true),
		}
	end
end

function abaddon_aphotic_shield_custom_legendary:OnSpellStart()
	if not IsValid(self.caster.aphotic_ability) then
		return
	end
	if not self:IsHidden() then
		self.caster:SwapAbilities(self:GetName(), "abaddon_aphotic_shield_custom", false, true)
	end
	self.caster:AddNewModifier(
		self.caster,
		self.caster.aphotic_ability,
		"modifier_abaddon_aphotic_shield_custom_immune",
		{ duration = self.talents.w7_duration }
	)
end