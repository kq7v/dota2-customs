--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_pangolier_shield_crash_custom_tracker",
	"abilities/pangolier/pangolier_shield_crash_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_shield_crash_custom_slow",
	"abilities/pangolier/pangolier_shield_crash_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_shield_crash_custom_magic",
	"abilities/pangolier/pangolier_shield_crash_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_shield_3"
)
LinkLuaModifier(
	"modifier_pangolier_shield_crash_custom_legendary",
	"abilities/pangolier/pangolier_shield_crash_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_shield_7"
)
LinkLuaModifier(
	"modifier_pangolier_shield_crash_custom_burn",
	"abilities/pangolier/pangolier_shield_crash_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_shield_crash_custom_health",
	"abilities/pangolier/pangolier_shield_crash_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_shield_4"
)

pangolier_shield_crash_custom = class({})
pangolier_shield_crash_custom.talents = {}

function pangolier_shield_crash_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_hero.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_false_promise_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_egg.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_streaks.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_parry.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_snapfire_slow.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_overwhelming_burst.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_swashbuckler.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_lowhp.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/shield_delay.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/shield_legendary.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/buckle_refresh.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/rolling_stack.vpcf", context)
end

function pangolier_shield_crash_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_burn = 0,
			w1_damage = 0,
			w1_duration = caster:GetTalentValue("modifier_pangolier_shield_1", "duration", true),

			has_w2 = 0,
			w2_cd = 0,
			w2_radius = 0,

			has_w3 = 0,
			w3_magic = 0,
			w3_heal = 0,
			w3_max = caster:GetTalentValue("modifier_pangolier_shield_3", "max", true),
			w3_duration = caster:GetTalentValue("modifier_pangolier_shield_3", "duration", true),

			has_w4 = 0,
			w4_health = caster:GetTalentValue("modifier_pangolier_shield_4", "health", true),
			w4_spell = caster:GetTalentValue("modifier_pangolier_shield_4", "spell", true),

			has_w7 = 0,
			w7_max = caster:GetTalentValue("modifier_pangolier_shield_7", "max", true),
			w7_cd_inc = caster:GetTalentValue("modifier_pangolier_shield_7", "cd_inc", true) / 100,
			w7_radius = caster:GetTalentValue("modifier_pangolier_shield_7", "radius", true),
			w7_duration = caster:GetTalentValue("modifier_pangolier_shield_7", "duration", true),
			w7_damage = caster:GetTalentValue("modifier_pangolier_shield_7", "damage", true) / 100,
			w7_cd = caster:GetTalentValue("modifier_pangolier_shield_7", "cd", true),
			w7_damage_max = caster:GetTalentValue("modifier_pangolier_shield_7", "damage_max", true) / 100,

			has_h1 = 0,
			h1_shield = 0,
			h1_stats = 0,

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_pangolier_shield_1") then
		self.talents.has_w1 = 1
		self.talents.w1_burn = caster:GetTalentValue("modifier_pangolier_shield_1", "burn") / 100
		self.talents.w1_damage = caster:GetTalentValue("modifier_pangolier_shield_1", "damage") / 100
	end

	if caster:HasTalent("modifier_pangolier_shield_2") then
		self.talents.has_w2 = 1
		self.talents.w2_cd = caster:GetTalentValue("modifier_pangolier_shield_2", "cd")
		self.talents.w2_radius = caster:GetTalentValue("modifier_pangolier_shield_2", "radius") / 100
	end

	if caster:HasTalent("modifier_pangolier_shield_3") then
		self.talents.has_w3 = 1
		self.talents.w3_magic = caster:GetTalentValue("modifier_pangolier_shield_3", "magic")
		self.talents.w3_heal = caster:GetTalentValue("modifier_pangolier_shield_3", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_pangolier_shield_3", type = 1, value = self.talents.w3_heal }
		)
	end

	if caster:HasTalent("modifier_pangolier_shield_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_pangolier_shield_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_pangolier_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_shield = caster:GetTalentValue("modifier_pangolier_hero_1", "shield") / 100
		self.talents.h1_stats = caster:GetTalentValue("modifier_pangolier_hero_1", "stats")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_pangolier_rolling_7") then
		self.talents.has_r7 = 1
	end
end

function pangolier_shield_crash_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_pangolier_shield_crash_custom_tracker"
end

function pangolier_shield_crash_custom:GetAbilityTextureName()
	if
		self.talents.has_w7 == 1
		and self.caster:GetUpgradeStack("modifier_pangolier_shield_crash_custom_legendary")
			>= (self.talents.w7_max - 1)
	then
		return "shield_crash_damage"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "pangolier_shield_crash", self)
