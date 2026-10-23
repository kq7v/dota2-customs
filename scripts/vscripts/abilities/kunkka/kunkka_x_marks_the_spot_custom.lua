--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_kunkka_xmark_custom_tracker",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_target",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_caster",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_treasure",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_stats_bonus",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_kunkka_shop_5", "modifier_kunkka_xmark_7" }
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_speed",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_kunkka_shop_1", "modifier_kunkka_xmark_7" }
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_double",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_spell_attack",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_chest_move",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_kunkka_shop_10", "modifier_kunkka_xmark_7" }
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_bleed",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_xmark_3"
)
LinkLuaModifier(
	"modifier_kunkka_xmark_custom_blink",
	"abilities/kunkka/kunkka_x_marks_the_spot_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_xmark_4"
)

kunkka_x_marks_the_spot_custom = class({})
kunkka_x_marks_the_spot_custom.talents = {}

function kunkka_x_marks_the_spot_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_kunkka/kunkka_spell_x_spot.vpcf", context)
	PrecacheResource("particle", "particles/alchemist/alch_stun_legendary.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_disguise.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti9/shovel_dig.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti9/shovel_revealed_loot_variant_0_treasure.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/xmark_resist.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/xmark_proc.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/xmark_double_attack.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/xmark_attack.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/xmark_blur.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/xmark_chest_move.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tidehunter/tidehunter_gush_slow.vpcf", context)
	PrecacheResource("particle", "particles/items8_fx/consecrated_wraps_onhit.vpcf", context)
	PrecacheResource("particle", "particles/items8_fx/consecrated_wraps_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tidehunter/tidehunter_krakenshell_purge.vpcf", context)
	PrecacheResource("particle", "particles/morphling/wave_trail_effect.vpcf", context)
end

