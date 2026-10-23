--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_puck_dream_coil",
	"abilities/puck/custom_puck_dream_coil",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_custom_puck_dream_coil_thinker",
	"abilities/puck/custom_puck_dream_coil",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_dream_coil_tracker",
	"abilities/puck/custom_puck_dream_coil",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_dream_coil_speed",
	"abilities/puck/custom_puck_dream_coil",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_coil_1"
)
LinkLuaModifier(
	"modifier_custom_puck_dream_coil_reduce",
	"abilities/puck/custom_puck_dream_coil",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_coil_2"
)
LinkLuaModifier(
	"modifier_custom_puck_dream_coil_legendary",
	"abilities/puck/custom_puck_dream_coil",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_coil_7"
)
LinkLuaModifier(
	"modifier_custom_puck_dream_coil_armor",
	"abilities/puck/custom_puck_dream_coil",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_coil_7"
)

custom_puck_dream_coil = class({})
custom_puck_dream_coil.talents = {}

function custom_puck_dream_coil:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/puck/puck_magic.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_dreamcoil_tether.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_dreamcoil.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/puck/coil_zone.vpcf", context)
	PrecacheResource("particle", "particles/puck/coil_cd.vpcf", context)
	PrecacheResource("particle", "particles/zeus/bolt_disarm.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_burn_hit.vpcf", context)
end