end

function pangolier_shield_crash_custom:GetCooldown(iLevel)
	if self.caster:HasModifier("modifier_pangolier_shield_crash_custom_legendary") then
		return self.talents.w7_cd
	end
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)
end

function pangolier_shield_crash_custom:GetBehavior()
	if self.caster:HasScepter() then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
end

function pangolier_shield_crash_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_pangolier_shield_crash_custom_legendary") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function pangolier_shield_crash_custom:GetDamage()
	return self.damage + self.caster:GetMaxHealth() * self.talents.w1_damage
end

function pangolier_shield_crash_custom:GetRadius()
	local radius = self.radius
	if
		self.caster:HasModifier("modifier_pangolier_shield_crash_custom_legendary")
		and self.caster:GetUpgradeStack("modifier_pangolier_shield_crash_custom_legendary")
			< (self.talents.w7_max - 1)
	then
		radius = self.talents.w7_radius
	end
	return (radius or 0) * (1 + (self.talents.w2_radius or 0))
end

function pangolier_shield_crash_custom:GetRange()
	return (self.jump_horizontal_distance or 0) + (self.caster:HasScepter() and self.scepter_range or 0)
end

function pangolier_shield_crash_custom:GetAOERadius()
	return self:GetRadius()
end

function pangolier_shield_crash_custom:GetCastRange(vLocation, hTarget)
	return IsServer() and 99999 or (self:GetRange() - self.caster:GetCastRangeBonus())
end