function kunkka_x_marks_the_spot_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_chance = caster:GetTalentValue("modifier_kunkka_xmark_1", "chance", true),
			e1_crit = 0,
			e1_bonus = caster:GetTalentValue("modifier_kunkka_xmark_1", "bonus", true),

			e2_cd = 0,
			e2_lifesteal = 0,
			e2_bonus = caster:GetTalentValue("modifier_kunkka_xmark_2", "bonus", true),

			has_e3 = 0,
			e3_bonus_duration = 0,
			e3_damage = 0,
			e3_duration = caster:GetTalentValue("modifier_kunkka_xmark_3", "duration", true),
			e3_interval = caster:GetTalentValue("modifier_kunkka_xmark_3", "interval", true),
			e3_damage_type = caster:GetTalentValue("modifier_kunkka_xmark_3", "damage_type", true),

			has_e4 = 0,
			e4_range = caster:GetTalentValue("modifier_kunkka_xmark_4", "range", true),
			e4_move = caster:GetTalentValue("modifier_kunkka_xmark_4", "move", true),
			e4_slow_resist = caster:GetTalentValue("modifier_kunkka_xmark_4", "slow_resist", true),
			e4_delay = caster:GetTalentValue("modifier_kunkka_xmark_4", "delay", true),

			has_e7 = 0,
			e7_spawn_gap = caster:GetTalentValue("modifier_kunkka_xmark_7", "spawn_gap", true),
			e7_vision_radius = caster:GetTalentValue("modifier_kunkka_xmark_7", "vision_radius", true),
			e7_pick_radius = caster:GetTalentValue("modifier_kunkka_xmark_7", "pick_radius", true),
			e7_min_gold = caster:GetTalentValue("modifier_kunkka_xmark_7", "min_gold", true),
			e7_max_gold = caster:GetTalentValue("modifier_kunkka_xmark_7", "max_gold", true),
			e7_kill_gold = caster:GetTalentValue("modifier_kunkka_xmark_7", "kill_gold", true),
			e7_bounty_gold = caster:GetTalentValue("modifier_kunkka_xmark_7", "bounty_gold", true),
			e7_start_gold = caster:GetTalentValue("modifier_kunkka_xmark_7", "start_gold", true),
			e7_legendary = caster:GetTalentValue("modifier_kunkka_xmark_7", "legendary", true),
			e7_chest_timer = caster:GetTalentValue("modifier_kunkka_xmark_7", "chest_timer", true),
			e7_max_chest = caster:GetTalentValue("modifier_kunkka_xmark_7", "max_chest", true),
			e7_chest_gold = caster:GetTalentValue("modifier_kunkka_xmark_7", "chest_gold", true),
			e7_chest_blue = caster:GetTalentValue("modifier_kunkka_xmark_7", "chest_blue", true),
			e7_chest_exp = caster:GetTalentValue("modifier_kunkka_xmark_7", "chest_exp", true),
			e7_tower_radius = caster:GetTalentValue("modifier_kunkka_xmark_7", "tower_radius", true),

			has_s1 = 0,
			s1_speed = 0,
			s1_duration = caster:GetTalentValue("modifier_kunkka_shop_1", "duration", true),

			has_s2 = 0,
			s2_damage = 0,
			s2_heal = caster:GetTalentValue("modifier_kunkka_shop_2", "heal", true) / 100,
			s2_bonus = caster:GetTalentValue("modifier_kunkka_shop_2", "bonus", true) / 100,
			s2_damage_type = caster:GetTalentValue("modifier_kunkka_shop_2", "damage_type", true),

			has_s3 = 0,
			s3_stats = 0,

			has_s5 = 0,
			s5_bonus = 0,
			s5_stats = 0,
			s5_duration = caster:GetTalentValue("modifier_kunkka_shop_5", "duration", true),
			s5_duration_creeps = caster:GetTalentValue("modifier_kunkka_shop_5", "duration_creeps", true),
			s5_max = caster:GetTalentValue("modifier_kunkka_shop_5", "max", true),

			has_s6 = 0,
			s6_status = 0,
			s6_bva = 0,

			has_s7 = 0,
			s7_speed = 0,
			s7_speed_real = 0,
			s7_gold = 0,

			has_s8 = 0,
			s8_talent_cd = caster:GetTalentValue("modifier_kunkka_shop_8", "talent_cd", true),
			s8_delay = caster:GetTalentValue("modifier_kunkka_shop_8", "delay", true),
			s8_range = caster:GetTalentValue("modifier_kunkka_shop_8", "range", true),
			s8_damage = caster:GetTalentValue("modifier_kunkka_shop_8", "damage", true),

			has_s9 = 0,
			s9_damage = caster:GetTalentValue("modifier_kunkka_shop_9", "damage", true),
			s9_attacks = caster:GetTalentValue("modifier_kunkka_shop_9", "attacks", true),
			s9_interval = caster:GetTalentValue("modifier_kunkka_shop_9", "interval", true),
			s9_delay = caster:GetTalentValue("modifier_kunkka_shop_9", "delay", true) / 100,

			has_s10 = 0,
			s10_chest = caster:GetTalentValue("modifier_kunkka_shop_10", "chest", true),
			s10_gold = caster:GetTalentValue("modifier_kunkka_shop_10", "gold", true) / 100,
			s10_move = caster:GetTalentValue("modifier_kunkka_shop_10", "move", true),
			s10_shield = caster:GetTalentValue("modifier_kunkka_shop_10", "shield", true) / 100,
			s10_duration = caster:GetTalentValue("modifier_kunkka_shop_10", "duration", true),
		}

		for i = 1, 10 do
			local shop_name = "modifier_kunkka_shop_" .. i
			self.talents["s" .. i .. "_cost"] = caster:GetTalentValue(shop_name, "cost", true)
			self.talents["s" .. i .. "_max_level"] = caster:GetTalentValue(shop_name, "max_level", true)
		end
	end

	if caster:HasTalent("modifier_kunkka_xmark_1") then
		self.talents.has_e1 = 1
		self.talents.e1_crit = caster:GetTalentValue("modifier_kunkka_xmark_1", "crit") + 100
		self.caster:AddProc(self.tracker, { land = true, ally = true })
		self.caster:AddRecordDestroyEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_kunkka_xmark_2") then
		self.talents.e2_cd = caster:GetTalentValue("modifier_kunkka_xmark_2", "cd")
		self.talents.e2_lifesteal = caster:GetTalentValue("modifier_kunkka_xmark_2", "lifesteal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_kunkka_xmark_2",
			value = function(params)
				if params.inflictor and params.inflictor ~= caster.tidebringer_ability then
					return 0
				end
				return self.talents.e2_lifesteal
					* (caster:HasModifier("modifier_kunkka_xmark_custom_target") and self.talents.e2_bonus or 1)
			end,
		})
	end

	if caster:HasTalent("modifier_kunkka_xmark_3") then
		self.talents.has_e3 = 1
		self.talents.e3_bonus_duration = caster:GetTalentValue("modifier_kunkka_xmark_3", "bonus_duration")
		self.talents.e3_damage = caster:GetTalentValue("modifier_kunkka_xmark_3", "damage") / 100
		self.caster:AddProc(self.tracker, { land = true, ally = true })
	end

	if caster:HasTalent("modifier_kunkka_xmark_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_kunkka_xmark_7") then
		self.talents.has_e7 = 1
		if not self.e7_init then
			self.e7_init = true
			self.tracker:LegendaryInit()
		end
	end

	if caster:HasTalent("modifier_kunkka_shop_1") then
		self.talents.has_s1 = 1
		self.talents.s1_speed = caster:GetTalentValue("modifier_kunkka_shop_1", "speed")
		self.parent:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_kunkka_shop_2") then
		self.talents.has_s2 = 1
		self.talents.s2_damage = caster:GetTalentValue("modifier_kunkka_shop_2", "damage")
		self.caster:AddProc(self.tracker, { land = true, ally = true })
	end

	if caster:HasTalent("modifier_kunkka_shop_3") then
		self.talents.has_s3 = 1
		self.talents.s3_stats = caster:GetTalentValue("modifier_kunkka_shop_3", "stats") / 100
		if name == "modifier_kunkka_shop_3" then
			self:OnInventoryContentsChanged()
		end
	end

	if caster:HasTalent("modifier_kunkka_shop_5") then
		self.talents.has_s5 = 1
		self.talents.s5_bonus = caster:GetTalentValue("modifier_kunkka_shop_5", "bonus")
		self.talents.s5_stats = caster:GetTalentValue("modifier_kunkka_shop_5", "stats")
		if IsServer() then
			self.caster:CalculateStatBonus(true)
			self.caster:AddProc(self.tracker, { land = true, ally = true })
		end
	end

	if caster:HasTalent("modifier_kunkka_shop_6") then
		self.talents.has_s6 = 1
		self.talents.s6_status = caster:GetTalentValue("modifier_kunkka_shop_6", "status")
		self.talents.s6_bva = caster:GetTalentValue("modifier_kunkka_shop_6", "bva")
	end

	if caster:HasTalent("modifier_kunkka_shop_7") then
		self.talents.has_s7 = 1
		self.talents.s7_speed = caster:GetTalentValue("modifier_kunkka_shop_7", "speed")
		self.talents.s7_gold = caster:GetTalentValue("modifier_kunkka_shop_7", "gold") / 100
	end

	if caster:HasTalent("modifier_kunkka_shop_8") then
		self.talents.has_s8 = 1
		self.caster:AddProc(self.tracker, { land = true, ally = true })
	end

	if caster:HasTalent("modifier_kunkka_shop_9") then
		self.talents.has_s9 = 1
	end

	if caster:HasTalent("modifier_kunkka_shop_10") then
		self.talents.has_s10 = 1
	end

	if self.talents.has_s7 == 0 then
		return
	end

	local speed = 0
	for i = 1, 4 do
		local name = "modifier_kunkka_shop_" .. i
		speed = speed + self.talents.s7_speed * self.parent:TalentLevel(name)
	end

	self.talents.s7_speed_real = speed
end

function kunkka_x_marks_the_spot_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "kunkka_x_marks_the_spot", self)
end

