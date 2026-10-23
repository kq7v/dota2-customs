--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_enigma_black_hole_custom",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_tracker",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_debuff",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_delay",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_legendary",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_legendary_stack",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_enigma_blackhole_7"
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_legendary_debuff",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_legendary_active",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_legendary_damage",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_enigma_blackhole_7" }
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_stack",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_enigma_blackhole_3"
)
LinkLuaModifier(
	"modifier_enigma_black_hole_custom_spell_active",
	"abilities/enigma/enigma_black_hole_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_aegis",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)

enigma_black_hole_custom = class({})
enigma_black_hole_custom.talents = {}
enigma_black_hole_custom.mods = {
	"modifier_tormentor_custom",
	"modifier_bane_nightmare_custom_legendary",
}

function enigma_black_hole_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_enigma/enigma_blackhole.vpcf", context)
	PrecacheResource("particle", "particles/enigma/blackhole_delay.vpcf", context)
	PrecacheResource("particle", "particles/enigma/black_hole_legendary.vpcf", context)
	PrecacheResource("particle", "particles/enigma/black_hole_legendaryf.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_enigma/enigma_gravity_effect.vpcf", context)
	PrecacheResource("particle", "particles/enigma/blackhole_mini.vpcf", context)
	PrecacheResource("particle", "particles/enigma/black_hole_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/enigma/black_hole_blink_end.vpcf", context)
	PrecacheResource("particle", "particles/enigma/blackhole_delay_legendary.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/enigma/enigma_world_chasm/enigma_blackhole_target_ti5.vpcf",
		context
	)
	PrecacheResource("particle", "particles/items4_fx/nullifier_mute.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/nullifier_mute_debuff.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_void_spirit/astral_step/void_spirit_astral_step_dmg.vpcf",
		context
	)
	PrecacheResource("particle", "particles/enigma/malefice_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/enigma/eidolon_legendary_effect.vpcf", context)
	PrecacheResource("particle", "particles/enigma/midnight_status.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_spell_damage.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_heal.vpcf", context)
end

function enigma_black_hole_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r1_damage = 0,

			r2_cd = 0,
			r2_cast = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_duration = 0,
			r3_stack_duration = caster:GetTalentValue("modifier_enigma_blackhole_3", "stack_duration", true),
			r3_max = caster:GetTalentValue("modifier_enigma_blackhole_3", "max", true),
			r3_radius = caster:GetTalentValue("modifier_enigma_blackhole_3", "radius", true),

			has_r4 = 0,
			r4_heal = caster:GetTalentValue("modifier_enigma_blackhole_4", "heal", true) / 100,
			r4_range = caster:GetTalentValue("modifier_enigma_blackhole_4", "range", true),
			r4_cd_items = caster:GetTalentValue("modifier_enigma_blackhole_4", "cd_items", true),
			r4_cd_items_legendary = caster:GetTalentValue("modifier_enigma_blackhole_4", "cd_items_legendary", true),

			has_r7 = 0,
			r7_radius = caster:GetTalentValue("modifier_enigma_blackhole_7", "radius", true),
			r7_stun = caster:GetTalentValue("modifier_enigma_blackhole_7", "stun", true),
			r7_damage_inc = caster:GetTalentValue("modifier_enigma_blackhole_7", "damage_inc", true),
			r7_damage = caster:GetTalentValue("modifier_enigma_blackhole_7", "damage", true) / 100,
			r7_stack_duration = caster:GetTalentValue("modifier_enigma_blackhole_7", "stack_duration", true),
			r7_active_cd = caster:GetTalentValue("modifier_enigma_blackhole_7", "active_cd", true),
			r7_max = caster:GetTalentValue("modifier_enigma_blackhole_7", "max", true),
			r7_damage_k = caster:GetTalentValue("modifier_enigma_blackhole_7", "damage_k", true),
			r7_linger = caster:GetTalentValue("modifier_enigma_blackhole_7", "linger", true),
		}
	end

	if caster:HasTalent("modifier_enigma_blackhole_1") then
		self.talents.r1_damage = caster:GetTalentValue("modifier_enigma_blackhole_1", "damage") / 100
	end

	if caster:HasTalent("modifier_enigma_blackhole_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_enigma_blackhole_2", "cd")
		self.talents.r2_cast = caster:GetTalentValue("modifier_enigma_blackhole_2", "cast")
	end

	if caster:HasTalent("modifier_enigma_blackhole_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_enigma_blackhole_3", "damage")
		self.talents.r3_duration = caster:GetTalentValue("modifier_enigma_blackhole_3", "duration")
		if IsServer() then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_enigma_blackhole_4") then
		self.talents.has_r4 = 1
		caster:AddLifesteal(self.tracker, {
			name = "modifier_enigma_blackhole_4",
			type = 1,
			effect = "particles/enigma/summon_heal.vpcf",
			value = function(params)
				if not params.unit then
					return 0
				end
				return params.unit:HasModifier("modifier_enigma_black_hole_custom_debuff") and self.talents.r4_heal or 0
			end,
		})
	end

	if caster:HasTalent("modifier_enigma_blackhole_7") then
		self.talents.has_r7 = 1
	end
