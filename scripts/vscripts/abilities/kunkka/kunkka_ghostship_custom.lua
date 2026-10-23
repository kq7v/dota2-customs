--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_tracker",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_thinker",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_scepter",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_scepter_ride",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_speed",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_hero_6"
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_delay",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_delay_heal",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_legendary_sail",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_ship_7"
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_ship_mod",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_BOTH
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_ship_mod_end",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_cannon_custom_debuff",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_ship_7"
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_magic",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_ship_1"
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_bank",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_ship_3"
)
LinkLuaModifier(
	"modifier_kunkka_ghostship_custom_perma",
	"abilities/kunkka/kunkka_ghostship_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_ship_4"
)

kunkka_ghostship_custom = class({})
kunkka_ghostship_custom.talents = {}

function kunkka_ghostship_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_kunkka/kunkka_ghost_ship.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_kunkka/kunkka_ghostship_marker.vpcf", context)
	PrecacheResource("model", "models/heroes/kunkka/ghostship.vmdl", context)
	PrecacheResource("model", "models/kunkka/shark_ship.vmdl", context)
	PrecacheResource("particle", "particles/kunkka/ship_legenday.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/ship_cannonball.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_kunkka/cannonball_explosion.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/ship_stack.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_shield_active.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/ship_delayed_damage.vpcf", context)
	PrecacheResource("particle", "particles/puck/puck_silence_damage.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/scepter_heal_reduce.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/scepter_effect.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tidehunter/tidehunter_gush_splash_mid.vpcf", context)
end

function kunkka_ghostship_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r2_stun = 0,

			has_r1 = 0,
			r1_magic = 0,
			r1_damage = 0,
			r1_health = 0,
			r1_duration = caster:GetTalentValue("modifier_kunkka_ship_1", "duration", true),

			r2_cd = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_lifesteal = 0,
			r3_duration = caster:GetTalentValue("modifier_kunkka_ship_3", "duration", true),
			r3_damage_max = caster:GetTalentValue("modifier_kunkka_ship_3", "damage_max", true) / 100,
			r3_damage_type = caster:GetTalentValue("modifier_kunkka_ship_3", "damage_type", true),
			r3_delay = caster:GetTalentValue("modifier_kunkka_ship_3", "delay", true),
			r3_cd = caster:GetTalentValue("modifier_kunkka_ship_3", "cd", true),

			has_w7 = 0,

			has_r4 = 0,
			r4_delay = caster:GetTalentValue("modifier_kunkka_ship_4", "delay", true),
			r4_spell = caster:GetTalentValue("modifier_kunkka_ship_4", "spell", true),
			r4_health = caster:GetTalentValue("modifier_kunkka_ship_4", "health", true),
			r4_max = caster:GetTalentValue("modifier_kunkka_ship_4", "max", true),

			has_h4 = 0,
			h4_radius = caster:GetTalentValue("modifier_kunkka_hero_4", "radius", true),
			h4_silence = caster:GetTalentValue("modifier_kunkka_hero_4", "silence", true),

			has_q4 = 0,
			q4_cd_items_ship = caster:GetTalentValue("modifier_kunkka_torrent_4", "cd_items_ship", true),

			q7_step = caster:GetTalentValue("modifier_kunkka_torrent_7", "step", true),

			has_r7 = 0,
			r7_duration = caster:GetTalentValue("modifier_kunkka_ship_7", "duration", true),
			r7_cd = caster:GetTalentValue("modifier_kunkka_ship_7", "cd", true),
			r7_speed = caster:GetTalentValue("modifier_kunkka_ship_7", "speed", true),
			r7_speed_max = caster:GetTalentValue("modifier_kunkka_ship_7", "speed_max", true),
			r7_accel = caster:GetTalentValue("modifier_kunkka_ship_7", "accel", true),
			r7_decel = caster:GetTalentValue("modifier_kunkka_ship_7", "decel", true),
			r7_turn_rate = caster:GetTalentValue("modifier_kunkka_ship_7", "turn_rate", true),
			r7_turn_rate_min = caster:GetTalentValue("modifier_kunkka_ship_7", "turn_rate_min", true),
			r7_spawn_distance = caster:GetTalentValue("modifier_kunkka_ship_7", "spawn_distance", true),
			r7_pickup = caster:GetTalentValue("modifier_kunkka_ship_7", "pickup", true),
			r7_hit_radius = caster:GetTalentValue("modifier_kunkka_ship_7", "hit_radius", true),
			r7_push = caster:GetTalentValue("modifier_kunkka_ship_7", "push", true),
			r7_push_duration = caster:GetTalentValue("modifier_kunkka_ship_7", "push_duration", true),
			r7_push_cd = caster:GetTalentValue("modifier_kunkka_ship_7", "push_cd", true),

			has_h6 = 0,
			h6_bkb = caster:GetTalentValue("modifier_kunkka_hero_6", "bkb", true),
			h6_speed = caster:GetTalentValue("modifier_kunkka_hero_6", "speed", true),
			h6_duration_legendary = caster:GetTalentValue("modifier_kunkka_hero_6", "duration_legendary", true),
		}
	end

	if caster:HasTalent("modifier_kunkka_ship_1") then
		self.talents.has_r1 = 1
		self.talents.r1_magic = caster:GetTalentValue("modifier_kunkka_ship_1", "magic")
		self.talents.r1_damage = caster:GetTalentValue("modifier_kunkka_ship_1", "damage")
		self.talents.r1_health = caster:GetTalentValue("modifier_kunkka_ship_1", "health") / 100
	end

	if caster:HasTalent("modifier_kunkka_ship_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_kunkka_ship_2", "cd")
		self.talents.r2_stun = caster:GetTalentValue("modifier_kunkka_ship_2", "stun")
	end

	if caster:HasTalent("modifier_kunkka_ship_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_kunkka_ship_3", "damage") / 100
		self.talents.r3_lifesteal = caster:GetTalentValue("modifier_kunkka_ship_3", "lifesteal") / 100
		caster:AddDamageEvent_out(self.tracker, true)
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_kunkka_ship_3", type = 1, value = self.talents.r3_lifesteal }
		)

		if IsServer() then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_kunkka_tidebringer_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_kunkka_ship_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_kunkka_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_kunkka_torrent_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_kunkka_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_kunkka_ship_7") then
		self.talents.has_r7 = 1
	end
end

function kunkka_ghostship_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_kunkka_ghostship_custom_tracker"
end