function kunkka_x_marks_the_spot_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_kunkka_xmark_custom_tracker"
end

function kunkka_x_marks_the_spot_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.e2_cd or 0)
end

function kunkka_x_marks_the_spot_custom:GetCastAnimation()
	if self.caster:HasModifier("modifier_kunkka_xmark_custom_caster") then
		return ACT_DOTA_OVERRIDE_ABILITY_3
	end
	return ACT_DOTA_CAST_ABILITY_3
end

function kunkka_x_marks_the_spot_custom:GetBehavior()
	if self.caster:HasModifier("modifier_kunkka_xmark_custom_caster") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
	end
	if self.talents.has_e4 == 1 then
		return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_POINT
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
end

function kunkka_x_marks_the_spot_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_e4 == 1 and not hTarget then
		return self.talents.e4_range
	end
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
end

function kunkka_x_marks_the_spot_custom:GetCastPoint()
	if self.caster:HasModifier("modifier_kunkka_xmark_custom_caster") then
		return self.cast_return
	end
	return self.BaseClass.GetCastPoint(self)
end

function kunkka_x_marks_the_spot_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_kunkka_xmark_custom_caster") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function kunkka_x_marks_the_spot_custom:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_kunkka_xmark_custom_caster")
	if mod then
		mod:Destroy()
		return
	end

	local target = self:GetCursorTarget()
	local point = nil

	if not target then
		target = self.caster
		if self.talents.has_e4 == 1 then
			point = self.caster:CastPosition(self:GetCursorPosition())
		end
	end

	local is_enemy = target:GetTeamNumber() ~= self.caster:GetTeamNumber()
	if is_enemy then
		if target:TriggerSpellAbsorb(self) then
			return
		end
	end

	local duration = is_enemy and self.duration or (self.allied_duration + self.talents.e3_bonus_duration)

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_xmark_custom_caster",
		{ duration = duration, target = target:entindex() }
	)

	if IsValid(self.caster.torrent_ability) then
		self.caster.torrent_ability:CreateTrail(GetGroundPosition(target:GetAbsOrigin(), nil))
	end

	if point and self.caster:CanBlink() then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_kunkka_xmark_custom_blink",
			{ duration = self.talents.e4_delay, x = point.x, y = point.y }
		)
	end
end

function kunkka_x_marks_the_spot_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if not IsValid(self.tracker) then
		return
	end
	if self.talents.has_s3 == 0 then
		return
	end

	self.caster:StartCd("kunkka_items_check", 8)
end

function kunkka_x_marks_the_spot_custom:ProcEffects(target, no_cooldown, is_attack)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return
	end

	if self.talents.has_s2 == 1 and not no_cooldown then
		self:ProcDamage(target)
	end

	if
		self.talents.has_s8 == 1
		and self.caster:HasModifier("modifier_kunkka_xmark_custom_target")
		and not no_cooldown
	then
		if is_attack then
			local particle = ParticleManager:CreateParticle(
				"particles/kunkka/xmark_attack.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				1,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetAbsOrigin(),
				true
			)
			ParticleManager:DestroyParticle(particle, false)
			ParticleManager:ReleaseParticleIndex(particle)
		end

		if is_attack and not self.caster:CheckCd("kunkka_s8", self.talents.s8_talent_cd) then
			return
		end
		target:AddNewModifier(
			self.parent,
			self,
			"modifier_kunkka_xmark_custom_double",
			{ duration = self.talents.s8_delay }
		)
	end
end

function kunkka_x_marks_the_spot_custom:ProcDamage(target, damage_k)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_s2 == 0 then
		return
	end

	local damage = self.talents.s2_damage * (damage_k or 1)
	if self.caster:HasModifier("modifier_kunkka_xmark_custom_target") then
		damage = damage * (1 + self.talents.s2_bonus)

		local effect =
			ParticleManager:CreateParticle("particles/kunkka/xmark_proc.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
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

	local real_damage = DoDamage(
		{
			attacker = self.caster,
			ability = self,
			damage_type = self.talents.s2_damage_type,
			damage = damage,
			victim = target,
		},
		"modifier_kunkka_shop_2"
	)
	local result = self.caster:CanLifesteal(target)
	if result then
		self.caster:GenericHeal(real_damage * self.talents.s2_heal * result, self, true, "", "modifier_kunkka_shop_2")
	end
end

function kunkka_x_marks_the_spot_custom:ApplyBleed(target, damage)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 == 0 then
		return
	end
	if self.caster.fake_attack then
		return
	end
	if damage <= 0 then
		return
	end
	if not self.caster:HasModifier("modifier_kunkka_xmark_custom_target") then
		return
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_xmark_custom_bleed",
		{ damage = damage * self.talents.e3_damage }
	)
end

function kunkka_x_marks_the_spot_custom:SpellDelay()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_s9 == 0 then
		return
	end

	return self.talents.s9_delay
end