end

function enigma_black_hole_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "enigma_black_hole", self)
end

function enigma_black_hole_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_enigma_black_hole_custom_tracker"
end

function enigma_black_hole_custom:GetAOERadius()
	return self.radius or 0
end

function enigma_black_hole_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.r2_cd or 0)
end

function enigma_black_hole_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
		+ (self.talents.has_r4 == 1 and self.talents.r4_range or 0)
end

function enigma_black_hole_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self)
end

function enigma_black_hole_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	local delay = self.delay + self.talents.r2_cast

	if self.talents.has_r7 == 1 and IsValid(self.caster.legendary_ability) then
		self.caster.legendary_ability:EndCd(0)
		self.caster.legendary_ability:StartCooldown(self.talents.r7_active_cd)
	end

	self.caster:EmitSound("Enigma.Blackhole_delay_voice")
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_enigma_black_hole_custom_delay",
		{ duration = delay },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function enigma_black_hole_custom:InvalidMods(target)
	for _, mod in pairs(self.mods) do
		if target:HasModifier(mod) then
			return true
		end
	end
	return false
end

function enigma_black_hole_custom:GetDamage()
	return self.damage + self.talents.r1_damage * self.caster:GetIntellect(false)
end

function enigma_black_hole_custom:GetStunDuration()
	if not IsServer() then
		return
	end
	local result = self.duration
	local mod = self.caster:FindModifierByName("modifier_enigma_black_hole_custom_stack")
	if mod and mod:GetStackCount() >= self.talents.r3_max then
		result = result + self.talents.r3_duration
	end
	return result
end

modifier_enigma_black_hole_custom_tracker = class(mod_hidden)
function modifier_enigma_black_hole_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.legendary_ability = self.parent:FindAbilityByName("enigma_black_hole_custom_legendary")
	if self.parent.legendary_ability then
		self.parent.legendary_ability:UpdateTalents()
	end

	self.parent.blackhole_ability = self.ability

	self.ability.scepter_health = self.ability:GetSpecialValueFor("scepter_health")
	self.ability.delay = self.ability:GetSpecialValueFor("delay")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.pull_speed = self.ability:GetSpecialValueFor("pull_speed")
	self.ability.ticks = self.ability:GetSpecialValueFor("ticks")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.animation_rate = self.ability:GetSpecialValueFor("animation_rate")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_enigma_black_hole_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_enigma_black_hole_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r3 == 0 then
		return
	end

	local max = self.ability.talents.r3_max
	local stack = 0
	local active = 0

	local mod = self.parent:FindModifierByName("modifier_enigma_black_hole_custom_stack")
	if mod then
		stack = mod:GetStackCount()
		active = mod:GetStackCount() >= max and 1 or 0
	end

	self.parent:UpdateUIlong({ max = max, stack = stack, active = active, priority = 1, style = "EnigmaBlack" })
end