function kunkka_ghostship_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_kunkka_ghostship_custom_scepter") then
		return "kunkka_shard"
	end
	if self.caster:HasModifier("modifier_kunkka_ghostship_custom_legendary_sail") then
		return "stop_icons/kunkka_ghostship"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "kunkka_ghostship", self)
end

function kunkka_ghostship_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_kunkka_ghostship_custom_legendary_sail") then
		return 0
	end
	if self.caster:HasModifier("modifier_kunkka_ghostship_custom_scepter") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function kunkka_ghostship_custom:GetBehavior()
	if self.caster:HasModifier("modifier_kunkka_ghostship_custom_legendary_sail") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
			+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	if self.caster:HasModifier("modifier_kunkka_ghostship_custom_scepter") then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING + DOTA_ABILITY_BEHAVIOR_AOE
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE + DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
end

function kunkka_ghostship_custom:GetCastRange(vLocation, hTarget)
	if self.caster:HasModifier("modifier_kunkka_ghostship_custom_scepter") then
		return IsClient() and (self.scepter_range_max or 0) - self.caster:GetCastRangeBonus() or 999999
	end
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
end

function kunkka_ghostship_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel)
		+ (self.talents.has_r7 == 1 and self.talents.r7_cd or 0)
		+ (self.talents.r2_cd or 0)
end

function kunkka_ghostship_custom:GetDamage()
	return (self.damage or 0)
		+ (
			self.talents.has_r1 == 1
				and (self.talents.r1_damage + self.caster:GetMaxHealth() * self.talents.r1_health)
			or 0
		)
end

function kunkka_ghostship_custom:GetRadius()
	return (self.ghostship_width or 0) + (self.talents.has_h4 == 1 and self.talents.h4_radius or 0)
end

function kunkka_ghostship_custom:GetAOERadius()
	return self:GetRadius()
end

function kunkka_ghostship_custom:OnSpellStart()
	local sail = self.caster:FindModifierByName("modifier_kunkka_ghostship_custom_legendary_sail")
	if sail then
		sail:Destroy()
		return
	end

	local point = self.caster:CastPosition(self:GetCursorPosition())

	local scepter = self.caster:FindModifierByName("modifier_kunkka_ghostship_custom_scepter")
	if scepter then
		scepter:Destroy()
		self:Launch(point, true)
		return
	end

	if self.talents.has_r7 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_kunkka_ghostship_custom_legendary_sail",
			{
				duration = self.talents.r7_duration
					+ (self.talents.has_h6 == 1 and self.talents.h6_duration_legendary or 0),
				x = point.x,
				y = point.y,
			}
		)
		return
	end

	self:Launch(point)
end

function kunkka_ghostship_custom:OnProjectileHit_ExtraData(target, location, data)
	if not IsServer() then
		return
	end
	if target then
		if data.scepter == 1 or not target:IsRealHero() then
			return
		end
		self:ApplyRum(target)
		return
	end

	if data.thinker then
		local thinker = EntIndexToHScript(data.thinker)
		if not IsValid(thinker) then
			return
		end
		thinker:RemoveModifierByName("modifier_kunkka_ghostship_custom_thinker")
	end
end

function kunkka_ghostship_custom:OnProjectileThink_ExtraData(location, data)
	if not IsServer() then
		return
	end

	if data.thinker then
		local thinker = EntIndexToHScript(data.thinker)
		if not IsValid(thinker) then
			return
		end
		thinker:SetAbsOrigin(GetGroundPosition(location, nil))
	end
end

function kunkka_ghostship_custom:Bank(params)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r3 == 0 then
		return
	end
	if not params.inflictor then
		return
	end
	if not params.unit:IsRealHero() then
		return
	end
	if params.unit:GetTeamNumber() == self.caster:GetTeamNumber() then
		return
	end
	if params.inflictor == self and not params.allow then
		return
	end
	if params.unit:HasCd("kunkka_ship_3", self.talents.r3_cd) then
		return
	end

	params.unit:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_ghostship_custom_bank",
		{ duration = self.talents.r3_duration, damage = params.original_damage }
	)
end

function kunkka_ghostship_custom:ApplyRum(target)
	if not IsServer() then
		return
	end

	if IsValid(self.caster.kunkka_innate) then
		self.caster.kunkka_innate:ApplyEffect(target, 0, true)
	end

	if self.talents.has_h6 == 0 then
		return
	end
	if target ~= self.caster then
		return
	end

	target:Purge(false, true, false, true, true)
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_generic_debuff_immune",
		{ duration = self.talents.h6_bkb, effect = 2, sound = 1 }
	)

	if self.talents.has_r7 == 1 then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_ghostship_custom_speed",
		{ duration = self.talents.h6_bkb }
	)
end

function kunkka_ghostship_custom:ApplyHealDelay(target)
	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, true),
		"modifier_kunkka_ghostship_custom_delay",
		{ duration = self.scepter_delay, heal_duration = self.scepter_duration }
	)
end