function kunkka_x_marks_the_spot_custom:SpellAttack(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_s9 == 0 then
		return
	end

	target:AddNewModifier(self.caster, self, "modifier_kunkka_xmark_custom_spell_attack", {})
end

function kunkka_x_marks_the_spot_custom:ApplyShield()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_s10 == 0 then
		return
	end

	local duration = self.talents.s10_duration

	if IsValid(self.chest_shield) then
		self.chest_shield:Destroy()
	end

	self.chest_shield = self.caster:AddNewModifier(self.caster, self, "modifier_generic_shield_multiple", {
		duration = duration,
		start_full = 1,
		max_shield = self.caster:GetMaxHealth() * self.talents.s10_shield,
		shield_talent = "modifier_kunkka_shop_10",
		is_hidden = 1,
	})

	if self.chest_shield then
		local particle = ParticleManager:CreateParticle(
			"particles/items8_fx/consecrated_wraps_onhit.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		local particle2 = ParticleManager:CreateParticle(
			"particles/items8_fx/consecrated_wraps_stack.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControl(particle2, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(particle2, 2, Vector(10, 0, 0))
		self.chest_shield:AddParticle(particle2, false, false, -1, false, false)
	end

	self.caster:RemoveModifierByName("modifier_kunkka_xmark_custom_chest_move")
	self.caster:AddNewModifier(self.caster, self, "modifier_kunkka_xmark_custom_chest_move", { duration = duration })
end

modifier_kunkka_xmark_custom_caster = class(mod_hidden)
function modifier_kunkka_xmark_custom_caster:RemoveOnDeath()
	return false
end
function modifier_kunkka_xmark_custom_caster:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ability:EndCd(0.2)

	self.target = EntIndexToHScript(table.target)

	if not IsValid(self.target) then
		self:Destroy()
		return
	end

	self.mod = self.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_kunkka_xmark_custom_target",
		{ duration = table.duration }
	)
end

function modifier_kunkka_xmark_custom_caster:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if not IsValid(self.mod) then
		return
	end
	self.mod:Destroy()
end

modifier_kunkka_xmark_custom_target = class(mod_visible)
function modifier_kunkka_xmark_custom_target:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_kunkka_xmark_custom_target:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.pos = self.parent:GetAbsOrigin()
	self.bva = self.parent:GetBaseAttackTime(false)
	self.is_enemy = self.parent:GetTeamNumber() ~= self.caster:GetTeamNumber()
	self.is_self = self.parent == self.caster
	self.damage_change = self.ability.damage_change

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:EmitSound("Ability.XMarksTheSpot.Target")
	self.parent:EmitSound("Ability.XMark.Target_Movement")
	local pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_kunkka/kunkka_spell_x_spot.vpcf",
		self.ability
	)
	self.parent:GenericParticle(pfx, self)

	if not self.is_enemy then
		if self.ability.talents.has_s6 == 1 then
			self.parent:GenericParticle("particles/kunkka/xmark_resist.vpcf", self)
		end
		if self.ability.talents.has_s8 == 1 then
			self.parent:GenericParticle("particles/kunkka/xmark_blur.vpcf", self)
		end

		if not self.is_self then
			return
		end

		self.interval = 0.1
		self:UpdateUI()
		self:StartIntervalThink(self.interval)
		return
	end

	self.interval = 0.2
	self:StartIntervalThink(self.interval)
end

function modifier_kunkka_xmark_custom_target:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.is_enemy then
		self:UpdateUI()
		return
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 100, self.interval * 2, false)
end

function modifier_kunkka_xmark_custom_target:UpdateUI(hide)
	if not IsServer() then
		return
	end
	if not self.is_self then
		return
	end

	if hide then
		self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "KunkkaMark", priority = 1 })
		return
	end

	local left = self:GetRemainingTime()
	self.caster:UpdateUIshort({
		time = left,
		max_time = self:GetDuration(),
		stack = left,
		use_zero = 1,
		style = "KunkkaMark",
		priority = 1,
	})
end

function modifier_kunkka_xmark_custom_target:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Ability.XMark.Target_Movement")

	self:UpdateUI(true)

	local blocked = self.parent:IsInvulnerable() or (self.is_enemy and self.parent:IsDebuffImmune())

	if not blocked and self.parent:IsAlive() then
		self.parent:EmitSound("Ability.XMarksTheSpot.Return")

		local ride = self.parent:FindModifierByName("modifier_kunkka_ghostship_custom_scepter_ride")
		if ride then
			ride:Destroy()
		end

		if not self.is_enemy then
			local effect = ParticleManager:CreateParticle(
				"particles/econ/events/ti7/blink_dagger_start_ti7_lvl2.vpcf",
				PATTACH_WORLDORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(effect, 0, self.parent:GetAbsOrigin())
			ParticleManager:ReleaseParticleIndex(effect)
		end

		self.parent:Stop()
		self.parent:InterruptMotionControllers(false)

		local sail = self.parent:FindModifierByName("modifier_kunkka_ghostship_custom_legendary_sail")
		if sail then
			sail:TeleportShip(self.pos)
		else
			FindClearSpaceForUnit(self.parent, self.pos, false)
		end
	end

	self.caster:RemoveModifierByName("modifier_kunkka_xmark_custom_caster")
end

function modifier_kunkka_xmark_custom_target:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_kunkka_xmark_custom_target:CheckState()
	if self.is_enemy then
		return
	end
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

function modifier_kunkka_xmark_custom_target:GetModifierBaseDamageOutgoing_Percentage()
	if self.is_enemy then
		return -self.damage_change
	end
	return self.damage_change
end

function modifier_kunkka_xmark_custom_target:GetModifierMoveSpeedBonus_Percentage()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if self.is_enemy then
		return
	end
	return self.ability.talents.e4_move
end

function modifier_kunkka_xmark_custom_target:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if self.is_enemy then
		return
	end
	return self.ability.talents.e4_slow_resist
end

function modifier_kunkka_xmark_custom_target:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_s6 == 0 then
		return
	end
	if self.is_enemy then
		return
	end
	return self.ability.talents.s6_status
end

function modifier_kunkka_xmark_custom_target:GetModifierBaseAttackTimeConstant()
	if self.ability.talents.has_s6 == 0 then
		return
	end
	if self.is_enemy then
		return
	end
	if not self.bva then
		return
	end
	return self.ability.talents.s6_bva + self.bva
end

function modifier_kunkka_xmark_custom_target:GetModifierAttackRangeBonus()
	if self.ability.talents.has_s8 == 0 then
		return
	end
	if self.is_enemy then
		return
	end
	return self.ability.talents.s8_range
end

function modifier_kunkka_xmark_custom_target:GetStatusEffectName()
	if self.ability.talents.has_s8 == 0 then
		return
	end
	if self.is_enemy then
		return
	end
	return "particles/status_fx/status_effect_luna_shard_marked.vpcf"
end

modifier_kunkka_xmark_custom_tracker = class(mod_hidden)
function modifier_kunkka_xmark_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.xmark_ability = self.ability

	self.ability.damage_change = self.ability:GetSpecialValueFor("damage_change")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.allied_duration = self.ability:GetSpecialValueFor("allied_duration")
	self.ability.fow_range = self.ability:GetSpecialValueFor("fow_range")
	self.ability.fow_duration = self.ability:GetSpecialValueFor("fow_duration")
	self.ability.cast_return = self.ability:GetSpecialValueFor("cast_return")
	self.items_stats = {
		damage = 0,
		speed = 0,
		health = 0,
		agi = 0,
		str = 0,
		int = 0,
	}
	self.records = {}

	if not IsServer() then
		return
	end

	self.dota_items = {
		["item_ultimate_scepter"] = {
			agi = 10,
			str = 10,
			int = 10,
			health = 175,
		},
		["item_vanguard"] = {
			health = 250,
		},
		["item_moon_shard"] = {
			speed = 130,
		},
	}

	self:SetHasCustomTransmitterData(true)
end

function modifier_kunkka_xmark_custom_tracker:OnRefresh()
	self.ability.damage_change = self.ability:GetSpecialValueFor("damage_change")
end

function modifier_kunkka_xmark_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_s1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_kunkka_xmark_custom_speed",
			{ duration = self.ability.talents.s1_duration }
		)
	end