function custom_puck_dream_coil:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_armor = 0,
			r1_armor_creeps = 0,
			r1_speed = 0,
			r1_duration = caster:GetTalentValue("modifier_puck_coil_1", "duration", true),

			has_r2 = 0,
			r2_heal = 0,
			r2_damage_reduce = 0,
			r2_bonus = caster:GetTalentValue("modifier_puck_coil_2", "bonus", true),

			has_r3 = 0,
			r3_crit = 0,
			r3_chance = 0,
			r3_crit_chance = caster:GetTalentValue("modifier_puck_coil_3", "crit_chance", true),
			r3_targets = caster:GetTalentValue("modifier_puck_coil_3", "targets", true),
			r3_damage = caster:GetTalentValue("modifier_puck_coil_3", "damage", true),
			r3_range = caster:GetTalentValue("modifier_puck_coil_3", "range", true),

			has_r4 = 0,
			r4_cd = caster:GetTalentValue("modifier_puck_coil_4", "cd", true) / 100,
			r4_attacks = caster:GetTalentValue("modifier_puck_coil_4", "attacks", true),
			r4_range = caster:GetTalentValue("modifier_puck_coil_4", "range", true),
			r4_vision = caster:GetTalentValue("modifier_puck_coil_4", "vision", true),
			r4_legendary = caster:GetTalentValue("modifier_puck_coil_4", "legendary", true) / 100,

			has_r7 = 0,
			r7_duration = caster:GetTalentValue("modifier_puck_coil_7", "duration", true) / 100,
			r7_cd = caster:GetTalentValue("modifier_puck_coil_7", "cd", true) / 100,
			r7_distance = caster:GetTalentValue("modifier_puck_coil_7", "distance", true),
			r7_distance_max = caster:GetTalentValue("modifier_puck_coil_7", "distance_max", true),
			r7_attacks = caster:GetTalentValue("modifier_puck_coil_7", "attacks", true),
			r7_delay = caster:GetTalentValue("modifier_puck_coil_7", "delay", true),
			r7_radius = caster:GetTalentValue("modifier_puck_coil_7", "radius", true),
			r7_armor_base = caster:GetTalentValue("modifier_puck_coil_7", "armor_base", true),
			r7_armor = caster:GetTalentValue("modifier_puck_coil_7", "armor", true) / 100,
			r7_armor_creeps = caster:GetTalentValue("modifier_puck_coil_7", "armor_creeps", true),
			r7_armor_duration = caster:GetTalentValue("modifier_puck_coil_7", "armor_duration", true),
			r7_mana = caster:GetTalentValue("modifier_puck_coil_7", "mana", true),

			e3_attacks = 0,

			has_e7 = 0,

			has_h6 = 0,
			h6_duration = caster:GetTalentValue("modifier_puck_hero_6", "duration", true),
			h6_radius = caster:GetTalentValue("modifier_puck_hero_6", "radius", true),
			h6_stun = caster:GetTalentValue("modifier_puck_hero_6", "stun", true),
			h6_interval = caster:GetTalentValue("modifier_puck_hero_6", "interval", true),
			h6_delay = caster:GetTalentValue("modifier_puck_hero_6", "delay", true),
			h6_knock_distance = caster:GetTalentValue("modifier_puck_hero_6", "knock_distance", true),

			has_h4 = 0,
		}
	end

	if caster:HasTalent("modifier_puck_coil_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_puck_coil_1", "damage") / 100
		self.talents.r1_armor = caster:GetTalentValue("modifier_puck_coil_1", "armor") / 100
		self.talents.r1_armor_creeps = caster:GetTalentValue("modifier_puck_coil_1", "armor")
		self.talents.r1_speed = caster:GetTalentValue("modifier_puck_coil_1", "speed")
	end

	if caster:HasTalent("modifier_puck_shift_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_puck_coil_2") then
		self.talents.has_r2 = 1
		self.talents.r2_heal = caster:GetTalentValue("modifier_puck_coil_2", "heal") / 100
		self.talents.r2_damage_reduce = caster:GetTalentValue("modifier_puck_coil_2", "damage_reduce")
		caster:AddLifesteal(self.tracker, {
			name = "modifier_puck_coil_2",
			type = 2,
			delete = function()
				return self.talents.has_e7 == 1
			end,
			value = function(params)
				if params.unit and params.unit:HasModifier("modifier_custom_puck_dream_coil_reduce") then
					return self.talents.r2_heal * self.talents.r2_bonus
				end
				return self.talents.r2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_puck_coil_3") then
		self.talents.has_r3 = 1
		self.talents.r3_crit = caster:GetTalentValue("modifier_puck_coil_3", "crit")
		self.talents.r3_chance = caster:GetTalentValue("modifier_puck_coil_3", "chance")
		caster:AddSpellEvent(self.tracker, true)
		caster:AddProc(self.tracker, { land = true })
		caster:AddRecordDestroyEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_puck_coil_4") then
		self.talents.has_r4 = 1
		caster:AddAttackStartEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_puck_coil_7") then
		self.talents.has_r7 = 1
		self.tracker:UpdateUI()
		if IsServer() then
			self.tracker:StartIntervalThink(0.2)
		end
	end

	if caster:HasTalent("modifier_puck_shift_3") then
		self.talents.e3_attacks = caster:GetTalentValue("modifier_puck_shift_3", "attacks")
	end

	if caster:HasTalent("modifier_puck_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_puck_hero_4") then
		self.talents.has_h4 = 1
	end
end

function custom_puck_dream_coil:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_puck_dream_coil_tracker"
end

function custom_puck_dream_coil:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "puck_dream_coil", self)
end

function custom_puck_dream_coil:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_AOE
		+ DOTA_ABILITY_BEHAVIOR_POINT
		+ (self.talents.has_h4 == 1 and DOTA_ABILITY_BEHAVIOR_IMMEDIATE or 0)
end

function custom_puck_dream_coil:GetCastAnimation()
	if self.talents.has_h4 == 1 then
		return 0
	end
	return ACT_DOTA_CAST_ABILITY_5
end

function custom_puck_dream_coil:GetCastRange(location, target)
	return self.BaseClass.GetCastRange(self, location, target)
		+ (self.talents.has_r4 == 1 and self.talents.r4_range or 0)
end

function custom_puck_dream_coil:GetManaCost(level)
	if self.talents.has_r7 == 1 then
		return self.talents.r7_mana
	end
	return self.BaseClass.GetManaCost(self, level)
end

function custom_puck_dream_coil:GetAOERadius()
	return self.coil_radius or 0
end

function custom_puck_dream_coil:GetBreakRadius()
	return self.coil_break_radius + (self.talents.has_h6 == 1 and self.talents.h6_radius or 0)
end

function custom_puck_dream_coil:OnSpellStart()
	if self.caster:GetName() == "npc_dota_hero_puck" then
		self.caster:EmitSound("puck_puck_ability_dreamcoil_0" .. RandomInt(1, 2))
	end

	if self.talents.has_h4 == 1 then
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_5)
	end

	local now = GameRules:GetGameTime()
	local fight = self.caster:LogFight()
	if fight and fight == self.cast_fight then
		self.caster:LogProc("custom_puck_dream_coil", now - self.cast_time)
	end
	self.cast_fight = fight
	self.cast_time = now

	local point = self:GetCursorPosition()
	local vec = point - self.caster:GetAbsOrigin()
	vec.z = 0
	local range = self:GetCastRange(point, nil) + self.caster:GetCastRangeBonus()
	if vec:Length2D() > range then
		point = self.caster:GetAbsOrigin() + vec:Normalized() * range
	end

	local duration = (self.coil_duration + (self.talents.has_h6 == 1 and self.talents.h6_duration or 0))
		* (1 + (self.talents.has_r7 == 1 and self.talents.r7_duration or 0))
	local thinker = CreateModifierThinker(
		self.caster,
		self,
		"modifier_custom_puck_dream_coil_thinker",
		{ duration = duration },
		point,
		self.caster:GetTeamNumber(),
		false
	)
	self.attacks = self.talents.r4_attacks

	if self.talents.has_r7 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_puck_dream_coil_legendary",
			{ duration = duration, thinker = thinker:entindex() }
		)
	elseif self.talents.has_r1 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_puck_dream_coil_speed",
			{ duration = duration + self.talents.r1_duration }
		)
	end

	local scepter = self.caster:HasScepter()
	local ability = self.caster:BkbAbility(self, scepter)

	for _, enemy in pairs(self.caster:FindTargets(self.coil_radius, point)) do
		if not enemy:HasModifier("modifier_custom_puck_dream_coil") then
			enemy:AddNewModifier(
				self.caster,
				ability,
				"modifier_custom_puck_dream_coil",
				{
					duration = scepter and duration or duration * (1 - enemy:GetStatusResistance()),
					thinker = thinker:entindex(),
				}
			)
		end

		if self.talents.has_r4 == 1 and enemy:IsRealHero() then
			enemy:AddNewModifier(self.caster, self, "modifier_generic_vision", { duration = self.talents.r4_vision })
		end
	end