function kunkka_ghostship_custom:Crash(point, scepter)
	if not IsServer() then
		return
	end

	EmitSoundOnLocationWithCaster(
		point,
		wearables_system:GetSoundReplacement(self.caster, "Ability.Ghostship.crash", self),
		self.caster
	)

	if IsValid(self.caster.torrent_ability) and not scepter then
		self.caster.torrent_ability:CreateTrail(point, true)
	end

	local damageTable = { attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL }
	local stun = scepter and self.scepter_stun or (self.stun_duration + self.talents.r2_stun)
	local damage_k = scepter and self.scepter_damage or 1
	local proc = false

	for _, target in pairs(self.caster:FindTargets(self:GetRadius(), point)) do
		proc = true
		local stun_duration = (1 - target:GetStatusResistance()) * stun

		if not scepter then
			if self.talents.has_r1 == 1 and self.talents.has_r7 == 0 then
				target:AddNewModifier(
					self.caster,
					self,
					"modifier_kunkka_ghostship_custom_magic",
					{ duration = self.talents.r1_duration }
				)
			end

			if IsValid(self.caster.kunkka_innate) then
				self.caster.kunkka_innate:ApplyHealReduce(target)
			end

			if self.caster:HasScepter() then
				self:ApplyHealDelay(target)
			end

			if self.talents.has_h4 == 1 then
				local silence = (1 - target:GetStatusResistance()) * self.talents.h4_silence
				Timers:CreateTimer(stun_duration, function()
					if not IsValid(target, self.caster) then
						return
					end
					target:AddNewModifier(
						self.caster,
						self,
						"modifier_generic_silence",
						{ duration = silence, use_sound = 1 }
					)
				end)
			end

			if IsValid(self.caster.xmark_ability) then
				self.caster.xmark_ability:SpellAttack(target)
			end
		end

		local damage = self:GetDamage(target) * damage_k

		damageTable.victim = target
		damageTable.damage = damage

		if target:IsRealHero() and self.caster:GetQuest() == "Kunkka.Quest_8" then
			target:StartCd("kunkka_quest_8")
		end

		DoDamage(damageTable)

		if target:IsRealHero() and not scepter then
			self.caster:AddNewModifier(self.caster, self, "modifier_kunkka_ghostship_custom_perma", {})

			self:Bank({ unit = target, inflictor = self, original_damage = damage, allow = true })

			local bank = target:FindModifierByName("modifier_kunkka_ghostship_custom_bank")
			if bank then
				bank:Payout()
			end
		end

		target:AddNewModifier(
			self.caster,
			self.caster:BkbAbility(self, self.caster:HasScepter()),
			"modifier_stunned",
			{ duration = stun_duration }
		)
	end

	if proc and self.talents.has_q4 == 1 and not scepter then
		self.caster:CdItems(self.talents.q4_cd_items_ship, "modifier_kunkka_torrent_4")
	end

	if scepter then
		return
	end
	self:StartCd()

	if not self.caster:HasScepter() then
		return
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_ghostship_custom_scepter",
		{ duration = self.scepter_window }
	)
end

function kunkka_ghostship_custom:Launch(point, scepter)
	if not IsServer() then
		return
	end

	local origin = self.caster:GetAbsOrigin()

	local dir = point - origin
	dir.z = 0
	dir = dir:Normalized()

	local range = self.ghostship_distance
	local time = range / self.ghostship_speed
	local start_point, crash

	if scepter then
		local distance = math.min(math.max((point - origin):Length2D(), self.scepter_range_min), self.scepter_range_max)
		range = distance + self.scepter_spawn
		time = range / self.scepter_speed
		start_point = origin - dir * self.scepter_spawn
		crash = start_point + dir * range
	else
		time = time + (self.talents.has_r4 == 1 and self.talents.r4_delay or 0)

		if IsValid(self.caster.xmark_ability) then
			time = time * (1 - (self.caster.xmark_ability:SpellDelay() or 0))
		end

		time = math.max(0.1, time)
		start_point = point - dir * range
		crash = point

		self:EndCd()
	end

	local speed = range / time
	local width = self:GetRadius()

	local thinker = CreateModifierThinker(
		self.caster,
		self,
		"modifier_kunkka_ghostship_custom_thinker",
		{ duration = time, x = crash.x, y = crash.y, scepter = scepter and 1 or 0 },
		start_point,
		self.caster:GetTeamNumber(),
		false
	)

	if scepter then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_kunkka_ghostship_custom_scepter_ride",
			{ duration = time, thinker = thinker:entindex(), x = dir.x, y = dir.y }
		)
	end

	local effect = {
		EffectName = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_kunkka/kunkka_ghost_ship.vpcf",
			self
		),
		Ability = self,
		Source = self.caster,
		vSpawnOrigin = start_point,
		fStartRadius = width,
		fEndRadius = width,
		vVelocity = dir * speed,
		fDistance = range,
		iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		iUnitTargetType = DOTA_UNIT_TARGET_HERO,
		iUnitTargetFlags = DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
		bProvidesVision = true,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		iVisionRadius = width * 2,
		ExtraData = {
			thinker = thinker:entindex(),
			scepter = scepter and 1 or 0,
		},
	}

	ProjectileManager:CreateLinearProjectile(effect)
end

modifier_kunkka_ghostship_custom_thinker = class(mod_hidden)
function modifier_kunkka_ghostship_custom_thinker:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.scepter = table.scepter == 1

	self.width = self.ability:GetRadius()

	self.particle = ParticleManager:CreateParticleForTeam(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_kunkka/kunkka_ghostship_marker.vpcf",
			self.ability
		),
		PATTACH_WORLDORIGIN,
		nil,
		self.caster:GetTeamNumber()
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.point)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.width, self.width, self.width))
	self:AddParticle(self.particle, false, false, -1, false, false)

	AddFOWViewer(self.caster:GetTeamNumber(), self.point, self.width, self:GetRemainingTime(), false)

	EmitSoundOnLocationForAllies(
		self.point,
		wearables_system:GetSoundReplacement(self.caster, "Ability.Ghostship.bell", self.ability),
		self.caster
	)
	EmitSoundOn("Kunkka.Ghostship_proj", self.parent)

	self.step = self.ability.talents.q7_step
	self.trail = self.parent:GetAbsOrigin()
	self:StartIntervalThink(0.1)
end

function modifier_kunkka_ghostship_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.scepter then
		return
	end

	local point = self.parent:GetAbsOrigin()

	if self.caster:HasScepter() then
		for _, target in pairs(self.caster:FindTargets(self.width, point)) do
			self.ability:ApplyHealDelay(target)
		end
	end

	if not IsValid(self.caster.torrent_ability) then
		return
	end
	if (point - self.trail):Length2D() < self.step then
		return
	end

	self.trail = point
	self.caster.torrent_ability:CreateTrail(point)
end

function modifier_kunkka_ghostship_custom_thinker:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
	}
end

function modifier_kunkka_ghostship_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	StopSoundOn("Kunkka.Ghostship_proj", self.parent)

	if self.scepter then
		local ride = self.caster:FindModifierByName("modifier_kunkka_ghostship_custom_scepter_ride")
		if ride then
			ride:Destroy()
		end
	end

	self.ability:Crash(self.point, self.scepter)

	UTIL_Remove(self.parent)
end

modifier_kunkka_ghostship_custom_scepter = class(mod_visible)
function modifier_kunkka_ghostship_custom_scepter:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true

	self.ability:EndCd(self.ability.scepter_cd)
end

function modifier_kunkka_ghostship_custom_scepter:OnDestroy()
	if not IsServer() then
		return
	end

	local elapsed = self:GetElapsedTime()

	self.ability:StartCd()
	self.parent:CdAbility(self.ability, elapsed, nil, "Scepter")
end