end

function modifier_kunkka_xmark_custom_tracker:GetProcChance(params)
	if params.target:GetTeamNumber() == self.parent:GetTeamNumber() and not params.target.is_kunkka_target then
		return 0
	end
	return 100
end

function modifier_kunkka_xmark_custom_tracker:AttackProc(params, name)
	if params.attack_flag == "kunkka_w4" then
		return
	end

	local target = params.target

	local mod = self.parent:FindModifierByName("modifier_kunkka_xmark_custom_target")
	if mod then
		if self.ability.talents.has_s5 == 1 then
			local duration = target:IsCreep() and self.ability.talents.s5_duration_creeps
				or self.ability.talents.s5_duration
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_kunkka_xmark_custom_stats_bonus",
				{ duration = duration }
			)
		end
	end

	self.ability:ApplyBleed(target, params.damage)

	self.ability:ProcEffects(target, params.no_attack_cooldown, true)

	if self.records[params.record] then
		target:EmitSound("DOTA_Item.Daedelus.Crit")
	end
end

function modifier_kunkka_xmark_custom_tracker:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	self.records[params.record] = nil
end

function modifier_kunkka_xmark_custom_tracker:DeathEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end

	local attacker = params.attacker:FindOwner()
	if attacker ~= self.parent then
		return
	end
	if not params.unit:IsValidKill(self.parent) then
		return
	end

	self:ShopGold(nil, 1)
end

function modifier_kunkka_xmark_custom_tracker:LegendaryInit()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if self.legendary_init then
		return
	end

	self.legendary_init = true
	self.player_id = self.parent:GetId()
	self.chest_timer = self.ability.talents.e7_chest_timer

	self.parent:AddDeathEvent(self, true)

	self:ShopStart(true)
	self:StartIntervalThink(0.5)
end

function modifier_kunkka_xmark_custom_tracker:ShopStart(init)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(self.player_id), "StartKunkkaPanel", {})

	local start_gold = TestMode and 999
		or (
			dota1x6.current_wave >= upgrade_orange and self.ability.talents.e7_legendary
			or self.ability.talents.e7_start_gold
		)
	self:ShopGold(init and start_gold or 0)
end

function modifier_kunkka_xmark_custom_tracker:ShopGold(gold, reason)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end

	local change = gold
	if reason then
		if reason == 1 then
			change = self.ability.talents.e7_kill_gold
		elseif reason == 2 then
			change = self.ability.talents.e7_bounty_gold
		end
	end

	if not self.legendary_gold then
		self.legendary_gold = 0
	end
	self.legendary_gold = math.max(0, self.legendary_gold + change)

	if change > 0 then
		self.parent:EmitSound("Kunkka.Treasure_reward2")

		local effect_cast = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_alchemist/alchemist_lasthit_coins.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(effect_cast, 1, self.parent:GetOrigin())
		ParticleManager:ReleaseParticleIndex(effect_cast)

		local digit = string.len(tostring(math.floor(change))) + 1
		local effect_cast_2 = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_alchemist/alchemist_lasthit_msg_gold.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(effect_cast_2, 1, Vector(0, change, 0))
		ParticleManager:SetParticleControl(effect_cast_2, 2, Vector(1, digit, 0))
		ParticleManager:SetParticleControl(effect_cast_2, 3, Vector(255, 255, 0))
		ParticleManager:ReleaseParticleIndex(effect_cast_2)
	end

	Timers:CreateTimer(0.1, function()
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.player_id),
			"UpdateKunkkaShop",
			{ gold = self.legendary_gold }
		)
	end)
end

function modifier_kunkka_xmark_custom_tracker:ShopBuy(name)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if type(name) ~= "string" then
		return
	end
	if not ingame_talents["kunkka_shop"] or not ingame_talents["kunkka_shop"][name] then
		return
	end

	local slot = "s" .. string.gsub(name, "modifier_kunkka_shop_", "")
	if not self.ability.talents[slot .. "_cost"] then
		return
	end

	local cost = math.floor(self.ability.talents[slot .. "_cost"] * (1 + self.ability.talents.s7_gold))
	local level = self.parent:TalentLevel(name)
	local max_level = self.ability.talents[slot .. "_max_level"]

	if level >= max_level then
		return
	end
	if not cost or cost <= 0 then
		return
	end
	if cost > self.legendary_gold then
		return
	end

	self.parent:InitTalent(name)
	self:ShopGold(-cost)
end