end

function custom_puck_dream_coil:OnProjectileHit_ExtraData(target, location, data)
	if not target then
		return
	end

	target:EmitSound("Puck.Coil_Attack_impact")
	self.caster.puck_coil_attack = data.volley == 1 and "volley" or "coil"
	self.caster:PerformAttack(
		target,
		true,
		true,
		true,
		true,
		false,
		false,
		data.volley ~= 1,
		{ attack = "puck_coil", damage = data.volley == 1 and "puck_r3" or "puck_r7" }
	)
	self.caster.puck_coil_attack = nil

	if data.volley == 1 then
		return
	end
	if not target:IsAlive() then
		return
	end
	if target:IsAttackImmune() then
		return
	end
	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, true),
		"modifier_custom_puck_dream_coil_armor",
		{ duration = self.talents.r7_armor_duration }
	)
end

function custom_puck_dream_coil:ProcCd()
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r4 == 0 then
		return
	end
	if self.talents.has_r7 == 1 then
		return
	end
	if (self.attacks or 0) <= 0 then
		return
	end
	if self:GetCooldownTimeRemaining() <= 0 then
		return
	end

	self.attacks = self.attacks - 1
	self.caster:CdAbility(self, nil, self.talents.r4_cd / self.talents.r4_attacks, "modifier_puck_coil_4")
end

function custom_puck_dream_coil:ProcVolley(ability)
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r3 == 0 then
		return
	end
	if not RollPseudoRandomPercentage(self.talents.r3_chance, 7342, self.caster) then
		return
	end

	Timers:CreateTimer(ability:GetName() == "custom_puck_phase_shift" and 0.3 or 0.1, function()
		if not IsValid(self.caster) then
			return
		end
		if not self.caster:IsAlive() then
			return
		end

		local targets = self.caster:RandomTarget(
			self.caster:Script_GetAttackRange() + self.talents.r3_range,
			nil,
			DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS,
			self.talents.r3_targets
		)
		if not targets then
			return
		end

		local hero = false
		for _, target in pairs(targets) do
			hero = hero or target:IsHero()
			ProjectileManager:CreateTrackingProjectile({
				Target = target,
				Source = self.caster,
				Ability = self,
				EffectName = "particles/units/heroes/hero_puck/puck_base_attack.vpcf",
				iMoveSpeed = self.caster:GetProjectileSpeed() * 1.3,
				bDodgeable = true,
				bProvidesVision = false,
				iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
				ExtraData = { volley = 1 },
			})
		end

		if not IsValid(self.caster.shift_ability) then
			return
		end
		self.caster.shift_ability:ProcAttack(hero, true)
	end)