modifier_kunkka_ghostship_custom_scepter_ride = class(mod_hidden)
function modifier_kunkka_ghostship_custom_scepter_ride:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.thinker = EntIndexToHScript(table.thinker)

	if not IsValid(self.thinker) then
		self:Destroy()
		return
	end

	self.parent:Stop()
	self.parent:SetForwardVector(Vector(table.x, table.y, 0))
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_4)

	self.parent:SetParent(self.thinker, "")
	self.parent:SetLocalOrigin(Vector(0, 0, self.ability.scepter_height))
end

function modifier_kunkka_ghostship_custom_scepter_ride:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_TETHERED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_ALLOW_PATHING_THROUGH_TREES] = true,
		[MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED] = true,
	}
end

function modifier_kunkka_ghostship_custom_scepter_ride:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_kunkka_ghostship_custom_scepter_ride:GetModifierDisableTurning()
	return 1
end

function modifier_kunkka_ghostship_custom_scepter_ride:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:SetParent(nil, nil)
	FindClearSpaceForUnit(self.parent, GetGroundPosition(self.parent:GetAbsOrigin(), self.parent), true)
end

modifier_kunkka_ghostship_custom_speed = class(mod_visible)
function modifier_kunkka_ghostship_custom_speed:GetTexture()
	return "buffs/kunkka/hero_6"
end
function modifier_kunkka_ghostship_custom_speed:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/econ/events/ti7/phase_boots_ti7.vpcf", self)
end

function modifier_kunkka_ghostship_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
	}
end

function modifier_kunkka_ghostship_custom_speed:GetModifierMoveSpeed_Absolute()
	return self.ability.talents.h6_speed
end

modifier_kunkka_ghostship_custom_delay = class(mod_visible)
function modifier_kunkka_ghostship_custom_delay:GetTexture()
	return "kunkka_ghostship"
end
function modifier_kunkka_ghostship_custom_delay:GetStatusEffectName()
	return "particles/status_fx/status_effect_slark_shadow_dance.vpcf"
end
function modifier_kunkka_ghostship_custom_delay:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_kunkka_ghostship_custom_delay:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.heal = 0
	self.pct = 1
	self.heal_duration = table.heal_duration
	self.parent:GenericParticle("particles/kunkka/scepter_effect.vpcf", self)
	self.parent:GenericParticle("particles/kunkka/scepter_heal_reduce.vpcf", self, true)

	self.parent:AddHealEvent_inc(self, true)
end

function modifier_kunkka_ghostship_custom_delay:AddHeal(heal)
	if not IsServer() then
		return
	end
	if heal <= 0 then
		return
	end

	self.heal = self.heal + heal
	self:SetStackCount(self.heal)
end

function modifier_kunkka_ghostship_custom_delay:HealEvent_inc(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end

	self:AddHeal(params.gain * self.pct)

	local heal_back = params.gain * (1 - self.pct)
	if heal_back <= 0 then
		return
	end

	self.parent:SetHealth(math.min(self.parent:GetMaxHealth(), self.parent:GetHealth() + heal_back))
end

function modifier_kunkka_ghostship_custom_delay:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_HEALING,
	}
end

function modifier_kunkka_ghostship_custom_delay:GetDisableHealing()
	return 1
end

function modifier_kunkka_ghostship_custom_delay:OnDestroy()
	if not IsServer() then
		return
	end
	if self.heal <= 0 then
		return
	end

	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_kunkka_ghostship_custom_delay_heal",
		{ heal = self.heal, heal_duration = self.heal_duration }
	)
end

modifier_kunkka_ghostship_custom_delay_heal = class(mod_visible)
function modifier_kunkka_ghostship_custom_delay_heal:GetTexture()
	return "kunkka_ghostship"
end
function modifier_kunkka_ghostship_custom_delay_heal:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.left = 0
	self:SetHasCustomTransmitterData(true)
	self:OnRefresh(table)
	self:StartIntervalThink(1)
end

function modifier_kunkka_ghostship_custom_delay_heal:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.left = self.left + table.heal
	self.ticks = table.heal_duration
	self.heal = self.left / self.ticks

	self:SetStackCount(self.left)
	self:SendBuffRefreshToClients()
end

function modifier_kunkka_ghostship_custom_delay_heal:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.ticks = self.ticks - 1

	local amount = self.ticks > 0 and self.heal or self.left
	self.left = self.left - amount

	if self.parent:IsAlive() then
		self.parent:SetHealth(math.min(self.parent:GetMaxHealth(), self.parent:GetHealth() + amount))
	end

	self:SetStackCount(self.left)

	if self.ticks > 0 then
		return
	end
	self:Destroy()
end

function modifier_kunkka_ghostship_custom_delay_heal:AddCustomTransmitterData()
	return {
		heal = self.heal,
	}
end

function modifier_kunkka_ghostship_custom_delay_heal:HandleCustomTransmitterData(data)
	self.heal = data.heal
end

function modifier_kunkka_ghostship_custom_delay_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_kunkka_ghostship_custom_delay_heal:OnTooltip()
	return self.heal
end

modifier_kunkka_ghostship_custom_legendary_sail = class(mod_hidden)
function modifier_kunkka_ghostship_custom_legendary_sail:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.r7_speed_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.ability:EndCd(self.ability.talents.r7_pickup)

	self.parent:Stop()

	local dir = Vector(table.x, table.y, 0) - self.parent:GetAbsOrigin()
	dir.z = 0

	self.parent:SetForwardVector(dir:Normalized())
	self.parent.flDesiredYaw = self.parent:GetAnglesAsVector().y

	local start = self.parent:GetAbsOrigin() - self.parent:GetForwardVector() * self.ability.talents.r7_spawn_distance

	self.ship = CreateUnitByName(
		"npc_kunkka_ship_custom",
		GetGroundPosition(start, nil),
		false,
		nil,
		nil,
		self.parent:GetTeamNumber()
	)
	self.ship:SetAbsAngles(0, self.parent.flDesiredYaw, 0)
	self.ship:AddNewModifier(self.parent, self.ability, "modifier_kunkka_ghostship_custom_ship_mod", {})

	self.cannon = self.parent.cannon_ability
	if IsValid(self.cannon) then
		self.cannon:SetHidden(false)
	end

	self.parent:AddOrderFilter(self)
	self:StartIntervalThink(self.ability.talents.r7_pickup)
end