function modifier_kunkka_xmark_custom_tracker:UpdateTreasure()
	if not IsServer() then
		return
	end

	if not self.current_treasure then
		self.current_treasure = {}
	end

	local count = 0

	for treasure, _ in pairs(self.current_treasure) do
		if IsValid(treasure) then
			count = count + 1
		end
	end

	local max = self.ability.talents.e7_max_chest
		+ (self.ability.talents.has_s10 == 1 and self.ability.talents.s10_chest or 0)

	for i = 1, max - count do
		local point
		local attempts = 0
		repeat
			point = Vector(RandomInt(-6600, 6600), RandomInt(-6600, 6600), 215)
			attempts = attempts + 1
		until self:IsValidPoint(point) or attempts >= 100

		if not self:IsValidPoint(point) then
			return
		end

		local unit = CreateUnitByName("npc_kunkka_bounty_custom", point, true, nil, nil, DOTA_TEAM_NEUTRALS)
		FindClearSpaceForUnit(unit, point, false)
		unit:AddNewModifier(self.parent, self.ability, "modifier_kunkka_xmark_custom_treasure", {})
		self.current_treasure[unit] = true
	end
end

function modifier_kunkka_xmark_custom_tracker:IsValidPoint(point, array)
	if not IsServer() then
		return
	end

	for _, tower in pairs(towers) do
		if
			tower:GetTeamNumber() ~= self.parent:GetTeamNumber()
			and (tower:GetAbsOrigin() - point):Length2D() <= self.ability.talents.e7_tower_radius
		then
			return false
		end
	end

	for unit, _ in pairs(self.current_treasure) do
		if IsValid(unit) and (unit:GetAbsOrigin() - point):Length2D() <= self.ability.talents.e7_spawn_gap then
			return false
		end
	end

	if (self.parent:GetAbsOrigin() - point):Length2D() <= 3000 then
		return false
	end

	return true
end

function modifier_kunkka_xmark_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if not players[self.parent:GetId()] then
		return
	end

	if self.parent:CheckCd("kunkka_chest_timer", self.chest_timer) then
		self:UpdateTreasure()
	end

	if self.parent:HasCd("kunkka_items_check", 8) and self.ability.talents.has_s3 == 1 then
		self:UpdateItems()
	end

	local interval = 0.5
	local result = self:UpdateUI()
	if result and result <= 1000 then
		interval = 0.2
	end

	self:StartIntervalThink(interval)
end

function modifier_kunkka_xmark_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end

	local hero_pos = self.parent:GetAbsOrigin()
	local closest_treasure
	local min_dist

	for treasure, _ in pairs(self.current_treasure) do
		if IsValid(treasure) then
			local dist = (treasure:GetAbsOrigin() - hero_pos):Length2D()
			if not min_dist or min_dist > dist then
				min_dist = dist
				closest_treasure = treasure
			end
		end
	end

	if not closest_treasure then
		local timer = self.chest_timer
			- (GameRules:GetDOTATime(false, false) - self.parent.cd_manager["kunkka_chest_timer"])
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.player_id),
			"UpdateKunkkaPanel",
			{ empty = 1, timer = math.max(0, timer) }
		)
		return
	end

	local direction = closest_treasure:GetAbsOrigin() - hero_pos
	local angle = math.deg(math.atan2(direction.y, direction.x))
	local dist = math.floor(direction:Length2D())

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.player_id),
		"UpdateKunkkaPanel",
		{ angle = angle, distance = dist }
	)

	return dist
end

function modifier_kunkka_xmark_custom_tracker:UpdateItems()
	if not IsServer() then
		return
	end

	local result = {
		damage = 0,
		speed = 0,
		health = 0,
		agi = 0,
		str = 0,
		int = 0,
	}

	for i = 0, 17 do
		if i < 6 or i > 14 then
			local item = self.parent:GetItemInSlot(i)
			if item then
				local data = self.dota_items[item:GetName()]
				if data then
					result.damage = result.damage + (data.damage or 0)
					result.speed = result.speed + (data.speed or 0)
					result.health = result.health + (data.health or 0)
					result.agi = result.agi + (data.agi or 0)
					result.str = result.str + (data.str or 0)
					result.int = result.int + (data.int or 0)
				else
					local mod = self.parent:FindModifierByName(
						item.GetIntrinsicModifierName and item:GetIntrinsicModifierName() or ""
					)
					if mod then
						if mod.GetModifierPreAttack_BonusDamage then
							result.damage = result.damage + mod:GetModifierPreAttack_BonusDamage()
						end
						if mod.GetModifierAttackSpeedBonus_Constant then
							result.speed = result.speed + mod:GetModifierAttackSpeedBonus_Constant()
						end
						if mod.GetModifierHealthBonus then
							result.health = result.health + mod:GetModifierHealthBonus()
						end
						if mod.GetModifierBonusStats_Strength then
							result.str = result.str + mod:GetModifierBonusStats_Strength()
						end
						if mod.GetModifierBonusStats_Agility then
							result.agi = result.agi + mod:GetModifierBonusStats_Agility()
						end
						if mod.GetModifierBonusStats_Intellect then
							result.int = result.int + mod:GetModifierBonusStats_Intellect()
						end
					end
				end
			end
		end
	end

	result.speed = result.speed * self.ability.talents.s3_stats
	result.damage = result.damage * self.ability.talents.s3_stats
	result.health = result.health * self.ability.talents.s3_stats
	result.agi = result.agi * self.ability.talents.s3_stats
	result.str = result.str * self.ability.talents.s3_stats
	result.int = result.int * self.ability.talents.s3_stats

	self.items_stats = result
	self:SendBuffRefreshToClients()
	self.parent:CalculateStatBonus(true)
end

function modifier_kunkka_xmark_custom_tracker:AddCustomTransmitterData()
	return self.items_stats
end

function modifier_kunkka_xmark_custom_tracker:HandleCustomTransmitterData(data)
	self.items_stats = data
end

function modifier_kunkka_xmark_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_kunkka_xmark_custom_tracker:GetStats()
	return self.ability.talents.s5_stats
		+ self.ability.talents.s5_bonus * self.parent:GetUpgradeStack("modifier_kunkka_xmark_custom_stats_bonus")
end

function modifier_kunkka_xmark_custom_tracker:GetCritChance()
	if self.ability.talents.has_e1 == 0 then
		return 0
	end
	if self.parent:HasModifier("modifier_kunkka_xmark_custom_target") then
		return self.ability.talents.e1_chance * self.ability.talents.e1_bonus, 1922
	end

	return self.ability.talents.e1_chance, 1921