function pangolier_shield_crash_custom:OnSpellStart(is_legendary)
	local distance = self:GetRange()
	local radius = self:GetRadius()

	local duration = self.jump_duration
	local height = self.jump_height
	local buff_duration = self.duration
	local legendary_mod = self.caster:FindModifierByName("modifier_pangolier_shield_crash_custom_legendary")

	if IsValid(self.parent.roll_crash_mod) then
		self.parent.roll_crash_mod:Destroy()
	end

	if self.caster:HasScepter() then
		local point = self.caster:CastPosition(self:GetCursorPosition())

		local dir = point - self.caster:GetAbsOrigin()

		if dir:Length2D() > distance then
			point = self.caster:GetAbsOrigin() + dir:Normalized() * distance
		end

		dir.z = 0

		self.caster:FacePoint(self.caster:GetAbsOrigin() + dir:Normalized() * 10)
		distance = (point - self.caster:GetAbsOrigin()):Length2D()
	end

	self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_2)
	self.caster:EmitSound("Hero_Pangolier.TailThump.Cast")

	local ulti_mod = self.caster:FindModifierByName("modifier_pangolier_gyroshell_custom")
	if ulti_mod then
		duration = self.jump_duration_gyroshell
		height = self.jump_height_gyroshell
		distance = ulti_mod.max_speed * duration
	end

	if self.caster:HasModifier("modifier_pangolier_rollup_custom") then
		duration = self.jump_duration_gyroshell
		height = self.jump_height_gyroshell
		distance = 1
		self.caster:StartGesture(ACT_DOTA_RUN)
	end

	if self.caster:IsRooted() or self.caster:IsStunned() or self.caster:IsLeashed() then
		distance = 1
		height = height * 0.7
	end

	local speed = math.max(1, distance / duration)
	local point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * distance

	local arc = self.caster:AddNewModifier(self.caster, self, "modifier_generic_arc", {
		target_x = point.x,
		target_y = point.y,
		distance = distance,
		speed = speed,
		height = height,
		fix_end = false,
		isStun = true,
	})

	self.caster.shield_jump = arc

	if not arc then
		return
	end

	local generic_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_cast.vpcf",
		self
	)
	self.caster:GenericParticle(generic_pfx, arc)

	if
		self.caster:HasScepter()
		and not legendary_mod
		and self.talents.has_w7 == 0
		and self.talents.has_r7 == 0
		and IsValid(self.caster.swash_ability)
	then
		self.caster:AddNewModifier(
			self.caster,
			self.caster.swash_ability,
			"modifier_pangolier_swashbuckle_custom_scepter",
			{ strikes = self.scepter_attacks }
		)
	end

	local damageTable = { attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL }
	local legendary_max = false
	local particle = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_hero.vpcf",
		self
	)

	if legendary_mod then
		legendary_max = legendary_mod:GetStackCount() >= (self.talents.w7_max - 1)
		if not legendary_max then
			particle = "particles/pangolier/shield_legendary.vpcf"
		end

		local effect_cast =
			ParticleManager:CreateParticle("particles/pangolier/shield_delay.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect_cast, 0, point)
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(radius, 0, -radius / duration))
		ParticleManager:SetParticleControl(effect_cast, 2, Vector(duration, 0, 0))
		arc:AddParticle(effect_cast, false, false, -1, false, false)
	end

	arc:SetEndCallback(function()
		if not self.caster:HasModifier("modifier_pangolier_gyroshell_custom") then
			self.caster:FadeGesture(ACT_DOTA_RUN)
		elseif IsValid(self.caster.rolling_ability) then
			self.caster:AddNewModifier(
				self.caster,
				self.caster.rolling_ability,
				"modifier_pangolier_gyroshell_custom_turn_boost",
				{ duration = self.caster.rolling_ability.jump_recover_time }
			)
		end

		if not legendary_mod then
			self:AddShield()
		end

		local enemies = self.caster:FindTargets(radius)
		local hit_hero = false

		for _, enemy in pairs(enemies) do
			if IsValid(self.caster.lucky_ability) then
				self.caster.lucky_ability:ProcPassive(enemy)
			end

			if
				self.caster:HasScepter()
				and not legendary_mod
				and (self.talents.has_w7 == 1 or self.talents.has_r7 == 1)
				and IsValid(self.caster.rolling_ability)
			then
				self.caster.rolling_ability:DealDamage(enemy, self.scepter_damage)
			end

			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_pangolier_shield_crash_custom_slow",
				{ duration = self.slow_duration }
			)
			if enemy:IsRealHero() then
				hit_hero = true
			end

			self:ApplyMagic(enemy)

			local damage = self:GetDamage(enemy)
			local damage_ability = nil

			if legendary_mod then
				damage = damage * (legendary_max and self.talents.w7_damage_max or self.talents.w7_damage)
				damage_ability = "modifier_pangolier_shield_7"
			end

			damageTable.damage = damage
			damageTable.victim = enemy
			local real_damage = DoDamage(damageTable, damage_ability)
			if legendary_max then
				enemy:SendNumber(106, real_damage)
			end
		end

		local smash = ParticleManager:CreateParticle(particle, PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(smash, 0, self.caster:GetAbsOrigin())
		if
			particle == "particles/econ/items/pangolier/pangolier_ti8_immortal/pangolier_ti8_immortal_shield_crash.vpcf"
		then
			ParticleManager:SetParticleControl(smash, 1, Vector(radius, radius, radius))
		end
		ParticleManager:DestroyParticle(smash, false)
		ParticleManager:ReleaseParticleIndex(smash)
		EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Hero_Pangolier.TailThump", self.caster)

		if legendary_max then
			EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Pango.Shield_legendary", self.caster)
			EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Pango.Shield_legendary2", self.caster)

			for i = 1, 2 do
				local smash2 = ParticleManager:CreateParticle(
					"particles/items3_fx/blink_overwhelming_burst.vpcf",
					PATTACH_WORLDORIGIN,
					nil
				)
				ParticleManager:SetParticleControl(smash2, 0, self.caster:GetAbsOrigin())
				ParticleManager:SetParticleControl(
					smash2,
					1,
					Vector(radius * (i * 0.5), radius * (i * 0.5), radius * (i * 0.5))
				)
				ParticleManager:DestroyParticle(smash2, false)
				ParticleManager:ReleaseParticleIndex(smash2)
			end
		end

		if hit_hero and IsValid(self.caster.rolling_ability) then
			self.caster.rolling_ability:ProcCd(legendary_mod)
		end

		if self.talents.has_w7 == 1 then
			if not legendary_mod then
				self.caster:AddNewModifier(
					self.caster,
					self,
					"modifier_pangolier_shield_crash_custom_legendary",
					{ duration = self.talents.w7_duration }
				)
			elseif IsValid(legendary_mod) then
				if legendary_max then
					legendary_mod.full = true
					legendary_mod:Destroy()
				elseif #enemies > 0 then
					legendary_mod:AddStack()
				end
			end
		end
	end)