function modifier_kunkka_ghostship_custom_legendary_sail:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self:GetStackCount() == 1 then
		local left = self:GetRemainingTime()
		self.parent:UpdateUIshort({
			time = left,
			max_time = self:GetDuration(),
			stack = left,
			use_zero = 1,
			glow = 1,
			style = "KunkkaShip",
			priority = 3,
		})
		self:StartIntervalThink(0.1)
		return
	end

	if not IsValid(self.ship) then
		self:Destroy()
		return
	end

	self.parent:SetParent(self.ship, "center")
	self.parent:SetLocalOrigin(Vector(0, 0, 0))
	self.parent:SetLocalAngles(0, 0, 0)
	self:SetStackCount(1)

	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_1)
	self.ability:ApplyRum(self.parent)

	self:OnIntervalThink()
end

function modifier_kunkka_ghostship_custom_legendary_sail:OrderFilter(params)
	if not params.move then
		return
	end
	if params.teleport then
		return
	end

	local point = params.pos
	if IsValid(params.target) then
		point = params.target:GetAbsOrigin()
	end

	local dir = point - self.parent:GetOrigin()
	dir.z = 0

	self.parent.flDesiredYaw = VectorAngles(dir:Normalized()).y
	return false
end

function modifier_kunkka_ghostship_custom_legendary_sail:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "KunkkaShip", priority = 3 })
	self.ability:Crash(IsValid(self.ship) and self.ship:GetAbsOrigin() or self.parent:GetAbsOrigin())

	if IsValid(self.cannon) then
		self.cannon:SetHidden(true)
	end

	local mod = IsValid(self.ship) and self.ship:FindModifierByName("modifier_kunkka_ghostship_custom_ship_mod") or nil

	self.parent:SetParent(nil, nil)
	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), true)

	if IsValid(mod) then
		self.parent:FacePoint(self.parent:GetAbsOrigin() + mod:GetForward())
	end

	self.parent.flDesiredYaw = self.parent:GetAnglesAsVector().y

	if not IsValid(mod) then
		return
	end
	mod:EndSail()
end

function modifier_kunkka_ghostship_custom_legendary_sail:TeleportShip(point)
	if not IsServer() then
		return
	end
	if not IsValid(self.ship) then
		return
	end

	local mod = self.ship:FindModifierByName("modifier_kunkka_ghostship_custom_ship_mod")
	if not IsValid(mod) then
		return
	end

	mod.position = GetGroundPosition(point, nil)
	self.ship:SetOrigin(mod.position)
end

function modifier_kunkka_ghostship_custom_legendary_sail:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_ALLOW_PATHING_THROUGH_TREES] = true,
		[MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_TETHERED] = true,
	}
end

function modifier_kunkka_ghostship_custom_legendary_sail:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_kunkka_ghostship_custom_legendary_sail:GetModifierModelScale()
	if self:GetStackCount() == 0 then
		return
	end
	return -50
end

function modifier_kunkka_ghostship_custom_legendary_sail:GetModifierDisableTurning()
	return 1
end

function modifier_kunkka_ghostship_custom_legendary_sail:GetModifierIgnoreCastAngle()
	return 1
end

function modifier_kunkka_ghostship_custom_legendary_sail:GetModifierMoveSpeed_Absolute()
	if IsServer() then
		return 0.1
	end
	return self.speed
end

modifier_kunkka_ghostship_custom_ship_mod = class(mod_hidden)
function modifier_kunkka_ghostship_custom_ship_mod:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.r7_speed
	self.speed_max = self.ability.talents.r7_speed_max
	self.accel = self.ability.talents.r7_accel
	self.decel = self.ability.talents.r7_decel
	self.turn_rate = self.ability.talents.r7_turn_rate
	self.turn_rate_min = self.ability.talents.r7_turn_rate_min
	self.pickup = self.ability.talents.r7_pickup
	self.die_time = 2
	self.sink = 120
	self.hit_radius = self.ability.talents.r7_hit_radius
	self.bound = 8500

	self.current_speed = self.speed
	self.timer = 0
	self.yaw = self.parent:GetAnglesAsVector().y
	self.turn_speed = 0
	self.position = self.parent:GetAbsOrigin()

	local particle_ship = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_kunkka/kunkka_ghost_ship.vpcf",
		self.ability
	)
	if particle_ship == "particles/econ/items/kunkka/kunkka_immortal/kunkka_immortal_ghost_ship.vpcf" then
		self.parent:SetOriginalModel("models/kunkka/shark_ship.vmdl")
		self.shark = true
		self.die_time = 1.5
	end

	EmitSoundOnLocationForAllies(
		self.parent:GetAbsOrigin(),
		wearables_system:GetSoundReplacement(self.caster, "Ability.Ghostship.bell", self.ability),
		self.caster
	)
	EmitSoundOn("Kunkka.Ghostship_proj", self.parent)
	EmitSoundOn("Kunkka.Ghostship_legendary_loop", self.parent)
	EmitSoundOn("Kunkka.Ghostship_legendary_loop2", self.parent)
	EmitSoundOn("Kunkka.Ghostship_legendary_loop3", self.parent)

	self.effect =
		ParticleManager:CreateParticle("particles/kunkka/ship_legenday.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.effect, 0, self.parent:GetAbsOrigin())
	self:AddParticle(self.effect, false, false, -1, false, false)

	if self:ApplyHorizontalMotionController() == false or self:ApplyVerticalMotionController() == false then
		self:Destroy()
	end
end

function modifier_kunkka_ghostship_custom_ship_mod:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_kunkka_ghostship_custom_ship_mod:GetModifierModelScale()
	return 50
end

function modifier_kunkka_ghostship_custom_ship_mod:EndSail()
	if not IsServer() then
		return
	end

	StopSoundOn("Kunkka.Ghostship_proj", self.parent)
	StopSoundOn("Kunkka.Ghostship_legendary_loop", self.parent)
	StopSoundOn("Kunkka.Ghostship_legendary_loop2", self.parent)
	StopSoundOn("Kunkka.Ghostship_legendary_loop3", self.parent)
	self.parent:StopSound("Kunkka.Ghostship_legendary_wave")

	self.ended = true
	self.parent:RemoveGesture(ACT_DOTA_IDLE)

	ParticleManager:DestroyParticle(self.effect, false)

	local width = self.ability:GetRadius()
	local marker = ParticleManager:CreateParticleForTeam(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_kunkka/kunkka_ghostship_marker.vpcf",
			self.ability
		),
		PATTACH_WORLDORIGIN,
		nil,
		self.caster:GetTeamNumber()
	)
	ParticleManager:SetParticleControl(marker, 0, self.position)
	ParticleManager:SetParticleControl(marker, 1, Vector(width, width, width))
	self:AddParticle(marker, false, false, -1, false, false)

	self.parent:AddNewModifier(self.caster, self.ability, "modifier_kunkka_ghostship_custom_ship_mod_end", {})

	self:StartIntervalThink(self.die_time)