modifier_enigma_black_hole_custom_delay = class(mod_hidden)
function modifier_enigma_black_hole_custom_delay:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.duration = self.ability:GetStunDuration()
	self.radius = self.ability.radius

	if not IsServer() then
		return
	end
	self.auto = 0

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Enigma.Blackhole_delay", self.caster)

	self.effect_cast =
		ParticleManager:CreateParticle("particles/enigma/blackhole_delay.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(
		self.effect_cast,
		1,
		Vector(self.radius, 0, -self.radius / self:GetRemainingTime())
	)
	ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(self:GetRemainingTime(), 0, 0))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)
end

function modifier_enigma_black_hole_custom_delay:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.caster or self.caster:IsNull() then
		return
	end
	CreateModifierThinker(
		self.caster,
		self.ability,
		"modifier_enigma_black_hole_custom",
		{ duration = self.duration, auto = self.auto },
		self.parent:GetAbsOrigin(),
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_enigma_black_hole_custom = class(mod_hidden)
function modifier_enigma_black_hole_custom:IsAura()
	return true
end
function modifier_enigma_black_hole_custom:GetAuraDuration()
	return 0
end
function modifier_enigma_black_hole_custom:GetAuraRadius()
	return self.radius
end
function modifier_enigma_black_hole_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_enigma_black_hole_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_enigma_black_hole_custom:GetModifierAura()
	return "modifier_enigma_black_hole_custom_debuff"
end
function modifier_enigma_black_hole_custom:OnCreated(table)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.radius
	if not IsServer() then
		return
	end

	self.auto = 0

	local name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_enigma/enigma_blackhole.vpcf",
		self
	)
	self.modifier_enigma_immortal_chasm = name
		== "particles/econ/items/enigma/enigma_world_chasm/enigma_blackhole_ti5.vpcf"

	local radius = self.radius
	self.sound = "Hero_Enigma.Black_Hole"
	self.stop_sound = "Hero_Enigma.Black_Hole.Stop"

	if table.auto and table.auto == 1 then
		self.auto = 1
		self.sound = "Enigma.Blackhole_loop_mini"
		self.stop_sound = "Enigma.Blackhole_stop_mini"
		self.radius = self.ability.talents.r7_radius
		name = "particles/enigma/blackhole_mini.vpcf"
		radius = self.radius * 0.8
	elseif self.modifier_enigma_immortal_chasm then
		self.parent:EmitSound("Hero_Enigma.BlackHole.Cast.Chasm")
	end

	self.parent:EmitSound(self.sound)

	self.effect_cast = ParticleManager:CreateParticle(name, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent:GetOrigin() + Vector(0, 0, 70))
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(radius, 0, 0))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)
end

function modifier_enigma_black_hole_custom:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent or self.parent:IsNull() then
		return
	end
	self.parent:StopSound(self.sound)
	self.parent:EmitSound(self.stop_sound)

	if self.modifier_enigma_immortal_chasm then
		self.parent:StopSound("Hero_Enigma.BlackHole.Cast")
	end
end

function modifier_enigma_black_hole_custom:RegisterHit(target)
	if not IsServer() then
		return
	end
	if self.hit then
		return
	end

	self.hit = true

	if self.ability.talents.has_r4 == 0 then
		return
	end
	local cd_items = self.ability.talents.has_r7 == 1 and self.ability.talents.r4_cd_items_legendary
		or self.ability.talents.r4_cd_items
	self.caster:CdItems(cd_items, "modifier_enigma_blackhole_4")
end

modifier_enigma_black_hole_custom_debuff = class(mod_visible)
function modifier_enigma_black_hole_custom_debuff:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_enigma_black_hole_custom_debuff:GetStatusEffectName()
	return wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/status_fx/status_effect_enigma_blackhole_tgt.vpcf",
		self
	)
end
function modifier_enigma_black_hole_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_enigma_black_hole_custom_debuff:IsAura()
	return self.parent:IsRealHero() and self.ability.talents.has_r3 == 1
end
function modifier_enigma_black_hole_custom_debuff:GetAuraDuration()
	return 0
end
function modifier_enigma_black_hole_custom_debuff:GetAuraRadius()
	return self.ability.talents.r3_radius
end
function modifier_enigma_black_hole_custom_debuff:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_enigma_black_hole_custom_debuff:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_enigma_black_hole_custom_debuff:GetModifierAura()
	return "modifier_enigma_black_hole_custom_spell_active"