end

modifier_custom_puck_dream_coil_tracker = class(mod_hidden)
function modifier_custom_puck_dream_coil_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.parent.coil_ability = self.ability
	self.distance = 0
	self.records = {}
	self.ability:UpdateTalents()

	self.ability.coil_duration = self.ability:GetSpecialValueFor("coil_duration")
	self.ability.coil_radius = self.ability:GetSpecialValueFor("coil_radius")
	self.ability.coil_break_radius = self.ability:GetSpecialValueFor("coil_break_radius")
	self.ability.coil_damage = self.ability:GetSpecialValueFor("coil_damage")
	self.ability.coil_attack_damage = self.ability:GetSpecialValueFor("coil_attack_damage") / 100
	self.ability.coil_stun_duration = self.ability:GetSpecialValueFor("coil_stun_duration")
	self.ability.scepter_cd = self.ability:GetSpecialValueFor("scepter_cd")
	self.ability.scepter_cd_legendary = self.ability:GetSpecialValueFor("scepter_cd_legendary")
	self.ability.scepter_knock_range = self.ability:GetSpecialValueFor("scepter_knock_range")
end

function modifier_custom_puck_dream_coil_tracker:OnRefresh()
	self.ability.coil_damage = self.ability:GetSpecialValueFor("coil_damage")
	self.ability.coil_attack_damage = self.ability:GetSpecialValueFor("coil_attack_damage") / 100
	self.ability.coil_stun_duration = self.ability:GetSpecialValueFor("coil_stun_duration")
end

function modifier_custom_puck_dream_coil_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		self.pos = nil
		return
	end

	local pos = self.parent:GetAbsOrigin()
	local pass = self.pos and math.min(self.ability.talents.r7_distance_max, (pos - self.pos):Length2D()) or 0
	self.pos = pos

	if self.ability:GetCooldownTimeRemaining() <= 0 then
		self.distance = 0
		return
	end

	self.distance = self.distance + pass
	if self.distance < self.ability.talents.r7_distance then
		return
	end

	local count = math.floor(self.distance / self.ability.talents.r7_distance)
	self.distance = self.distance - count * self.ability.talents.r7_distance

	self.parent:CdAbility(
		self.ability,
		nil,
		self.ability.talents.r7_cd
			* (1 + (self.ability.talents.has_r4 == 1 and self.ability.talents.r4_legendary or 0))
			* count,
		"modifier_puck_coil_7"
	)
end

function modifier_custom_puck_dream_coil_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	local stack = IsValid(self.ability.armor_mod) and self.ability.armor_mod:GetStackCount() or 0
	self.parent:UpdateUIlong({ stack = stack, override_stack = stack, priority = 2, style = "PuckCoil" })
end

function modifier_custom_puck_dream_coil_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_custom_puck_dream_coil_tracker:GetCritChance()
	if self.ability.talents.has_r3 == 0 then
		return 0
	end
	if self.ability.talents.has_e7 == 1 then
		return 0
	end
	return self.ability.talents.r3_crit_chance, 7341
end

function modifier_custom_puck_dream_coil_tracker:GetCritDamage()
	return self.ability.talents.r3_crit
end

function modifier_custom_puck_dream_coil_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.parent.fake_attack then
		return
	end
	if self.ability.talents.has_r3 == 0 then
		return
	end
	if self.ability.talents.has_e7 == 1 then
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

function modifier_custom_puck_dream_coil_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if self.parent.puck_coil_attack ~= "volley" then
		return
	end
	return self.ability.talents.r3_damage
end

function modifier_custom_puck_dream_coil_tracker:GetModifierAttackSpeedBonus_Constant()
	if self.ability.talents.has_r1 == 0 then
		return
	end
	if self.ability.talents.has_r7 == 1 then
		return
	end
	return self.ability.talents.r1_speed
end

function modifier_custom_puck_dream_coil_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	self.ability:ProcCd()
end

function modifier_custom_puck_dream_coil_tracker:GetProcChance()
	return 100
end