end

function modifier_kunkka_xmark_custom_tracker:GetCritDamage()
	return self.ability.talents.e1_crit
end

function modifier_kunkka_xmark_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.parent.fake_attack then
		return
	end
	if self.ability.talents.has_e1 == 0 then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	local chance, prd = self:GetCritChance()
	if not RollPseudoRandomPercentage(chance, prd, self.parent) then
		return
	end

	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_kunkka_xmark_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end

	if self.parent.kunkka_s9 then
		return self.ability.talents.s9_damage - 100
	end

	if self.parent.kunkka_s8 then
		return self.ability.talents.s8_damage - 100
	end
end

function modifier_kunkka_xmark_custom_tracker:GetModifierHealthBonus()
	return self.items_stats.health
end

function modifier_kunkka_xmark_custom_tracker:GetModifierPreAttack_BonusDamage()
	return self.items_stats.damage
end

function modifier_kunkka_xmark_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.s7_speed_real + self.items_stats.speed
end

function modifier_kunkka_xmark_custom_tracker:GetModifierBonusStats_Strength()
	return self:GetStats() + self.items_stats.str
end

function modifier_kunkka_xmark_custom_tracker:GetModifierBonusStats_Agility()
	return self:GetStats() + self.items_stats.agi
end

function modifier_kunkka_xmark_custom_tracker:GetModifierBonusStats_Intellect()
	return self:GetStats() + self.items_stats.int
end

modifier_kunkka_xmark_custom_treasure = class(mod_hidden)
function modifier_kunkka_xmark_custom_treasure:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.point = self.parent:GetAbsOrigin()

	self.vision_radius = self.ability.talents.e7_vision_radius
	self.radius = self.ability.talents.e7_pick_radius

	self.color = Vector(254, 212, 113)
	self.timer = 0
	self.max_timer = 1

	self.interval = 0.4
	self:StartIntervalThink(self.interval)
end

function modifier_kunkka_xmark_custom_treasure:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
	}
end

function modifier_kunkka_xmark_custom_treasure:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.caster:IsAlive() then
		return
	end

	local distance = (self.point - self.caster:GetAbsOrigin()):Length2D()

	if distance <= self.vision_radius then
		AddFOWViewer(self.caster:GetTeamNumber(), self.point, 100, self.interval * 2, false)

		if not self.effect then
			self.effect = ParticleManager:CreateParticleForPlayer(
				"particles/shrine/capture_point_ring_overthrow.vpcf",
				PATTACH_WORLDORIGIN,
				nil,
				PlayerResource:GetPlayer(self.caster:GetId())
			)
			ParticleManager:SetParticleControl(self.effect, 0, self.point)
			ParticleManager:SetParticleControl(self.effect, 3, self.color)
			ParticleManager:SetParticleControl(self.effect, 9, Vector(self.radius, 0, 0))
			self:AddParticle(self.effect, false, false, -1, false, false)
		end
	end

	if distance > self.vision_radius and self.effect then
		ParticleManager:DestroyParticle(self.effect, true)
		ParticleManager:ReleaseParticleIndex(self.effect)
		self.effect = nil
	end

	self.interval = 0.4
	if distance > self.radius then
		self.timer = 0
		if self.pfx then
			self.parent:StopSound("SeasonalConsumable.TI9.Shovel.Dig")
			ParticleManager:DestroyParticle(self.pfx, false)
			ParticleManager:ReleaseParticleIndex(self.pfx)
			self.pfx = nil
		end
	else
		self.interval = 0.033
		if not self.pfx then
			self.parent:EmitSound("SeasonalConsumable.TI9.Shovel.Dig")
			self.pfx =
				ParticleManager:CreateParticle("particles/econ/events/ti9/shovel_dig.vpcf", PATTACH_WORLDORIGIN, nil)
			ParticleManager:SetParticleControl(self.pfx, 0, self.point)
			self:AddParticle(self.pfx, false, false, -1, false, false)
		end

		self.timer = self.timer + self.interval
		if self.timer >= self.max_timer then
			self:GiveReward()
			self:Destroy()
			return
		end
	end

	if self.timer > 0 and not self.part_particle then
		self.part_particle = ParticleManager:CreateParticleForPlayer(
			"particles/shrine/capture_point_ring_clock_overthrow.vpcf",
			PATTACH_WORLDORIGIN,
			nil,
			PlayerResource:GetPlayer(self.caster:GetId())
		)
		ParticleManager:SetParticleControl(self.part_particle, 0, self.point + Vector(0, 0, 20))
		ParticleManager:SetParticleControl(self.part_particle, 11, Vector(0, 0, 1))
		self:AddParticle(self.part_particle, false, false, -1, false, false)
	end

	if self.part_particle then
		ParticleManager:SetParticleControl(self.part_particle, 3, self.color)
		ParticleManager:SetParticleControl(self.part_particle, 9, Vector(self.radius * 1.3, 0, 0))
		ParticleManager:SetParticleControl(self.part_particle, 17, Vector(self.timer / self.max_timer, 0, 0))
	end

	self:StartIntervalThink(self.interval)
end

function modifier_kunkka_xmark_custom_treasure:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("SeasonalConsumable.TI9.Shovel.Dig")

	local part = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_disguise.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(part, 0, self.point)
	ParticleManager:ReleaseParticleIndex(part)

	self.ability.tracker.current_treasure[self.parent] = nil

	UTIL_Remove(self.parent)
end