end

function modifier_kunkka_ghostship_custom_ship_mod:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.sinking and not self.shark then
		self.sinking = true
		self:StartIntervalThink(1)
		return
	end

	self:Destroy()
end

function modifier_kunkka_ghostship_custom_ship_mod:OnDestroy()
	if not IsServer() then
		return
	end
	UTIL_Remove(self.parent)
end

function modifier_kunkka_ghostship_custom_ship_mod:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end

	if not IsValid(self.caster) or not self.caster:IsAlive() then
		self:Destroy()
		return
	end

	if self:GetElapsedTime() > 2 and self.caster:CheckCd("kunkka_ship_sound", 2.5) then
		self.parent:EmitSound("Kunkka.Ghostship_legendary_wave")
	end

	self.timer = self.timer + dt

	if self.timer < self.pickup then
		local dir = self.caster:GetAbsOrigin() - self.position
		dir.z = 0

		self.position = GetGroundPosition(self.position + dir * math.min(1, dt / (self.pickup - self.timer)), nil)
		me:SetOrigin(self.position)

		if dir:Length2D() > 1 then
			self.yaw = VectorAngles(dir:Normalized()).y
			me:SetAbsAngles(0, self.yaw, 0)
		end

		return
	end

	local speed_k = math.max(0, math.min(1, (self.current_speed - self.speed) / (self.speed_max - self.speed)))
	local turn_rate = self.turn_rate - (self.turn_rate - self.turn_rate_min) * speed_k

	local diff = AngleDiff(self.caster.flDesiredYaw, self.yaw) or 0
	local turn = 0

	if diff ~= 0 then
		turn = math.min(dt * turn_rate, math.abs(diff))
		if diff < 0 then
			turn = turn * -1
		end

		self.yaw = self.yaw + turn
		me:SetAbsAngles(0, self.yaw, 0)
	end

	self.turn_speed = turn / dt

	local target = self.speed_max - (self.speed_max - self.speed) * math.abs(turn) / (dt * turn_rate)

	if self.current_speed < target then
		self.current_speed = math.min(target, self.current_speed + self.accel * dt)
	else
		self.current_speed = math.max(target, self.current_speed - self.decel * dt)
	end

	local forward = self:GetForward()
	local next_position = GetGroundPosition(self.position + forward * dt * self.current_speed, nil)

	if math.abs(next_position.x) > self.bound or math.abs(next_position.y) > self.bound then
		self:Crash()
		return
	end

	self.position = next_position
	me:SetOrigin(self.position)

	ParticleManager:SetParticleControlForward(self.effect, 0, forward * -1)

	self.caster:SetLocalOrigin(Vector(0, 0, 0))
	self.caster:SetLocalAngles(0, 0, 0)

	self:Collide(forward)
end

function modifier_kunkka_ghostship_custom_ship_mod:Crash()
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end
	if self.timer < self.pickup then
		return
	end
	if not self.parent:CheckCd("kunkka_ship_crash", 1) then
		return
	end

	self.yaw = self.yaw + 180
	self.turn_speed = 0
	self.current_speed = self.speed

	self.parent:SetAbsAngles(0, self.yaw, 0)
	self.caster.flDesiredYaw = self.parent:GetAnglesAsVector().y
	self.parent:EmitSound("UI.Walls_hit")
end

function modifier_kunkka_ghostship_custom_ship_mod:GetForward(lead)
	local yaw = math.rad(self.yaw + (lead and self.turn_speed * lead or 0))
	return Vector(math.cos(yaw), math.sin(yaw), 0)
end

function modifier_kunkka_ghostship_custom_ship_mod:Collide(forward)
	if not IsServer() then
		return
	end

	local right = Vector(forward.y, -forward.x, 0)

	for _, target in pairs(self.caster:FindTargets(self.hit_radius, self.position)) do
		if target:CheckCd("kunkka_r7_push", self.ability.talents.r7_push_cd) then
			local offset = target:GetAbsOrigin() - self.position
			local side = offset:Dot(right) < 0 and -1 or 1
			local dir = (right * side + forward * 0.3):Normalized()
			target:EmitSound("Kunkka.Ghostship_legendary_collide")

			local effect = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_tidehunter/tidehunter_gush_splash_mid.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				target
			)
			ParticleManager:SetParticleControl(effect, 3, target:GetAbsOrigin())
			ParticleManager:ReleaseParticleIndex(effect)

			target:AddNewModifier(self.caster, self.ability, "modifier_generic_knockback", {
				duration = self.ability.talents.r7_push_duration,
				distance = self.ability.talents.r7_push,
				height = 0,
				direction_x = dir.x,
				direction_y = dir.y,
				IsStun = 0,
				IsFlail = 1,
			})
		end
	end
end

function modifier_kunkka_ghostship_custom_ship_mod:UpdateVerticalMotion(me, dt)
	if not IsServer() then
		return
	end

	if not self.ended then
		me:SetOrigin(self.position)
		return
	end

	if not self.sinking then
		return
	end

	self.position.z = self.position.z - self.sink * dt
	me:SetOrigin(self.position)
end

function modifier_kunkka_ghostship_custom_ship_mod:OnHorizontalMotionInterrupted()
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_kunkka_ghostship_custom_ship_mod:OnVerticalMotionInterrupted()
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end

	if self:ApplyVerticalMotionController() == false then
		self:Destroy()
	end
end

function modifier_kunkka_ghostship_custom_ship_mod:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_ATTACK_IMMUNE] = true,
		[MODIFIER_STATE_MAGIC_IMMUNE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
	}
end

modifier_kunkka_ghostship_custom_ship_mod_end = class(mod_hidden)
function modifier_kunkka_ghostship_custom_ship_mod_end:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_kunkka_ghostship_custom_ship_mod_end:GetOverrideAnimation()
	return ACT_DOTA_TORRENT
end