function modifier_custom_puck_dream_coil_tracker:AttackProc(params, name)
	if not self.records[params.record] then
		return
	end

	local target = params.target
	target:EmitSound("DOTA_Item.Daedelus.Crit")

	local effect =
		ParticleManager:CreateParticle("particles/puck/rift_burn_hit.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)
end

function modifier_custom_puck_dream_coil_tracker:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	self.records[params.record] = nil
end

function modifier_custom_puck_dream_coil_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	self.ability:ProcVolley(params.ability)
end

modifier_custom_puck_dream_coil = class(mod_visible)
function modifier_custom_puck_dream_coil:GetTexture()
	return "puck_dream_coil"
end
function modifier_custom_puck_dream_coil:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.coil_ability

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.scepter = self.caster:HasScepter()
	self.bkb_ability = self:GetAbility()
	self.break_radius = self.ability:GetBreakRadius()
	self.stun_duration = self.ability.coil_stun_duration
	self.center = EntIndexToHScript(params.thinker):GetAbsOrigin()

	local effect_cast = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_puck/puck_dreamcoil_tether.vpcf",
			self.ability
		),
		PATTACH_ABSORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_cast, 0, self.center)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(effect_cast, false, false, -1, false, false)

	if self.scepter and self.parent:IsRealHero() then
		self.marks = {}
		self.abilities = {}
		for i = 0, self.parent:GetAbilityCount() - 1 do
			local ability = self.parent:GetAbilityByIndex(i)
			if ability then
				table.insert(self.abilities, ability)
			end
		end
		self.slots = { 0, 1, 2, 3, 4, 5, 15, 16 }
		self.scan_time = 0
		self.scepter_cd = self.ability.talents.has_r7 == 1 and self.ability.scepter_cd_legendary
			or self.ability.scepter_cd
	end

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_custom_puck_dream_coil:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.marks and GameRules:GetGameTime() >= self.scan_time then
		self.scan_time = GameRules:GetGameTime() + 0.3

		local extended = false
		for _, ability in pairs(self.abilities) do
			extended = self:ExtendCooldown(ability) or extended
		end

		for _, slot in pairs(self.slots) do
			extended = self:ExtendCooldown(self.parent:GetItemInSlot(slot)) or extended
		end

		if extended then
			self.parent:EmitSound("Puck.Coil_Cd")
			local effect =
				ParticleManager:CreateParticle("particles/puck/coil_cd.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
			ParticleManager:SetParticleControl(effect, 1, Vector(200, 0, 0))
			ParticleManager:ReleaseParticleIndex(effect)
		end
	end

	if (self.parent:GetAbsOrigin() - self.center):Length2D() < self.break_radius then
		return
	end
	if self.scepter and self.parent:IsCurrentlyHorizontalMotionControlled() then
		return
	end

	if not self.stunned then
		self.stunned = true
		self.parent:EmitSound("Hero_Puck.Dream_Coil_Snap")
		self.parent:ApplyStun(self.ability, self.scepter, self.caster, self.stun_duration)
	end

	if not self.scepter then
		self:Destroy()
		return
	end

	local vec = self.center - self.parent:GetAbsOrigin()
	vec.z = 0

	self.parent:EmitSound("Puck.Coil_Knock")
	self.parent:AddNewModifier(self.caster, self.bkb_ability, "modifier_generic_knockback", {
		direction_x = vec.x,
		direction_y = vec.y,
		distance = math.max(0, vec:Length2D() - self.ability.scepter_knock_range),
		height = 0,
		duration = 0.3,
		IsStun = false,
		IsFlail = true,
	})
end

function modifier_custom_puck_dream_coil:ExtendCooldown(ability)
	if not ability then
		return
	end

	local cd = ability:GetCooldownTimeRemaining()
	if cd <= 0 then
		self.marks[ability] = nil
		return
	end

	if self.marks[ability] then
		return
	end
	self.marks[ability] = true

	ability:EndCooldown()
	ability:StartCooldown(cd + self.scepter_cd)
	return true
end

function modifier_custom_puck_dream_coil:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_custom_puck_dream_coil_thinker = class(mod_hidden)
function modifier_custom_puck_dream_coil_thinker:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.origin = self.parent:GetAbsOrigin()
	self.break_radius = self.ability:GetBreakRadius()
	self.radius = self.break_radius + 50
	self.scepter = self.caster:HasScepter()
	self.bkb_ability = self.caster:BkbAbility(self.ability, self.scepter)
	self.push_time = self.ability.talents.has_h6 == 1 and self.ability.talents.h6_delay or nil
	self.tick = 0.5
	self.count = 0
	self.max = math.floor(self:GetDuration() / self.tick)
	self.damageTable = {
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.has_r7 == 1 and DAMAGE_TYPE_PHYSICAL or DAMAGE_TYPE_MAGICAL,
	}

	self.coil_sound = wearables_system:GetSoundReplacement(self.caster, "Puck.Coil", self.ability)
	self.parent:EmitSound(self.coil_sound)

	local pfx = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_puck/puck_dreamcoil.vpcf",
			self.ability
		),
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(pfx, 0, self.origin)
	self:AddParticle(pfx, false, false, -1, false, false)

	local zone = ParticleManager:CreateParticleForPlayer(
		"particles/puck/coil_zone.vpcf",
		PATTACH_WORLDORIGIN,
		nil,
		self.caster:GetPlayerOwner()
	)
	ParticleManager:SetParticleControl(zone, 0, self.origin)
	ParticleManager:SetParticleControl(zone, 1, Vector(self.break_radius, 0, 0))
	self:AddParticle(zone, false, false, -1, false, false)

	self:StartIntervalThink(self.tick - FrameTime())