end
function modifier_enigma_black_hole_custom_debuff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.aura_owner = self:GetAuraOwner()

	self.animation_rate = self.ability.animation_rate
	self.ticks = self.ability.ticks
	self.max_duration = self.ability:GetStunDuration()

	self.interval = 0.05
	self.damage_count = 0
	self.auto = 0
	self.damage_k = 1

	self.pull_speed = self.ability.pull_speed * self.interval

	if not IsServer() then
		return
	end
	self.damage_ability = nil

	self.center = self.parent:GetAbsOrigin()

	if IsValid(self.aura_owner) then
		self.center = self.aura_owner:GetAbsOrigin()

		local mod = self.aura_owner:FindModifierByName("modifier_enigma_black_hole_custom")
		if mod then
			if mod.auto and mod.auto == 1 then
				self.ticks = 2
				self.auto = 1
				self.damage_k = self.ability.talents.r7_damage
				self.max_duration = self.ability.talents.r7_stun
				self.damage_ability = "modifier_enigma_blackhole_7"
			else
				self.chasm = mod.modifier_enigma_immortal_chasm
			end
			mod:RegisterHit(self.parent)
		end
	end

	if self.chasm then
		self.center_fx = ParticleManager:CreateParticle(
			"particles/econ/items/enigma/enigma_world_chasm/enigma_blackhole_target_ti5.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(self.center_fx, 2, self.center)
		self:AddParticle(self.center_fx, false, false, -1, false, false)
	end

	if self.auto == 0 then
		local mod = self.parent:FindModifierByName("modifier_enigma_black_hole_custom_legendary_stack")
		if mod then
			self.parent:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_enigma_black_hole_custom_legendary_damage",
				{ duration = self.max_duration + self.ability.talents.r7_linger, stack = mod:GetStackCount() }
			)
			mod:Destroy()
		end

		if self.caster:HasScepter() then
			self.parent:GenericParticle("particles/items4_fx/nullifier_mute.vpcf", self, true)
			self.parent:GenericParticle("particles/items4_fx/nullifier_mute_debuff.vpcf", self)
			if self.parent:IsRealHero() then
				self.parent:EmitSound("Enigma.Blackhole_purge")
			end
			self.parent:AddNewModifier(self.parent, nil, "modifier_death", {})
			self.parent:AddNewModifier(self.parent, nil, "modifier_axe_culling_blade_custom_aegis", {})
		end
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.center, self.ability.radius, self.max_duration + 1, false)

	self.damage_interval = self.max_duration / self.ticks

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_FLAIL, self.animation_rate)
	self:StartIntervalThink(self.interval)
end

function modifier_enigma_black_hole_custom_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.parent:IsRealHero() and self.caster:GetQuest() == "Enigma.Quest_8" and not self.caster:QuestCompleted() then
		self.caster:UpdateQuest(self.interval)
	end

	if self.caster:HasScepter() and self.auto == 0 then
		self.parent:Purge(true, false, false, false, false)
		if
			self.parent:GetHealthPercent() <= self.ability.scepter_health and not self.ability:InvalidMods(self.parent)
		then
			self.parent:GenericParticle(
				"particles/units/heroes/hero_void_spirit/astral_step/void_spirit_astral_step_dmg.vpcf"
			)
			self.parent:EmitSound("Enigma.Blackhole_kill")
			self.parent:SendNumber(6, self.parent:GetHealth())
			self.parent:Kill(self.ability, self.caster)
		end
	end

	self.damage_count = self.damage_count + self.interval
	if self.damage_count >= self.damage_interval - 0.05 then
		self.damage_count = 0

		self.damage = (self.ability:GetDamage(self.parent, self.auto) * self.damage_k * self.max_duration) / self.ticks
		self.damageTable.damage = self.damage

		DoDamage(self.damageTable, self.damage_ability)
	end

	local vec = self.center - self.parent:GetAbsOrigin()

	local angle = self.parent:GetAngles()
	local new_angle = RotateOrientation(angle, QAngle(0, 1.5, 0))

	self.parent:SetAngles(new_angle[1], new_angle[2], new_angle[3])

	if vec:Length2D() <= 10 then
		return
	end

	self.parent:SetAbsOrigin(self.parent:GetAbsOrigin() + self.pull_speed * vec:Normalized())