end

function pangolier_shield_crash_custom:AddShield()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	if IsValid(self.shield_mod) then
		self.shield_mod:Destroy()
	end

	self.shield_mod = self.caster:AddNewModifier(self.caster, self, "modifier_generic_shield", {
		duration = self.duration,
		max_shield = self.hero_stacks + self.caster:GetAllStats() * self.talents.h1_shield,
		start_full = 1,
	})

	if not self.shield_mod then
		return
	end

	self.shield_mod:SetReduceDamage(function(params)
		local mod = params.caster:FindModifierByName("modifier_pangolier_innate_custom_damage_reduce")
		if mod and mod.GetModifierIncomingDamage_Percentage then
			return (1 + mod:GetModifierIncomingDamage_Percentage() / 100)
		end
	end)

	local particle_effect_1 = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff.vpcf",
		self
	)
	local effect_1 = ParticleManager:CreateParticle(particle_effect_1, PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControlEnt(
		effect_1,
		1,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		Vector(0, 0, 0),
		false
	)
	ParticleManager:SetParticleControl(effect_1, 3, Vector(255, 255, 255))
	self.shield_mod:AddParticle(effect_1, false, false, -1, true, false)

	local effect_2 = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_egg.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		effect_2,
		1,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		Vector(0, 0, 0),
		false
	)
	self.shield_mod:AddParticle(effect_2, false, false, -1, true, false)

	local effect_3 = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_streaks.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		effect_3,
		1,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		Vector(0, 0, 0),
		false
	)
	self.shield_mod:AddParticle(effect_3, false, false, -1, true, false)

	self.caster:EmitSound("Hero_Pangolier.TailThump.Shield")
end

function pangolier_shield_crash_custom:ApplyMagic(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_pangolier_shield_crash_custom_magic",
		{ duration = self.talents.w3_duration }
	)
end

modifier_pangolier_shield_crash_custom_legendary = class(mod_hidden)
function modifier_pangolier_shield_crash_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true

	self.ability:EndCd(1)

	self.max_time = self:GetRemainingTime()
	self.max = self.ability.talents.w7_max

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_pangolier_shield_crash_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self:GetStackCount(),
		active = self:GetStackCount() >= (self.max - 1),
		style = "PangolierShield",
	})
end

function modifier_pangolier_shield_crash_custom_legendary:AddStack()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() == (self.max - 1) then
		self.parent:GenericParticle("particles/legion_commander/lc_odd_proc_.vpcf")
		self.parent:GenericParticle("particles/legion_commander/lc_lowhp.vpcf", self)

		self.parent:EmitSound("Pango.Shield_damage_proc")
		self.parent:EmitSound("Pango.Shield_damage_proc2")
	end
end