modifier_kunkka_ghostship_custom_tracker = class(mod_hidden)
function modifier_kunkka_ghostship_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.ghostship_ability = self.ability
	self.parent.cannon_ability = self.parent:FindAbilityByName("kunkka_cannon_custom")

	if IsValid(self.parent.cannon_ability) then
		if IsServer() and not self.parent.cannon_ability:IsTrained() then
			self.parent.cannon_ability:SetLevel(1)
		end
		self.parent.cannon_ability:UpdateTalents()
	end

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.tooltip_delay = self.ability:GetSpecialValueFor("tooltip_delay")
	self.ability.ghostship_distance = self.ability:GetSpecialValueFor("ghostship_distance")
	self.ability.ghostship_width = self.ability:GetSpecialValueFor("ghostship_width")
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
	self.ability.ghostship_speed = self.ability:GetSpecialValueFor("ghostship_speed")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.scepter_damage = self.ability:GetSpecialValueFor("scepter_damage") / 100
	self.ability.scepter_stun = self.ability:GetSpecialValueFor("scepter_stun")
	self.ability.scepter_range_min = self.ability:GetSpecialValueFor("scepter_range_min")
	self.ability.scepter_range_max = self.ability:GetSpecialValueFor("scepter_range_max")
	self.ability.scepter_speed = self.ability:GetSpecialValueFor("scepter_speed")
	self.ability.scepter_spawn = self.ability:GetSpecialValueFor("scepter_spawn")
	self.ability.scepter_window = self.ability:GetSpecialValueFor("scepter_window")
	self.ability.scepter_cd = self.ability:GetSpecialValueFor("scepter_cd")
	self.ability.scepter_delay = self.ability:GetSpecialValueFor("scepter_delay")
	self.ability.scepter_duration = self.ability:GetSpecialValueFor("scepter_duration")
	self.ability.scepter_height = self.ability:GetSpecialValueFor("scepter_height")
end

function modifier_kunkka_ghostship_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
end

function modifier_kunkka_ghostship_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	self.ability:Bank(params)
end

function modifier_kunkka_ghostship_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r3 == 0 then
		return
	end
	if self.ability.talents.has_w7 == 1 then
		return
	end

	local stack = 0
	local show = 0
	local mod = self.ability.bank_mod

	if IsValid(mod) then
		stack = mod.count
		show = 1
	end

	self.parent:UpdateUIlong({ max = 1, stack = show, override_stack = stack, style = "KunkkaShipDamage" })
end

modifier_kunkka_ghostship_custom_magic = class(mod_visible)
function modifier_kunkka_ghostship_custom_magic:GetTexture()
	return "buffs/kunkka/ship_1"
end
function modifier_kunkka_ghostship_custom_magic:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.magic = self.ability.talents.r1_magic

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_kunkka_ghostship_custom_magic:OnRefresh()
	self.magic = self.ability.talents.r1_magic
end

function modifier_kunkka_ghostship_custom_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_kunkka_ghostship_custom_magic:GetModifierMagicalResistanceBonus()
	return self.magic
end

modifier_kunkka_ghostship_custom_bank = class(mod_hidden)
function modifier_kunkka_ghostship_custom_bank:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.count = 0
	self.RemoveForDuel = true

	if not IsValid(self.ability.bank_mod) then
		self.ability.bank_mod = self
	end

	self:AddStack(table.damage)
end

function modifier_kunkka_ghostship_custom_bank:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack(table.damage)
end

function modifier_kunkka_ghostship_custom_bank:AddStack(damage)
	if not IsServer() then
		return
	end

	self.count = math.min(
		self.parent:GetMaxHealth() * self.ability.talents.r3_damage_max,
		math.floor(self.count + damage * self.ability.talents.r3_damage)
	)

	if self.ability.bank_mod == self then
		self.ability.tracker:UpdateUI()
	end
end

function modifier_kunkka_ghostship_custom_bank:Payout()
	if not IsServer() then
		return
	end
	self:StartIntervalThink(self.ability.talents.r3_delay)
end