end

function modifier_enigma_black_hole_custom_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	if self.auto == 0 then
		self.parent:RemoveModifierByName("modifier_death")
		self.parent:RemoveModifierByName("modifier_axe_culling_blade_custom_aegis")
	end

	if self.auto == 1 then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_enigma_black_hole_custom_legendary_stack",
			{ duration = self.ability.talents.r7_stack_duration }
		)
	end

	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), false)
	self.parent:FadeGesture(ACT_DOTA_FLAIL)
end

function modifier_enigma_black_hole_custom_debuff:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED] = true,
	}
end

function modifier_enigma_black_hole_custom_debuff:GetAuraEntityReject(hEntity)
	return self.caster ~= hEntity
end

modifier_enigma_black_hole_custom_legendary_stack = class(mod_visible)
function modifier_enigma_black_hole_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.r7_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.effect = self.parent:GenericParticle("particles/enigma/malefice_legendary_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_enigma_black_hole_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if not self.effect then
		return
	end
	ParticleManager:SetParticleControl(self.effect, 1, Vector(0, self:GetStackCount(), 0))
end

modifier_enigma_black_hole_custom_legendary_damage = class(mod_visible)
function modifier_enigma_black_hole_custom_legendary_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self.max_duration = self:GetRemainingTime()
	self.damage = self.ability.talents.r7_damage_inc
		* math.pow(table.stack / self.ability.talents.r7_max, self.ability.talents.r7_damage_k)
	self.parent:GenericParticle("particles/enigma/summon_spell_damage.vpcf", self, true)
	self.parent:EmitSound("Enigma.Blackhole_legendary_damage")

	if self.parent:IsRealHero() and not IsValid(self.ability.legendary_mod) then
		self.ability.legendary_mod = self
		self:OnIntervalThink()
		self:StartIntervalThink(0.1)
	end
end

function modifier_enigma_black_hole_custom_legendary_damage:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.caster:UpdateUIshort({
		max_time = self.max_duration,
		time = self:GetRemainingTime(),
		stack = "+" .. math.floor(self.damage) .. "%",
		priority = 2,
		style = "EnigmaLegendaryStack",
	})
end

function modifier_enigma_black_hole_custom_legendary_damage:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.ability.legendary_mod or self.ability.legendary_mod ~= self then
		return
	end
	self.ability.legendary_mod = nil
	self.caster:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "EnigmaLegendaryStack" })
end

function modifier_enigma_black_hole_custom_legendary_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_enigma_black_hole_custom_legendary_damage:GetModifierIncomingDamage_Percentage(params)
	if IsServer() and (not params.attacker or params.attacker:FindOwner() ~= self.caster) then
		return
	end
	if not params.inflictor then
		return
	end
	return self.damage
end

modifier_enigma_black_hole_custom_stack = class(mod_hidden)
function modifier_enigma_black_hole_custom_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.damage = self.ability.talents.r3_damage
	self.model = 20

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.count = 0
	self.duration = self.ability.talents.r3_stack_duration
	self.radius = self.ability.talents.r3_radius / 2

	self:OnRefresh(table)
	self:StartIntervalThink(0.5)
end

function modifier_enigma_black_hole_custom_stack:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self.count = self.count + table.interval
	if self.count < 1 then
		return
	end

	self.count = 0
	self:IncrementStackCount()

	if IsValid(self.ability.tracker) then
		self.ability.tracker:UpdateUI()
	end

	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/enigma/eidolon_legendary_effect.vpcf", self)
	self.parent:GenericParticle("particles/enigma/midnight_status.vpcf", self)
	self.parent:EmitSound("Enigma.Blackhole_stack_max")
end

function modifier_enigma_black_hole_custom_stack:OnIntervalThink()
	if not IsServer() then
		return
	end
	local targets = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)

	if #targets > 0 then
		self:SetDuration(self.duration, true)
	end
end

function modifier_enigma_black_hole_custom_stack:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.ability.tracker) then
		self.ability.tracker:UpdateUI()
	end