end

function modifier_custom_puck_dream_coil_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.count = self.count + 1
	self.damageTable.damage = (
		self.ability.coil_damage
		+ (self.ability.coil_attack_damage + self.ability.talents.r1_damage)
			* self.caster:GetAverageTrueAttackDamage(nil)
	) * self.tick

	for _, enemy in pairs(self.caster:FindTargets(self.radius, self.origin)) do
		if self.scepter or not enemy:IsDebuffImmune() then
			self.damageTable.victim = enemy
			DoDamage(self.damageTable)

			if IsValid(self.caster.innate_ability) then
				self.caster.innate_ability:ProcHealReduce(enemy)
			end
		end

		if self.ability.talents.has_r2 == 1 then
			enemy:AddNewModifier(
				self.caster,
				self.bkb_ability,
				"modifier_custom_puck_dream_coil_reduce",
				{ duration = self.tick + 0.1 }
			)
		end
	end

	if self.push_time and self.count * self.tick >= self.push_time then
		self.push_time = self.push_time + self.ability.talents.h6_interval
		EmitSoundOnLocationWithCaster(self.origin, "Puck.Coil_Wave", self.caster)

		local particle = ParticleManager:CreateParticle("particles/puck/puck_magic.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, self.origin)
		ParticleManager:SetParticleControl(particle, 1, self.origin)
		ParticleManager:SetParticleControl(particle, 2, Vector(self.break_radius, 0, 0))
		ParticleManager:ReleaseParticleIndex(particle)

		for _, enemy in pairs(self.caster:FindTargets(self.break_radius, self.origin)) do
			local direction = enemy:GetAbsOrigin() - self.origin
			direction.z = 0

			if direction:Length2D() <= self.break_radius then
				direction = direction:Normalized()
				enemy:AddNewModifier(self.caster, self.ability, "modifier_generic_knockback", {
					duration = 0.3,
					distance = self.ability.talents.h6_knock_distance,
					height = 0,
					direction_x = direction.x,
					direction_y = direction.y,
				})
				enemy:ApplyStun(self.ability, false, self.caster, self.ability.talents.h6_stun)
			end
		end
	end

	if self.count < self.max then
		return
	end
	self:StartIntervalThink(-1)
end

function modifier_custom_puck_dream_coil_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound(self.coil_sound)
	self.parent:StopSound("Hero_Puck.Dream_Coil.Layer")
	UTIL_Remove(self.parent)
end

modifier_custom_puck_dream_coil_speed = class(mod_hidden)
function modifier_custom_puck_dream_coil_speed:OnCreated()
	self.ability = self:GetAbility()
	self.speed = self.ability.talents.r1_speed

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_custom_puck_dream_coil_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_custom_puck_dream_coil_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

modifier_custom_puck_dream_coil_reduce = class(mod_visible)
function modifier_custom_puck_dream_coil_reduce:GetTexture()
	return "buffs/puck/coil_2"
end
function modifier_custom_puck_dream_coil_reduce:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self.caster.coil_ability
	if not self.ability then
		return
	end
	self.damage_reduce = self.ability.talents.r2_damage_reduce
end

function modifier_custom_puck_dream_coil_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_custom_puck_dream_coil_reduce:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

function modifier_custom_puck_dream_coil_reduce:GetModifierSpellAmplify_Percentage()
	return self:GetModifierDamageOutgoing_Percentage()
end

modifier_custom_puck_dream_coil_legendary = class(mod_visible)
function modifier_custom_puck_dream_coil_legendary:GetTexture()
	return "puck_dream_coil"
end
function modifier_custom_puck_dream_coil_legendary:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local thinker = EntIndexToHScript(params.thinker)
	self.origin = thinker:GetAbsOrigin()
	self.radius = self.ability.talents.r7_radius
	self.count = 0
	self.projectile = {
		Source = thinker,
		Ability = self.ability,
		EffectName = "particles/units/heroes/hero_puck/puck_base_attack.vpcf",
		iMoveSpeed = self.parent:GetProjectileSpeed(),
		vSourceLoc = self.origin,
		bDodgeable = true,
		bProvidesVision = false,
		ExtraData = { volley = 0 },
	}

	self.parent:GenericParticle("particles/zeus/bolt_disarm.vpcf", self, true)
	self:StartIntervalThink(self.ability.talents.r7_delay)
end

function modifier_custom_puck_dream_coil_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	local attacks = self.ability.talents.r7_attacks
	local shift = self.parent.shift_ability
	if IsValid(shift) and IsValid(shift.stats_mod) and shift.stats_mod:GetStackCount() >= shift.stats_mod.max then
		attacks = attacks + self.ability.talents.e3_attacks
	end

	if self.count < attacks then
		self:Attack()
	end

	local left = attacks - self.count
	local time = self:GetRemainingTime() - 0.1

	if left > 0 and time < 0.1 then
		for i = 1, left do
			self:Attack()
		end
		left = 0
	end

	self:StartIntervalThink(left > 0 and time / left or 0.1)
end

function modifier_custom_puck_dream_coil_legendary:Attack()
	self.count = self.count + 1

	local targets = self.parent:FindTargets(self.radius, self.origin)
	if #targets == 0 then
		return
	end

	local hero = false
	EmitSoundOnLocationWithCaster(self.origin, "Puck.Coil_Attack", self.parent)

	for _, target in pairs(targets) do
		hero = hero or target:IsHero()
		self.projectile.Target = target
		ProjectileManager:CreateTrackingProjectile(self.projectile)
	end

	if not IsValid(self.parent.shift_ability) then
		return
	end
	self.parent.shift_ability:ProcAttack(hero)
end

function modifier_custom_puck_dream_coil_legendary:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
	}