function modifier_pangolier_shield_crash_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "PangolierShield" })
	self.ability:StartCd()

	if not self.full then
		return
	end
	local particle =
		ParticleManager:CreateParticle("particles/pangolier/buckle_refresh.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
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

	self.parent:CdAbility(self.ability, nil, self.ability.talents.w7_cd_inc, "modifier_pangolier_shield_7")
end

modifier_pangolier_shield_crash_custom_slow = class(mod_visible)
function modifier_pangolier_shield_crash_custom_slow:IsPurgable()
	return true
end
function modifier_pangolier_shield_crash_custom_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_snapfire_slow.vpcf"
end
function modifier_pangolier_shield_crash_custom_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_pangolier_shield_crash_custom_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_debuff.vpcf", self)
end

function modifier_pangolier_shield_crash_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_pangolier_shield_crash_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_pangolier_shield_crash_custom_tracker = class(mod_hidden)
function modifier_pangolier_shield_crash_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.shield_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.hero_stacks = self.ability:GetSpecialValueFor("hero_stacks")
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.jump_duration = self.ability:GetSpecialValueFor("jump_duration")
	self.ability.jump_duration_gyroshell = self.ability:GetSpecialValueFor("jump_duration_gyroshell")
	self.ability.jump_height_gyroshell = self.ability:GetSpecialValueFor("jump_height_gyroshell")
	self.ability.jump_height = self.ability:GetSpecialValueFor("jump_height")
	self.ability.jump_horizontal_distance = self.ability:GetSpecialValueFor("jump_horizontal_distance")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.ability.scepter_range = self.ability:GetSpecialValueFor("scepter_range")
	self.ability.scepter_attacks = self.ability:GetSpecialValueFor("scepter_attacks")
	self.ability.scepter_damage = self.ability:GetSpecialValueFor("scepter_damage") / 100
	self.ability.scepter_pull_distance = self.ability:GetSpecialValueFor("scepter_pull_distance")
end

function modifier_pangolier_shield_crash_custom_tracker:OnRefresh(table)
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.hero_stacks = self.ability:GetSpecialValueFor("hero_stacks")
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
end

function modifier_pangolier_shield_crash_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_pangolier_shield_crash_custom_tracker:GetModifierBonusStats_Strength()
	return self.ability.talents.h1_stats
end

function modifier_pangolier_shield_crash_custom_tracker:GetModifierBonusStats_Agility()
	return self.ability.talents.h1_stats
end

function modifier_pangolier_shield_crash_custom_tracker:GetModifierBonusStats_Intellect()
	return self.ability.talents.h1_stats
end

modifier_pangolier_shield_crash_custom_magic = class(mod_visible)
function modifier_pangolier_shield_crash_custom_magic:GetTexture()
	return "buffs/pangolier/shield_3"
end
function modifier_pangolier_shield_crash_custom_magic:OnCreated(table)
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.max = self.ability.talents.w3_max
	self.magic = self.ability.talents.w3_magic / self.max

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true

	if self.ability.talents.has_r7 == 0 then
		self.effect_cast = self.parent:GenericParticle("particles/pangolier/rolling_stack.vpcf", self, true)
	end

	self:OnRefresh()
end

function modifier_pangolier_shield_crash_custom_magic:OnRefresh(table)
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
end

function modifier_pangolier_shield_crash_custom_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_pangolier_shield_crash_custom_magic:GetModifierMagicalResistanceBonus()
	return self.magic * self:GetStackCount()
end

modifier_pangolier_shield_crash_custom_burn = class(mod_hidden)
function modifier_pangolier_shield_crash_custom_burn:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w1_duration
	self.count = 0
	self.damage = self.ability.talents.w1_burn / self.max

	self.damageTable =
		{ attacker = self.caster, victim = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)

	self:StartIntervalThink(1)
end

function modifier_pangolier_shield_crash_custom_burn:OnRefresh()
	if not IsServer() then
		return
	end
	self.count = 0
end

function modifier_pangolier_shield_crash_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.damageTable.damage = self.ability:GetDamage(self.parent) * self.damage
	DoDamage(self.damageTable, "modifier_pangolier_shield_1")

	self.count = self.count + 1
	if self.count >= self.max then
		self:Destroy()
	end
end

modifier_pangolier_shield_crash_custom_health = class(mod_visible)
function modifier_pangolier_shield_crash_custom_health:GetTexture()
	return "buffs/pangolier/shield_4"
end
function modifier_pangolier_shield_crash_custom_health:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.health = self.ability.talents.w4_health
	self.spell = self.ability.talents.w4_spell

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_pangolier_shield_crash_custom_health:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_pangolier_shield_crash_custom_health:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_pangolier_shield_crash_custom_health:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_pangolier_shield_crash_custom_health:GetModifierExtraHealthPercentage()
	return self.health * self:GetStackCount()
end

function modifier_pangolier_shield_crash_custom_health:GetModifierSpellAmplify_Percentage()
	return self.spell * self:GetStackCount()
end