function modifier_kunkka_xmark_custom_treasure:GiveReward()
	if not IsServer() then
		return
	end
	local gold = self.ability.talents.e7_chest_gold

	if self.ability.talents.has_s10 == 1 then
		gold = gold * (1 + self.ability.talents.s10_gold)
		self.ability:ApplyShield()
	end

	local coins = RandomInt(self.ability.talents.e7_min_gold, self.ability.talents.e7_max_gold)
	self.caster:GiveGold(coins * gold, false, true, "modifier_kunkka_xmark_7")
	self.caster:AddPoints("blue", coins * self.ability.talents.e7_chest_blue, "modifier_kunkka_xmark_7")
	self.caster:AddExperience(self.ability.talents.e7_chest_exp, DOTA_ModifyXP_Unspecified, false, false)

	self.ability.tracker:ShopGold(coins)

	self.parent:EmitSound("Kunkka.Treasure_reward")

	local effect_cast = ParticleManager:CreateParticle(
		"particles/econ/events/ti9/shovel_revealed_loot_variant_0_treasure.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect_cast, 0, self.point)
	ParticleManager:SetParticleControl(effect_cast, 1, self.point)
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

modifier_kunkka_xmark_custom_stats_bonus = class(mod_visible)
function modifier_kunkka_xmark_custom_stats_bonus:GetTexture()
	return "buffs/kunkka/kunkka_shop_5"
end
function modifier_kunkka_xmark_custom_stats_bonus:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.s5_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_kunkka_xmark_custom_stats_bonus:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_kunkka_xmark_custom_stats_bonus:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

modifier_kunkka_xmark_custom_speed = class(mod_visible)
function modifier_kunkka_xmark_custom_speed:GetTexture()
	return "buffs/kunkka/kunkka_shop_1"
end
function modifier_kunkka_xmark_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.s1_speed

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_kunkka_xmark_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_kunkka_xmark_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

modifier_kunkka_xmark_custom_double = class(mod_hidden)
function modifier_kunkka_xmark_custom_double:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_kunkka_xmark_custom_double:OnCreated()
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
	local maxAngleDegrees = 75

	local baseBehindPos = targetPos + vec * dist
	local randomAngle = RandomFloat(-maxAngleDegrees, maxAngleDegrees)
	local resultPos = RotatePosition(targetPos, QAngle(0, randomAngle, 0), baseBehindPos)

	self.parent:EmitSound("Kunkka.XMark_double_attack")
	self.parent:GenericParticle("particles/units/heroes/hero_tidehunter/tidehunter_krakenshell_purge.vpcf")

	local effect = ParticleManager:CreateParticle(
		"particles/kunkka/xmark_double_attack.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect, 0, resultPos)
	ParticleManager:SetParticleControl(effect, 1, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(effect, 4, resultPos)
	ParticleManager:ReleaseParticleIndex(effect)
end

function modifier_kunkka_xmark_custom_double:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	self.caster.kunkka_s8 = true
	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, true, { damage = "kunkka_s8" })
	self.caster.kunkka_s8 = false

	self.ability:ProcDamage(self.parent, self.ability.talents.s8_damage / 100)
end

modifier_kunkka_xmark_custom_spell_attack = class(mod_hidden)
function modifier_kunkka_xmark_custom_spell_attack:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_kunkka_xmark_custom_spell_attack:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.attacks = self.ability.talents.s9_attacks
	self:StartIntervalThink(self.ability.talents.s9_interval)
	self:OnIntervalThink()
end

function modifier_kunkka_xmark_custom_spell_attack:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.parent:IsAlive() or not self.caster:IsAlive() then
		self:Destroy()
		return
	end

	local effect =
		ParticleManager:CreateParticle("particles/kunkka/xmark_proc.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
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

	self.caster.kunkka_s9 = true
	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, true, { damage = "kunkka_s9" })
	self.caster.kunkka_s9 = false

	self.ability:ProcEffects(self.parent, false, false)

	self.attacks = self.attacks - 1
	if self.attacks <= 0 then
		self:Destroy()
	end
end

modifier_kunkka_xmark_custom_chest_move = class(mod_visible)
function modifier_kunkka_xmark_custom_chest_move:GetTexture()
	return "buffs/kunkka/kunkka_shop_10"
end
function modifier_kunkka_xmark_custom_chest_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move = self.ability.talents.s10_move
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/kunkka/xmark_chest_move.vpcf", self)
end

function modifier_kunkka_xmark_custom_chest_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_kunkka_xmark_custom_chest_move:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

modifier_kunkka_xmark_custom_bleed = class(mod_visible)
function modifier_kunkka_xmark_custom_bleed:GetTexture()
	return "buffs/kunkka/xmark_3"
end
function modifier_kunkka_xmark_custom_bleed:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.duration = self.ability.talents.e3_duration
	self.interval = self.ability.talents.e3_interval
	self.ticks = math.floor(self.duration / self.interval)
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.e3_damage_type,
	}

	self.parent:GenericParticle("particles/morphling/wave_trail_effect.vpcf", self)

	self.RemoveForDuel = true
	self:OnRefresh(table)
	self:SetStackCount(math.floor(self.total_damage))
	self:StartIntervalThink(self.interval)
end

function modifier_kunkka_xmark_custom_bleed:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.total_damage = self.total_damage + table.damage
	self.tick = self.total_damage / self.ticks
	self.count = self.ticks
	self.damageTable.damage = self.tick
end

function modifier_kunkka_xmark_custom_bleed:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable, "modifier_kunkka_xmark_3")
	self.parent:SendNumber(111, real_damage)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end

	self:SetStackCount(math.floor(self.total_damage))
end

modifier_kunkka_xmark_custom_blink = class(mod_hidden)
function modifier_kunkka_xmark_custom_blink:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Kunkka.XmarK_blink_start", self.parent)

	local effect = ParticleManager:CreateParticle(
		"particles/econ/events/ti7/blink_dagger_start_ti7_lvl2.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	ProjectileManager:ProjectileDodge(self.parent)

	self.parent:NoDraw(self, true)
	self.parent:AddNoDraw()
end

function modifier_kunkka_xmark_custom_blink:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

function modifier_kunkka_xmark_custom_blink:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:RemoveNoDraw()
	self.parent:EndNoDraw(self)

	self.parent:Teleport(self.point, true)
	self.parent:EmitSound("Kunkka.XmarK_blink_end")
	self.parent:GenericParticle("particles/econ/events/ti7/blink_dagger_end_ti7_lvl2.vpcf")
end