end

function modifier_enigma_black_hole_custom_stack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_enigma_black_hole_custom_stack:GetModifierSpellAmplify_Percentage()
	return self.damage * self:GetStackCount()
end

function modifier_enigma_black_hole_custom_stack:GetModifierModelScale()
	if self:GetStackCount() < self.max then
		return
	end
	return self.model
end

modifier_enigma_black_hole_custom_spell_active = class(mod_hidden)
function modifier_enigma_black_hole_custom_spell_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self.parent.blackhole_ability

	if not IsServer() then
		return
	end
	if not IsValid(self.ability) or not self.ability:IsTrained() then
		return
	end
	self.interval = 0.1
	self:StartIntervalThink(0.1)
end

function modifier_enigma_black_hole_custom_spell_active:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_enigma_black_hole_custom_stack",
		{ interval = self.interval, duration = self.ability.talents.r3_stack_duration }
	)
end

enigma_black_hole_custom_legendary = class({})
enigma_black_hole_custom_legendary.talents = {}

function enigma_black_hole_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

function enigma_black_hole_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_range = caster:GetTalentValue("modifier_enigma_blackhole_7", "range", true),
			r7_radius = caster:GetTalentValue("modifier_enigma_blackhole_7", "radius", true),
			r7_speed = caster:GetTalentValue("modifier_enigma_blackhole_7", "speed", true),
			r7_stun = caster:GetTalentValue("modifier_enigma_blackhole_7", "stun", true),
			r7_slow_duration = caster:GetTalentValue("modifier_enigma_blackhole_7", "slow_duration", true),
			r7_slow_move = caster:GetTalentValue("modifier_enigma_blackhole_7", "slow_move", true),
			r7_talent_cd = caster:GetTalentValue("modifier_enigma_blackhole_7", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_enigma_blackhole_7") then
		if IsServer() and not self:IsTrained() then
			self:SetLevel(1)
		end
	end
end

function enigma_black_hole_custom_legendary:GetManaCost(level)
	if self.caster:HasModifier("modifier_enigma_black_hole_custom_legendary_active") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function enigma_black_hole_custom_legendary:GetBehavior()
	if self.caster:HasModifier("modifier_enigma_black_hole_custom_legendary_active") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
			+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
end

function enigma_black_hole_custom_legendary:GetCooldown(level)
	return (self.talents.r7_talent_cd or 0) / self.caster:GetCooldownReduction()
end

function enigma_black_hole_custom_legendary:GetAOERadius()
	return self.talents.r7_radius or 0
end

function enigma_black_hole_custom_legendary:GetCastRange()
	return IsClient() and (self.talents.r7_range or 0) or 999999
end

function enigma_black_hole_custom_legendary:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_enigma_black_hole_custom_legendary_active")
	if mod then
		if IsValid(mod.thinker) then
			mod.thinker:RemoveModifierByName("modifier_enigma_black_hole_custom_legendary")
		end
		return
	end

	local start = self.caster:GetAbsOrigin()
	local point = self:GetCursorPosition()
	if start == point then
		point = start + self.caster:GetForwardVector() * 10
	end

	local distance = self.talents.r7_range + self.caster:GetCastRangeBonus()

	local orb_thinker =
		CreateUnitByName("npc_dummy_unit", start, false, self.caster, self.caster, self.caster:GetTeamNumber())
	orb_thinker:AddNewModifier(
		self.caster,
		self,
		"modifier_enigma_black_hole_custom_legendary",
		{ distance = distance }
	)

	local projectile_info = {
		Source = self.caster,
		Ability = self,
		vSpawnOrigin = start,
		bDeleteOnHit = false,
		iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
		iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		EffectName = "",
		fDistance = distance,
		fStartRadius = self.talents.r7_radius / 2,
		fEndRadius = self.talents.r7_radius / 2,
		vVelocity = (point - start):Normalized() * self.talents.r7_speed,
		bReplaceExisting = false,
		bProvidesVision = true,
		iVisionRadius = self.talents.r7_radius,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		ExtraData = {
			orb_thinker = orb_thinker:entindex(),
		},
	}

	ProjectileManager:CreateLinearProjectile(projectile_info)
end

function enigma_black_hole_custom_legendary:OnProjectileThink_ExtraData(location, data)
	if not IsServer() then
		return
	end

	local thinker = EntIndexToHScript(data.orb_thinker)
	if not IsValid(thinker) then
		return
	end
	local pos = GetGroundPosition(location, nil) + Vector(0, 0, 100)

	thinker:SetAbsOrigin(pos)
end

function enigma_black_hole_custom_legendary:OnProjectileHit_ExtraData(target, vLocation, data)
	local thinker = EntIndexToHScript(data.orb_thinker)
	if not IsValid(thinker) then
		return
	end

	if target then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_enigma_black_hole_custom_legendary_debuff",
			{ duration = self.talents.r7_slow_duration }
		)
		return
	end
	thinker:RemoveModifierByName("modifier_enigma_black_hole_custom_legendary")