end

modifier_custom_puck_dream_coil_armor = class(mod_visible)
function modifier_custom_puck_dream_coil_armor:GetTexture()
	return "puck_dream_coil"
end
function modifier_custom_puck_dream_coil_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.coil_ability
	if not self.ability then
		return
	end

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	self:SetHasCustomTransmitterData(true)
	self:OnRefresh()
end

function modifier_custom_puck_dream_coil_armor:OnRefresh()
	if not IsServer() then
		return
	end
	if self.parent:IsCreep() then
		self.armor = self.ability.talents.r7_armor_creeps + self.ability.talents.r1_armor_creeps
	else
		self.armor = self.ability.talents.r7_armor_base
			+ self.parent:GetArmor(self) * (self.ability.talents.r7_armor + self.ability.talents.r1_armor)
	end
	self:IncrementStackCount()
	self:SendBuffRefreshToClients()

	if not self.parent:IsRealHero() then
		return
	end
	self.ability.armor_mod = self
	self.ability.tracker:UpdateUI()
end

function modifier_custom_puck_dream_coil_armor:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		self.caster:LogProc("modifier_puck_coil_7_kill", self:GetStackCount(), self.parent)
	end

	if self.ability.armor_mod ~= self then
		return
	end

	self.ability.armor_mod = nil
	self.ability.tracker:UpdateUI()
end

function modifier_custom_puck_dream_coil_armor:AddCustomTransmitterData()
	return {
		armor = self.armor,
	}
end

function modifier_custom_puck_dream_coil_armor:HandleCustomTransmitterData(data)
	self.armor = data.armor
end

function modifier_custom_puck_dream_coil_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_custom_puck_dream_coil_armor:GetModifierPhysicalArmorBonus()
	if not self.armor then
		return
	end
	return self.armor * self:GetStackCount()
end