function modifier_kunkka_ghostship_custom_bank:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:StartIntervalThink(-1)

	self.parent:EmitSound("Hero_Kunkka.GhostShip.Destroy")
	self.parent:StartCd("kunkka_ship_3", self.ability.talents.r3_cd)

	local real_damage = DoDamage(
		{
			victim = self.parent,
			attacker = self.caster,
			ability = self.ability,
			damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
			damage_type = self.ability.talents.r3_damage_type,
			damage = self.count,
		},
		"modifier_kunkka_ship_3"
	)
	self.parent:SendNumber(111, real_damage)

	self.parent:EmitSound("Kunkka.Ship_delayed_damage")

	local effect = ParticleManager:CreateParticle(
		"particles/puck/puck_silence_damage.vpcf",
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

	self.particle =
		ParticleManager:CreateParticle("particles/kunkka/ship_delayed_damage.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle, 1, Vector(250, 0, 0))
	ParticleManager:ReleaseParticleIndex(self.particle)

	self:Destroy()
end

function modifier_kunkka_ghostship_custom_bank:OnDestroy()
	if not IsServer() then
		return
	end
	if self.ability.bank_mod ~= self then
		return
	end

	self.ability.bank_mod = nil
	self.ability.tracker:UpdateUI()
end

modifier_kunkka_ghostship_custom_perma = class({})
function modifier_kunkka_ghostship_custom_perma:IsHidden()
	return self.ability.talents.has_r4 == 0 or self:GetStackCount() >= self.ability.talents.r4_max
end
function modifier_kunkka_ghostship_custom_perma:IsPurgable()
	return false
end
function modifier_kunkka_ghostship_custom_perma:RemoveOnDeath()
	return false
end
function modifier_kunkka_ghostship_custom_perma:GetTexture()
	return "buffs/kunkka/ship_4"
end
function modifier_kunkka_ghostship_custom_perma:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r4_max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
	self:OnRefresh()
end

function modifier_kunkka_ghostship_custom_perma:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_kunkka_ghostship_custom_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/crystal_maiden/maiden_shield_active.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_kunkka_ghostship_custom_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_kunkka_ghostship_custom_perma:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return (self.ability.talents.r4_spell / self.max) * self:GetStackCount()
end

function modifier_kunkka_ghostship_custom_perma:GetModifierExtraHealthPercentage()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return (self.ability.talents.r4_health / self.max) * self:GetStackCount()
end

kunkka_cannon_custom = class({})
kunkka_cannon_custom.talents = {}
kunkka_cannon_custom.volley_max = 5

function kunkka_cannon_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_cannon_damage = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_damage", true) / 100,
			r7_cannon_speed = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_speed", true),
			r7_cannon_radius = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_radius", true),
			r7_cannon_distance = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_distance", true),
			r7_cannon_aoe = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_aoe", true),
			r7_cannon_stun = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_stun", true),
			r7_cannon_magic = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_magic", true),
			r7_cannon_debuff = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_debuff", true),
			r7_cannon_max = caster:GetTalentValue("modifier_kunkka_ship_7", "cannon_max", true),
			r7_talent_cd = caster:GetTalentValue("modifier_kunkka_ship_7", "talent_cd", true),

			has_q7 = 0,

			q2_range = 0,

			r1_magic_legendary = 0,

			has_r4 = 0,
			r4_cannon_cd = caster:GetTalentValue("modifier_kunkka_ship_4", "cannon_cd", true),
		}

		self.volley = 0
		self.hit = {}
	end

	if caster:HasTalent("modifier_kunkka_torrent_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_kunkka_torrent_2") then
		self.talents.q2_range = caster:GetTalentValue("modifier_kunkka_torrent_2", "range")
	end

	if caster:HasTalent("modifier_kunkka_ship_1") then
		self.talents.r1_magic_legendary = caster:GetTalentValue("modifier_kunkka_ship_1", "magic_legendary")
	end

	if caster:HasTalent("modifier_kunkka_ship_4") then
		self.talents.has_r4 = 1
	end
end

function kunkka_cannon_custom:GetCastPoint()
	return 0
end

function kunkka_cannon_custom:GetCooldown(iLevel)
	return math.max(
		0.1,
		(self.talents.r7_talent_cd or 0) + (self.talents.has_r4 == 1 and self.talents.r4_cannon_cd or 0)
	)
end

function kunkka_cannon_custom:GetDamage(target)
	if not IsValid(self.caster.ghostship_ability) then
		return 0
	end
	return self.caster.ghostship_ability:GetDamage()
		* self.talents.r7_cannon_damage
		* (target and self.caster.ghostship_ability:GetCreepsMult(target) or 1)
end

function kunkka_cannon_custom:OnSpellStart()
	if not IsServer() then
		return
	end

	local mod = self:GetShipMod()
	if not IsValid(mod) then
		return
	end

	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_4, 1.2)

	local ship = mod:GetParent()

	self.volley = self.volley % self.volley_max + 1
	self.hit[self.volley] = {}

	local volley = self.volley

	local origin = ship:GetAbsOrigin()
	local forward = mod:GetForward(0.2)
	local right = Vector(forward.y, -forward.x, 0)
	local left = right * -1
	local offset = forward * self.talents.r7_cannon_radius

	local shots = {
		{ dir = forward, origin = origin },
		{ dir = left, origin = origin + offset },
		{ dir = left, origin = origin - offset },
		{ dir = right, origin = origin + offset },
		{ dir = right, origin = origin - offset },
	}

	ship:EmitSound("Ability.Ghostship.Cannon.Fire")

	for _, shot in pairs(shots) do
		ProjectileManager:CreateLinearProjectile({
			EffectName = "particles/kunkka/ship_cannonball.vpcf",
			Ability = self,
			Source = self.caster,
			vSpawnOrigin = shot.origin,
			fStartRadius = self.talents.r7_cannon_radius,
			fEndRadius = self.talents.r7_cannon_radius,
			vVelocity = shot.dir * self.talents.r7_cannon_speed,
			fDistance = self.talents.r7_cannon_distance + self.talents.q2_range,
			iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
			iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
			bProvidesVision = false,
			ExtraData = {
				volley = volley,
			},
		})
	end
end

function kunkka_cannon_custom:OnProjectileHit_ExtraData(target, location, data)
	if not IsServer() then
		return
	end
	if not target then
		return true
	end
	if not target:IsUnit() then
		return true
	end

	local hit = self.hit[data.volley]
	if not hit then
		return true
	end
	if hit[target] then
		return false
	end

	local point = target:GetAbsOrigin() + Vector(0, 0, 50)
	AddFOWViewer(self.caster:GetTeamNumber(), point, self.talents.r7_cannon_aoe, 2, false)
	EmitSoundOnLocationWithCaster(point, "Ability.Ghostship.Cannon.Target", self.caster)

	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_kunkka/cannonball_explosion.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect, 0, point)
	ParticleManager:SetParticleControl(effect, 3, point)
	ParticleManager:ReleaseParticleIndex(effect)

	if IsValid(self.caster.torrent_ability) then
		self.caster.torrent_ability:CreateTrail(GetGroundPosition(point, nil))
	end

	local damageTable = { attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL }

	for _, enemy in pairs(self.caster:FindTargets(self.talents.r7_cannon_aoe, point)) do
		if not hit[enemy] then
			hit[enemy] = true
			damageTable.victim = enemy
			damageTable.damage = self:GetDamage(enemy)

			local real_damage = DoDamage(damageTable, "modifier_kunkka_ship_7")
			enemy:SendNumber(111, real_damage)

			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_stunned",
				{ duration = (1 - enemy:GetStatusResistance()) * self.talents.r7_cannon_stun }
			)
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_kunkka_cannon_custom_debuff",
				{ duration = self.talents.r7_cannon_debuff }
			)
		end
	end

	return true
end

function kunkka_cannon_custom:GetShipMod()
	local sail = self.caster:FindModifierByName("modifier_kunkka_ghostship_custom_legendary_sail")
	if not sail or not IsValid(sail.ship) then
		return
	end
	return sail.ship:FindModifierByName("modifier_kunkka_ghostship_custom_ship_mod")
end

modifier_kunkka_cannon_custom_debuff = class(mod_visible)
function modifier_kunkka_cannon_custom_debuff:GetTexture()
	return "kunkka_cannon"
end
function modifier_kunkka_cannon_custom_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.magic = self.ability.talents.r7_cannon_magic + self.ability.talents.r1_magic_legendary
	self.max = self.ability.talents.r7_cannon_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	if self.ability.talents.has_q7 == 0 then
		self.effect = self.parent:GenericParticle("particles/kunkka/ship_stack.vpcf", self, true)
	end

	self:OnRefresh()
end

function modifier_kunkka_cannon_custom_debuff:OnRefresh()
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

function modifier_kunkka_cannon_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_kunkka_cannon_custom_debuff:GetModifierMagicalResistanceBonus()
	return self:GetStackCount() * self.magic
end