end

modifier_enigma_black_hole_custom_legendary = class(mod_hidden)
function modifier_enigma_black_hole_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_enigma_black_hole_custom_legendary_active",
		{ thinker = self.parent:entindex() }
	)

	self.effect_cast = ParticleManager:CreateParticle(
		"particles/enigma/black_hole_legendary.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent:GetOrigin())
	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	self.radius = self.ability.talents.r7_radius
	self.distance = table.distance
	self.speed = self.ability.talents.r7_speed

	self.effect_cast2 = ParticleManager:CreateParticle(
		"particles/enigma/blackhole_delay_legendary.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.effect_cast2, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(
		self.effect_cast2,
		1,
		Vector(self.radius, 0, -self.radius / (self.distance / self.speed))
	)
	ParticleManager:SetParticleControl(self.effect_cast2, 2, Vector((self.distance / self.speed), 0, 0))
	self:AddParticle(self.effect_cast2, true, false, -1, false, false)

	self.parent:EmitSound("Enigma.Blackhole_legendary_hit")
	self.parent:EmitSound("Enigma.Blackhole_legendary_loop")
end

function modifier_enigma_black_hole_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Enigma.Blackhole_legendary_loop")

	if IsValid(self.caster.blackhole_ability) then
		local point = GetGroundPosition(self.parent:GetAbsOrigin(), nil)

		local effect_cast = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(effect_cast, 0, point)
		ParticleManager:ReleaseParticleIndex(effect_cast)
		CreateModifierThinker(
			self.caster,
			self.caster.blackhole_ability,
			"modifier_enigma_black_hole_custom",
			{ duration = self.ability.talents.r7_stun, auto = 1 },
			point,
			self.caster:GetTeamNumber(),
			false
		)
	end

	self.caster:RemoveModifierByName("modifier_enigma_black_hole_custom_legendary_active")
	UTIL_Remove(self.parent)
end

function modifier_enigma_black_hole_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

modifier_enigma_black_hole_custom_legendary_active = class(mod_hidden)
function modifier_enigma_black_hole_custom_legendary_active:RemoveOnDeath()
	return false
end
function modifier_enigma_black_hole_custom_legendary_active:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.thinker = EntIndexToHScript(table.thinker)
	self.ability:EndCd(0)
end

function modifier_enigma_black_hole_custom_legendary_active:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:EndCd(self.ability.talents.r7_talent_cd)
end

modifier_enigma_black_hole_custom_legendary_debuff = class(mod_hidden)
function modifier_enigma_black_hole_custom_legendary_debuff:IsPurgable()
	return true
end
function modifier_enigma_black_hole_custom_legendary_debuff:GetStatusEffectName()
	return "particles/status_fx/status_effect_enigma_blackhole_tgt.vpcf"
end
function modifier_enigma_black_hole_custom_legendary_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_enigma_black_hole_custom_legendary_debuff:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.r7_slow_move

	if not IsServer() then
		return
	end

	self.particle = ParticleManager:CreateParticle(
		"particles/enigma/black_hole_legendaryf.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.parent:EmitSound("Enigma.Blackhole_legendary_hit_creeps")
end

function modifier_enigma_black_hole_custom_legendary_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_enigma_black_hole_custom_legendary_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end