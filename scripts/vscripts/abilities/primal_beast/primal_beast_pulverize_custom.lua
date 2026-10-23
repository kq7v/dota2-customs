--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_tracker",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_debuff",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_BOTH
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_legendary_count",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_pulverize_7"
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_reduce",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_hero_3"
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_perma",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_pulverize_1"
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_health_reduce",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_pulverize_3"
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_quake",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_scepter",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_scepter_wave",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_scepter_break",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_scepter_slow",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_pulverize_custom_scepter_debuff",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_rock_throw_custom",
	"abilities/primal_beast/primal_beast_pulverize_custom",
	LUA_MODIFIER_MOTION_NONE
)

primal_beast_pulverize_custom = class({})
primal_beast_pulverize_custom.talents = {}

function primal_beast_pulverize_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "primal_beast_pulverize", self)
end

function primal_beast_pulverize_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_primal_beast/primal_beast_pulverize_hit.vpcf", context)
	PrecacheResource("particle", "particles/primal_beast/pulverize_charges.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_pulverize_tectonic_shift_projectile.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_alchemist/alchemist_unstable_concoction_explosion.vpcf",
		context
	)
end

function primal_beast_pulverize_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_spell = 0,
			r1_base = 0,
			r1_damage = 0,
			r1_max = caster:GetTalentValue("modifier_primal_beast_pulverize_1", "max", true),

			r2_cd = 0,
			r2_range = 0,

			has_r3 = 0,
			r3_count = 0,
			r3_health = 0,
			r3_health_legendary = 0,
			r3_max_legendary = 0,
			r3_duration = caster:GetTalentValue("modifier_primal_beast_pulverize_3", "duration", true),
			r3_max = caster:GetTalentValue("modifier_primal_beast_pulverize_3", "max", true),

			has_r4 = 0,
			r4_cdr = caster:GetTalentValue("modifier_primal_beast_pulverize_4", "cdr", true),
			r4_cd_items = caster:GetTalentValue("modifier_primal_beast_pulverize_4", "cd_items", true),
			r4_cd_items_legendary = caster:GetTalentValue(
				"modifier_primal_beast_pulverize_4",
				"cd_items_legendary",
				true
			),

			has_w3 = 0,
			w3_damage = 0,
			w3_pulverize_chance = caster:GetTalentValue("modifier_primal_beast_trample_3", "pulverize_chance", true),

			has_q7 = 0,
			has_e7 = 0,

			has_r7 = 0,
			r7_hero_radius = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "hero_radius", true),
			r7_duration = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "duration", true),
			r7_max = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "max", true),

			has_h3 = 0,
			h3_heal_reduce = 0,
			h3_damage_reduce = 0,
			h3_duration = caster:GetTalentValue("modifier_primal_beast_hero_3", "duration", true),

			has_h6 = 0,
			h6_heal = caster:GetTalentValue("modifier_primal_beast_hero_6", "heal", true) / 100,
			h6_heal_legendary = caster:GetTalentValue("modifier_primal_beast_hero_6", "heal_legendary", true) / 100,
			h6_bkb = caster:GetTalentValue("modifier_primal_beast_hero_6", "bkb", true),
		}
	end

	if caster:HasTalent("modifier_primal_beast_pulverize_1") then
		self.talents.has_r1 = 1
		self.talents.r1_spell = caster:GetTalentValue("modifier_primal_beast_pulverize_1", "spell")
		self.talents.r1_base = caster:GetTalentValue("modifier_primal_beast_pulverize_1", "base")
		self.talents.r1_damage = caster:GetTalentValue("modifier_primal_beast_pulverize_1", "damage")
	end

	if caster:HasTalent("modifier_primal_beast_pulverize_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_primal_beast_pulverize_2", "cd")
		self.talents.r2_range = caster:GetTalentValue("modifier_primal_beast_pulverize_2", "range")
	end

	if caster:HasTalent("modifier_primal_beast_pulverize_3") then
		self.talents.has_r3 = 1
		self.talents.r3_count = caster:GetTalentValue("modifier_primal_beast_pulverize_3", "count")
		self.talents.r3_health = caster:GetTalentValue("modifier_primal_beast_pulverize_3", "health")
		self.talents.r3_health_legendary =
			caster:GetTalentValue("modifier_primal_beast_pulverize_3", "health_legendary")
		self.talents.r3_max_legendary = caster:GetTalentValue("modifier_primal_beast_pulverize_3", "max_legendary")
	end

	if caster:HasTalent("modifier_primal_beast_pulverize_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_primal_beast_trample_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_primal_beast_trample_3", "damage") / 100
	end

	if caster:HasTalent("modifier_primal_beast_onslaught_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_primal_beast_uproar_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_primal_beast_pulverize_7") then
		self.talents.has_r7 = 1
		if IsServer() then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_primal_beast_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_heal_reduce = caster:GetTalentValue("modifier_primal_beast_hero_3", "heal_reduce")
		self.talents.h3_damage_reduce = caster:GetTalentValue("modifier_primal_beast_hero_3", "damage_reduce")
	end

	if caster:HasTalent("modifier_primal_beast_hero_6") then
		self.talents.has_h6 = 1
	end
end

function primal_beast_pulverize_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_primal_beast_pulverize_custom_tracker"
end

function primal_beast_pulverize_custom:GetChannelAnimation()
	return ACT_DOTA_CHANNEL_ABILITY_5
end

function primal_beast_pulverize_custom:GetPlaybackRateOverride()
	return self:GetCastPointModifier()
end

function primal_beast_pulverize_custom:GetChannelTime()
	return (self.channel_time or 0)
		+ self.caster:GetUpgradeStack("modifier_primal_beast_pulverize_custom_legendary_count")
			* (self.interval or 0)
end

function primal_beast_pulverize_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.r2_cd or 0)
end

function primal_beast_pulverize_custom:OnAbilityPhaseStart()
	if not IsServer() then
		return true
	end
	if self.talents.has_h6 == 0 then
		return true
	end
	if not self.caster:CheckCd("primal_beast_hero_6", 5) then
		return true
	end

	self.bkb_mod = self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_generic_debuff_immune",
		{ duration = 1, sound = 1, effect = 2, status_effect = "particles/status_fx/status_effect_avatar.vpcf" }
	)
	return true
end

function primal_beast_pulverize_custom:OnSpellStart(new_target)
	local target = new_target or self:GetCursorTarget()

	if IsValid(self.caster.onslaught_ability) then
		self.caster.onslaught_ability:OnChargeFinish(true, false)
	end

	if self.caster:HasScepter() then
		self.caster:AddNewModifier(self.caster, self, "modifier_primal_beast_pulverize_custom_scepter", {})
	end

	if self.talents.has_h6 == 0 and target:TriggerSpellAbsorb(self) then
		self.caster:Interrupt()
		return
	end

	target:InterruptMotionControllers(true)

	local duration = self:GetChannelTime()

	if IsValid(self.legendary_mod) then
		self.legendary_mod:SetDuration(99999, true)
	end

	self.target_mod = target:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_pulverize_custom_debuff",
		{ duration = duration }
	)
	self.caster_mod = self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_pulverize_custom",
		{ duration = duration, creep = target:IsCreep() and 1 or 0 }
	)

	if self.talents.has_h6 == 1 then
		if IsValid(self.bkb_mod) then
			self.bkb_mod:SetDuration(duration + self.talents.h6_bkb, true)
		else
			self.bkb_mod = self.caster:AddNewModifier(
				self.caster,
				self,
				"modifier_generic_debuff_immune",
				{
					duration = duration + self.talents.h6_bkb,
					sound = 1,
					effect = 2,
					status_effect = "particles/status_fx/status_effect_avatar.vpcf",
				}
			)
		end
	end

	if target:IsHero() then
		self.caster:EmitSound("Hero_PrimalBeast.Pulverize.Cast")
	else
		self.caster:EmitSound("Hero_PrimalBeast.Pulverize.Cast.Creep")
	end
end

function primal_beast_pulverize_custom:OnChannelThink(fInterval)
	if IsValid(self.target_mod) then
		return
	end
	self.caster:Interrupt()
end

function primal_beast_pulverize_custom:OnChannelFinish(bInterrupted)
	if IsValid(self.caster_mod) then
		self.caster_mod:Destroy()
	end

	if IsValid(self.target_mod) then
		self.target_mod:Destroy()
		self.target_mod = nil
	end

	if IsValid(self.legendary_mod) then
		self.legendary_mod:Destroy()
	end

	if IsValid(self.bkb_mod) then
		self.bkb_mod:SetDuration(self.talents.h6_bkb, true)
	end
end

function primal_beast_pulverize_custom:AddLegendaryStack(source)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r7 == 0 then
		return
	end

	self.legendary_mod = self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_pulverize_custom_legendary_count",
		{ duration = self.talents.r7_duration }
	)
	self.caster:LogProc("modifier_primal_beast_pulverize_7_" .. source)
end

function primal_beast_pulverize_custom:UltimateHit(point, forced_crit, quake)
	if not IsServer() then
		return
	end

	local targets = self.caster:FindTargets(self.splash_radius, point)
	local damage = self.damage + self.talents.r1_base + (IsValid(self.perma_mod) and self.perma_mod:GetDamage() or 0)
	local damageTable = { attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }
	local critTable = { attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }
	local crit = self.talents.has_w3 == 1
		and (forced_crit or RollPseudoRandomPercentage(self.talents.w3_pulverize_chance, 4163, self.caster))
	local hero_hit = false

	for _, target in pairs(targets) do
		if self.talents.has_r3 == 1 then
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_primal_beast_pulverize_custom_health_reduce",
				{ duration = self.talents.r3_duration }
			)
		end

		damageTable.victim = target
		damageTable.damage = damage
		DoDamage(damageTable, quake and "modifier_primal_beast_pulverize_3" or nil)

		if crit then
			critTable.victim = target
			critTable.damage = damageTable.damage * self.talents.w3_damage
			DoDamage(critTable, "modifier_primal_beast_trample_3")
			target:SendNumber(114, damageTable.damage + critTable.damage)

			if IsValid(self.caster.onslaught_ability) then
				self.caster.onslaught_ability:HitEffect(target, point, false)
			end
		end

		target:AddNewModifier(self.caster, self, "modifier_stunned", { duration = self.ministun })
		target:EmitSound("Hero_PrimalBeast.Pulverize.Stun")

		if self.talents.has_h3 == 1 then
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_primal_beast_pulverize_custom_reduce",
				{ duration = self.talents.h3_duration }
			)
		end

		if target:IsValidKill(self.caster) then
			hero_hit = true
		end
	end

	if hero_hit then
		self.perma_mod =
			self.caster:AddNewModifier(self.caster, self, "modifier_primal_beast_pulverize_custom_perma", {})
	end

	if crit and IsValid(self.caster.trample_ability) then
		self.caster:LogProc("modifier_primal_beast_trample_3_pulverize", hero_hit and 1 or 0)
		self.caster.trample_ability:ProcCrit(
			IsValid(self.target_mod) and GetGroundPosition(self.target_mod.parent:GetAbsOrigin(), nil) or point,
			250,
			hero_hit
		)
	end

	if self.talents.has_h6 == 1 then
		self.caster:GenericHeal(
			(self.caster:GetMaxHealth() - self.caster:GetHealth())
				* (self.talents.has_r7 == 1 and self.talents.h6_heal_legendary or self.talents.h6_heal),
			self,
			false,
			false,
			"modifier_primal_beast_hero_6"
		)
	end

	if self.talents.has_r4 == 1 then
		self.caster:CdItems(
			self.talents.has_r7 == 1 and self.talents.r4_cd_items_legendary or self.talents.r4_cd_items,
			"modifier_primal_beast_pulverize_4"
		)
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_pulverize_hit.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect_cast, 0, point)
	ParticleManager:SetParticleControl(
		effect_cast,
		1,
		Vector(self.splash_radius, self.splash_radius, self.splash_radius)
	)
	ParticleManager:DestroyParticle(effect_cast, false)
	ParticleManager:ReleaseParticleIndex(effect_cast)
	EmitSoundOnLocationWithCaster(point, "Hero_PrimalBeast.Pulverize.Impact", self.caster)
	return crit
end

modifier_primal_beast_pulverize_custom_tracker = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.pulverize_ability = self.ability
	self.parent.rock_ability = self.parent:FindAbilityByName("primal_beast_rock_throw_custom")

	if IsValid(self.parent.rock_ability) then
		self.parent.rock_ability:UpdateTalents()
	end

	self.ability.splash_radius = self.ability:GetSpecialValueFor("splash_radius")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")
	self.ability.ministun = self.ability:GetSpecialValueFor("ministun")
	self.ability.animation_rate = self.ability:GetSpecialValueFor("animation_rate")
	self.ability.channel_time = self.ability:GetSpecialValueFor("channel_time")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.creeps_cd = self.ability:GetSpecialValueFor("creeps_cd") / 100
	self.ability.scepter_duration = self.ability:GetSpecialValueFor("scepter_duration")
	self.ability.scepter_break = self.ability:GetSpecialValueFor("scepter_break")
	self.ability.scepter_slow_duration = self.ability:GetSpecialValueFor("scepter_slow_duration")
	self.ability.scepter_slow = self.ability:GetSpecialValueFor("scepter_slow")
	self.ability.scepter_attack = self.ability:GetSpecialValueFor("scepter_attack")
	self.ability.scepter_armor = self.ability:GetSpecialValueFor("scepter_armor")
	self.ability.scepter_damage = self.ability:GetSpecialValueFor("scepter_damage") / 100
	self.ability.scepter_magic = self.ability:GetSpecialValueFor("scepter_magic")
	self.ability.scepter_debuff = self.ability:GetSpecialValueFor("scepter_debuff")
	self.ability.scepter_interval = self.ability:GetSpecialValueFor("scepter_interval")
	self.ability.scepter_count = self.ability:GetSpecialValueFor("scepter_count")
	self.ability.scepter_distance = self.ability:GetSpecialValueFor("scepter_distance")
	self.ability.scepter_speed = self.ability:GetSpecialValueFor("scepter_speed")
	self.ability.scepter_width = self.ability:GetSpecialValueFor("scepter_width")
	self.ability.scepter_split = self.ability:GetSpecialValueFor("scepter_split")
	self.ability.scepter_split_angle = self.ability:GetSpecialValueFor("scepter_split_angle")
	self:OnRefresh()
end

function modifier_primal_beast_pulverize_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")

	if not IsServer() then
		return
	end
	if not IsValid(self.parent.rock_ability) then
		return
	end
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_primal_beast_rock_throw",
		{ min_range = self.parent.rock_ability.talents.r7_min_range }
	)
end

function modifier_primal_beast_pulverize_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end

	local stack = self.parent:GetUpgradeStack("modifier_primal_beast_pulverize_custom_legendary_count")

	self.parent:UpdateUIlong({
		max = self.ability.talents.r7_max + self.ability.talents.r3_max_legendary,
		stack = stack,
		priority = 1,
		style = "BeastPulverize",
	})
end

function modifier_primal_beast_pulverize_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_primal_beast_pulverize_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.r2_range
end

function modifier_primal_beast_pulverize_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.r1_spell
end

function modifier_primal_beast_pulverize_custom_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_cdr
end

function modifier_primal_beast_pulverize_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if not self.parent.beast_scepter then
		return
	end
	return self.ability.scepter_attack - 100
end

modifier_primal_beast_pulverize_custom = class(mod_hidden)
function modifier_primal_beast_pulverize_custom:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.creep = params.creep == 1
	self.ability:EndCd()

	if self.ability.talents.has_r4 == 0 then
		return
	end
	self.parent:AddOrderFilter(self)
end

function modifier_primal_beast_pulverize_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if not self.creep then
		return
	end
	self.parent:CdAbility(self.ability, nil, self.ability.creeps_cd, "primal_beast_pulverize_custom")
end

function modifier_primal_beast_pulverize_custom:OrderFilter(params)
	if
		params.order_type ~= DOTA_UNIT_ORDER_CAST_POSITION
		and params.order_type ~= DOTA_UNIT_ORDER_CAST_NO_TARGET
		and params.order_type ~= DOTA_UNIT_ORDER_CAST_TARGET
	then
		return
	end
	if not params.ability then
		return
	end
	if params.queue == 1 then
		return
	end
	if self:GetRemainingTime() <= 0.1 then
		return
	end
	if
		params.ability:IsItem()
		and bit.band(params.ability:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES) == 0
	then
		return
	end

	return false
end

function modifier_primal_beast_pulverize_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
	}
end

function modifier_primal_beast_pulverize_custom:CheckState()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return {
		[MODIFIER_STATE_CASTS_IGNORE_CHANNELING] = true,
	}
end

function modifier_primal_beast_pulverize_custom:GetModifierDisableTurning()
	return 1
end

function modifier_primal_beast_pulverize_custom:GetModifierIgnoreCastAngle()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return 1
end

modifier_primal_beast_pulverize_custom_debuff = class(mod_visible)
function modifier_primal_beast_pulverize_custom_debuff:IsPurgeException()
	return self.ability.talents.has_r7 == 0
end
function modifier_primal_beast_pulverize_custom_debuff:IsStunDebuff()
	return true
end
function modifier_primal_beast_pulverize_custom_debuff:GetPriority()
	return DOTA_MOTION_CONTROLLER_PRIORITY_HIGHEST
end
function modifier_primal_beast_pulverize_custom_debuff:GetMotionPriority()
	return DOTA_MOTION_CONTROLLER_PRIORITY_HIGHEST
end
function modifier_primal_beast_pulverize_custom_debuff:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.interval
	self.animrate = self.ability.animation_rate

	if not IsServer() then
		return
	end
	self.interrupt_pos = self.caster:GetOrigin() + self.caster:GetForwardVector() * 200
	self.cast_pos = self.caster:GetOrigin()
	self.pos_threshold = 100
	self.max_hits = math.floor(self:GetDuration() / self.interval)
	self.proced_crit = false

	local attach_rollback = {
		[1] = "attach_pummel",
		[2] = "attach_attack1",
		[3] = "attach_attack",
		[4] = "attach_hitloc",
	}

	for _, name in ipairs(attach_rollback) do
		self.attach = self.caster:ScriptLookupAttachment(name)
		if self.attach ~= 0 then
			break
		end
	end

	local hitloc_enum = self.parent:ScriptLookupAttachment("attach_hitloc")
	local hitloc_pos = self.parent:GetAttachmentOrigin(hitloc_enum)
	self.deltapos = self.parent:GetOrigin() - hitloc_pos

	if not self:ApplyHorizontalMotionController() then
		self:Destroy()
		return
	end

	if not self:ApplyVerticalMotionController() then
		self:Destroy()
		return
	end

	self:SetPriority(DOTA_MOTION_CONTROLLER_PRIORITY_HIGHEST)
	self:StartIntervalThink(self.interval)
end

function modifier_primal_beast_pulverize_custom_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:FadeGesture(ACT_DOTA_FLAIL)
	self.parent:RemoveHorizontalMotionController(self)
	self.parent:RemoveVerticalMotionController(self)

	local angle = self.parent:GetAnglesAsVector()
	self.parent:SetAngles(0, angle.y + 180, 0)

	FindClearSpaceForUnit(self.parent, GetGroundPosition(self.interrupt_pos, nil), false)

	self.parent:FacePoint()

	if self.ability.talents.has_r3 == 0 then
		return
	end
	if self.ability.talents.has_r7 == 1 then
		return
	end
	CreateModifierThinker(
		self.caster,
		self.ability,
		"modifier_primal_beast_pulverize_custom_quake",
		{},
		self.parent:GetAbsOrigin(),
		self.caster:GetTeamNumber(),
		false
	)
end

function modifier_primal_beast_pulverize_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE,
	}
end

function modifier_primal_beast_pulverize_custom_debuff:GetOverrideAnimation()
	return ACT_DOTA_FLAIL
end

function modifier_primal_beast_pulverize_custom_debuff:GetOverrideAnimationRate()
	return self.animrate
end

function modifier_primal_beast_pulverize_custom_debuff:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED] = true,
	}
end

function modifier_primal_beast_pulverize_custom_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end

	if
		self.ability:UltimateHit(self.interrupt_pos, not self.proced_crit and self:GetStackCount() + 1 >= self.max_hits)
	then
		self.proced_crit = true
	end

	self:IncrementStackCount()

	if (self.caster:GetOrigin() - self.cast_pos):Length2D() <= self.pos_threshold then
		return
	end
	self:Destroy()
end

function modifier_primal_beast_pulverize_custom_debuff:UpdateHorizontalMotion(me, dt)
	if self.parent:IsOutOfGame() or self.parent:IsInvulnerable() then
		self:Destroy()
		return
	end

	local pos = self.caster:GetAttachmentOrigin(self.attach)
	local angles = self.caster:GetAttachmentAngles(self.attach)

	me:SetLocalAngles(180 - angles.x, 180 + angles.y, 0)

	local deltapos = RotatePosition(Vector(0, 0, 0), QAngle(180 - angles.x, 180 + angles.y, 0), self.deltapos)
	me:SetOrigin(pos + deltapos)
end

function modifier_primal_beast_pulverize_custom_debuff:UpdateVerticalMotion(me, dt)
	local pos = self.caster:GetAttachmentOrigin(self.attach)
	local angles = self.caster:GetAttachmentAngles(self.attach)

	local deltapos = RotatePosition(Vector(0, 0, 0), QAngle(180 - angles.x, 180 + angles.y, 0), self.deltapos)
	pos = pos + deltapos

	local mepos = me:GetOrigin()
	mepos.z = pos.z
	me:SetOrigin(mepos)
end

modifier_primal_beast_pulverize_custom_legendary_count = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_legendary_count:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.max = self.ability.talents.r7_max + self.ability.talents.r3_max_legendary
	self.timer = self.ability.talents.r7_duration
	self.radius = self.ability.talents.r7_hero_radius

	self.particle = self.parent:GenericParticle("particles/primal_beast/pulverize_charges.vpcf", self, true)
	ParticleManager:SetParticleControl(self.particle, 7, Vector(self.max, 0, 0))
	self:StartIntervalThink(0.5)
	self:OnRefresh()
end

function modifier_primal_beast_pulverize_custom_legendary_count:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	for i = 1, self.max do
		if i <= self:GetStackCount() then
			ParticleManager:SetParticleControl(self.particle, i, Vector(1, 0, 0))
		else
			ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
		end
	end

	self.ability.tracker:UpdateUI()
end

function modifier_primal_beast_pulverize_custom_legendary_count:OnIntervalThink()
	if not IsServer() then
		return
	end

	local origin = self.parent:GetAbsOrigin()
	local hero_near = false

	for _, player in pairs(players) do
		if
			player:IsAlive()
			and player:GetTeamNumber() ~= self.parent:GetTeamNumber()
			and (player:GetAbsOrigin() - origin):Length2D() <= self.radius
		then
			hero_near = true
			break
		end
	end

	if not hero_near and not self.parent:HasModifier("modifier_primal_beast_pulverize_custom") then
		return
	end

	self:SetDuration(self.timer, true)
end

function modifier_primal_beast_pulverize_custom_legendary_count:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) or not IsValid(self.ability.tracker) then
		return
	end

	self.ability.tracker:UpdateUI()
end

modifier_primal_beast_pulverize_custom_reduce = class(mod_visible)
function modifier_primal_beast_pulverize_custom_reduce:GetTexture()
	return "buffs/primal_beast/hero_3"
end
function modifier_primal_beast_pulverize_custom_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.heal_reduce = self.ability.talents.h3_heal_reduce
	self.damage_reduce = self.ability.talents.h3_damage_reduce

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
end

function modifier_primal_beast_pulverize_custom_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_primal_beast_pulverize_custom_reduce:GetModifierHealChange()
	return self.heal_reduce
end

function modifier_primal_beast_pulverize_custom_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
end

function modifier_primal_beast_pulverize_custom_reduce:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

function modifier_primal_beast_pulverize_custom_reduce:GetModifierSpellAmplify_Percentage()
	return self.damage_reduce
end

modifier_primal_beast_pulverize_custom_health_reduce = class(mod_visible)
function modifier_primal_beast_pulverize_custom_health_reduce:GetTexture()
	return "buffs/primal_beast/pulverize_3"
end
function modifier_primal_beast_pulverize_custom_health_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.health = self.ability.talents.has_r7 == 1 and self.ability.talents.r3_health_legendary
		or self.ability.talents.r3_health

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_primal_beast_pulverize_custom_health_reduce:OnRefresh()
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

function modifier_primal_beast_pulverize_custom_health_reduce:OnDestroy()
	if not IsServer() then
		return
	end

	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_primal_beast_pulverize_custom_health_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_primal_beast_pulverize_custom_health_reduce:GetModifierExtraHealthPercentage()
	return self.health * self:GetStackCount()
end

modifier_primal_beast_pulverize_custom_quake = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_quake:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_count
	self.radius = self.ability.splash_radius
	self.interval = self.ability.interval
	self.origin = self.parent:GetAbsOrigin()

	self:Preview()
	self:StartIntervalThink(self.interval)
end

function modifier_primal_beast_pulverize_custom_quake:OnIntervalThink()
	if not IsServer() then
		return
	end

	ParticleManager:DestroyParticle(self.preview, false)
	ParticleManager:ReleaseParticleIndex(self.preview)

	if not IsValid(self.caster) then
		self:Destroy()
		return
	end

	self.ability:UltimateHit(self.origin, nil, true)
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self:Destroy()
		return
	end

	self:Preview()
end

function modifier_primal_beast_pulverize_custom_quake:Preview()
	self.preview = ParticleManager:CreateParticle("particles/generic/red_zone.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.preview, 0, self.origin)
	ParticleManager:SetParticleControl(self.preview, 1, Vector(self.radius, 0, -self.radius / self.interval))
	ParticleManager:SetParticleControl(self.preview, 2, Vector(self.interval, 0, 0))
	self:AddParticle(self.preview, false, false, -1, false, false)
end

modifier_primal_beast_pulverize_custom_scepter = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_scepter:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self.max = self.ability.scepter_duration / self.ability.scepter_interval

	self:OnRefresh()
	self:StartIntervalThink(self.ability.scepter_interval)
	self:OnIntervalThink()
end

function modifier_primal_beast_pulverize_custom_scepter:OnRefresh()
	if not IsServer() then
		return
	end
	self.count = 0
	self.parent:EmitSound("Hero_PrimalBeast.Uproar.Scepter")
end

function modifier_primal_beast_pulverize_custom_scepter:OnIntervalThink()
	if not IsServer() then
		return
	end
	CreateModifierThinker(
		self.parent,
		self.ability,
		"modifier_primal_beast_pulverize_custom_scepter_wave",
		{},
		self.parent:GetAbsOrigin(),
		self.parent:GetTeamNumber(),
		false
	)
	self.count = self.count + 1

	if self.count < self.max then
		return
	end
	self:Destroy()
end

modifier_primal_beast_pulverize_custom_scepter_wave = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_scepter_wave:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.origin = self.parent:GetAbsOrigin()
	self.speed = self.ability.scepter_speed
	self.distance = self.ability.scepter_distance
	self.width = self.ability.scepter_width
	self.split = self.ability.scepter_split
	self.angle = self.ability.scepter_split_angle / 2
	self.legendary = self.ability.talents.has_q7 == 1 or self.ability.talents.has_e7 == 1
	self.dirs = {}
	self.targets = {}

	local forward = self.caster:GetForwardVector()

	for i = 1, self.ability.scepter_count do
		local dir = RotatePosition(Vector(0, 0, 0), QAngle(0, 360 / self.ability.scepter_count * i, 0), forward)
		table.insert(self.dirs, dir)
		self:Projectile(self.origin, dir, self.split)
	end

	self:StartIntervalThink(FrameTime())
end

function modifier_primal_beast_pulverize_custom_scepter_wave:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.caster) then
		self:Destroy()
		return
	end

	local radius = self.speed * self:GetElapsedTime()

	if not self.splitted and radius >= self.split then
		self.splitted = true
		for _, dir in pairs(self.dirs) do
			local point = self.origin + dir * self.split
			self:Projectile(
				point,
				RotatePosition(Vector(0, 0, 0), QAngle(0, self.angle, 0), dir),
				self.distance - self.split
			)
			self:Projectile(
				point,
				RotatePosition(Vector(0, 0, 0), QAngle(0, -self.angle, 0), dir),
				self.distance - self.split
			)
			EmitSoundOnLocationWithCaster(point, "Hero_PrimalBeast.Uproar.Projectile.Split", self.caster)
		end
	end

	for _, target in pairs(self.caster:FindTargets(math.min(radius, self.distance), self.origin)) do
		if not self.targets[target] and (target:GetAbsOrigin() - self.origin):Length2D() > radius - self.width then
			self.targets[target] = true
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_primal_beast_pulverize_custom_scepter_break",
				{ duration = self.ability.scepter_break * (1 - target:GetStatusResistance()) }
			)
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_primal_beast_pulverize_custom_scepter_slow",
				{ duration = self.ability.scepter_slow_duration }
			)
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_primal_beast_pulverize_custom_scepter_debuff",
				{ duration = self.ability.scepter_debuff }
			)
			target:EmitSound("Hero_PrimalBeast.Uproar.Target")

			local particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_alchemist/alchemist_unstable_concoction_explosion.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				target
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				Vector(0, 0, 0),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle)
			target:EmitSound("PBeast.Attack_scepter")

			if self.legendary then
				self.caster.beast_scepter = true
				self.caster:PerformAttack(
					target,
					true,
					true,
					true,
					true,
					false,
					false,
					true,
					{ damage = "beast_scepter" },
					true
				)
				self.caster.beast_scepter = false
			elseif IsValid(self.caster.trample_ability) then
				DoDamage(
					{
						victim = target,
						attacker = self.caster,
						ability = self.ability,
						damage = self.caster.trample_ability:GetDamage(target, 0) * self.ability.scepter_damage,
						damage_type = DAMAGE_TYPE_MAGICAL,
					},
					"Scepter"
				)
			end
		end
	end

	if radius < self.distance then
		return
	end
	self:Destroy()
end

function modifier_primal_beast_pulverize_custom_scepter_wave:Projectile(point, dir, distance)
	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_pulverize_tectonic_shift_projectile.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, point)
	ParticleManager:SetParticleControl(particle, 1, dir * self.speed)
	ParticleManager:SetParticleControl(particle, 2, Vector(1, 0, 0))
	ParticleManager:SetParticleControl(particle, 3, Vector(0, distance / self.speed, 0))
	self:AddParticle(particle, false, false, -1, false, false)
end

modifier_primal_beast_pulverize_custom_scepter_break = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_scepter_break:OnCreated()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic_gameplay/generic_break.vpcf", self, true)
end

function modifier_primal_beast_pulverize_custom_scepter_break:CheckState()
	return {
		[MODIFIER_STATE_PASSIVES_DISABLED] = true,
	}
end

modifier_primal_beast_pulverize_custom_scepter_slow = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_scepter_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.scepter_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", self, true)
end

function modifier_primal_beast_pulverize_custom_scepter_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_primal_beast_pulverize_custom_scepter_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_primal_beast_pulverize_custom_scepter_debuff = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_scepter_debuff:OnCreated()
	self.ability = self:GetAbility()

	local legendary = self.ability.talents.has_q7 == 1 or self.ability.talents.has_e7 == 1
	self.armor = legendary and self.ability.scepter_armor or 0
	self.magic = legendary and 0 or self.ability.scepter_magic
end

function modifier_primal_beast_pulverize_custom_scepter_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_primal_beast_pulverize_custom_scepter_debuff:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_primal_beast_pulverize_custom_scepter_debuff:GetModifierMagicalResistanceBonus()
	return self.magic
end

modifier_primal_beast_pulverize_custom_perma = class(mod_hidden)
function modifier_primal_beast_pulverize_custom_perma:IsHidden()
	return self.ability.talents.has_r1 == 0 or self:GetStackCount() >= self.ability.talents.r1_max
end
function modifier_primal_beast_pulverize_custom_perma:RemoveOnDeath()
	return false
end
function modifier_primal_beast_pulverize_custom_perma:GetTexture()
	return "buffs/primal_beast/pulverize_1"
end
function modifier_primal_beast_pulverize_custom_perma:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r1_max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
	self:OnRefresh()
end

function modifier_primal_beast_pulverize_custom_perma:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_primal_beast_pulverize_custom_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r1 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/legion_commander/lc_odd_proc_.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_primal_beast_pulverize_custom_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_primal_beast_pulverize_custom_perma:OnTooltip()
	return self:GetDamage()
end

function modifier_primal_beast_pulverize_custom_perma:GetDamage()
	return self:GetStackCount() * self.ability.talents.r1_damage / self.max
end

primal_beast_rock_throw_custom = class({})
primal_beast_rock_throw_custom.talents = {}

function primal_beast_rock_throw_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "primal_beast_rock_throw", self)
end
primal_beast_rock_throw_custom.fragment_angle = 30

function primal_beast_rock_throw_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_rock_throw_pickup.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_primal_beast/primal_beast_rock_throw_arc.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_rock_throw_preview.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_rock_throw_impact.vpcf",
		context
	)
end

function primal_beast_rock_throw_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_damage = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "damage", true) / 100,
			r7_creeps = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "creeps", true),
			r7_stun = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "stun", true),
			r7_talent_cd = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "talent_cd", true),
			r7_mana = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "mana", true),
			r7_cast = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "cast", true),
			r7_range = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "range", true),
			r7_min_range = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "min_range", true),
			r7_speed = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "speed", true),
			r7_radius = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "radius", true),
			r7_fragment_radius = caster:GetTalentValue("modifier_primal_beast_pulverize_7", "fragment_radius", true),
			r7_fragment_distance = caster:GetTalentValue(
				"modifier_primal_beast_pulverize_7",
				"fragment_distance",
				true
			),
		}
	end
end

function primal_beast_rock_throw_custom:GetCastRange(vLocation, hTarget)
	if IsServer() then
		return 999999
	end
	return self.talents.r7_range or 0
end

function primal_beast_rock_throw_custom:GetCooldown(iLevel)
	return self.talents.r7_talent_cd or 0
end

function primal_beast_rock_throw_custom:GetManaCost(iLevel)
	return self.talents.r7_mana or 0
end

function primal_beast_rock_throw_custom:GetCastPoint()
	return self.talents.r7_cast or 0
end

function primal_beast_rock_throw_custom:GetPlaybackRateOverride()
	return 1.5
end

function primal_beast_rock_throw_custom:GetAOERadius()
	return self.talents.r7_radius or 0
end

function primal_beast_rock_throw_custom:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
end

function primal_beast_rock_throw_custom:OnAbilityPhaseStart()
	self.pickup = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_rock_throw_pickup.vpcf",
		PATTACH_POINT_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		self.pickup,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_throw_attack",
		self.caster:GetAbsOrigin(),
		true
	)
	return true
end

function primal_beast_rock_throw_custom:OnAbilityPhaseInterrupted()
	if not self.pickup then
		return
	end

	ParticleManager:DestroyParticle(self.pickup, true)
	ParticleManager:ReleaseParticleIndex(self.pickup)
	self.pickup = nil
end

function primal_beast_rock_throw_custom:OnSpellStart()
	if self.pickup then
		ParticleManager:ReleaseParticleIndex(self.pickup)
		self.pickup = nil
	end

	local origin = self.caster:GetAbsOrigin()
	local dir = self:GetCursorPosition() - origin
	dir.z = 0

	if dir:Length2D() < 1 then
		dir = self.caster:GetForwardVector()
		dir.z = 0
	end

	local max_range = self.talents.r7_range + self.caster:GetCastRangeBonus()
	local distance = math.min(math.max(dir:Length2D(), self.talents.r7_min_range), max_range)
	dir = dir:Normalized()

	local point = GetGroundPosition(origin + dir * distance, nil)
	local start = self.caster:GetAttachmentOrigin(self.caster:ScriptLookupAttachment("attach_throw_attack"))
	local time = distance / self.talents.r7_speed

	self.caster:EmitSound("Hero_PrimalBeast.RockThrow.Cast")
	self.caster:LogProc("primal_beast_rock_throw_custom", distance)

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_primal_beast_rock_throw_custom",
		{ time = time, dir_x = dir.x, dir_y = dir.y, start_x = start.x, start_y = start.y, start_z = start.z },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_primal_beast_rock_throw_custom = class(mod_hidden)
function modifier_primal_beast_rock_throw_custom:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.point = self.parent:GetAbsOrigin()
	self.dir = Vector(params.dir_x, params.dir_y, 0)
	self.start = Vector(params.start_x, params.start_y, 0)
	self.hit = {}
	self.fragments = {}
	self.particles = {}
	self.damageTable = { attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self:CreateRock(
		Vector(params.start_x, params.start_y, params.start_z),
		self.point,
		self.ability.talents.r7_radius,
		params.time
	)

	self.parent:EmitSound("Hero_PrimalBeast.RockThrow.Projectile")
	self:StartIntervalThink(params.time)
end

function modifier_primal_beast_rock_throw_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	for _, particle in pairs(self.particles) do
		ParticleManager:DestroyParticle(particle, false)
		ParticleManager:ReleaseParticleIndex(particle)
	end
	self.particles = {}

	if self.landed then
		for _, point in pairs(self.fragments) do
			self:Impact(point, self.ability.talents.r7_fragment_radius)
		end

		self:Destroy()
		return
	end

	self.landed = true
	self:Impact(self.point, self.ability.talents.r7_radius)

	local time = self.ability.talents.r7_fragment_distance / self.ability.talents.r7_speed

	for i = -1, 1 do
		local point = RotatePosition(
			self.point,
			QAngle(0, i * self.ability.fragment_angle, 0),
			self.point + self.dir * self.ability.talents.r7_fragment_distance
		)
		point = GetGroundPosition(point, nil)
		table.insert(self.fragments, point)

		self:CreateRock(self.point, point, self.ability.talents.r7_fragment_radius, time)
	end

	self:StartIntervalThink(time)
end

function modifier_primal_beast_rock_throw_custom:CreateRock(start, point, radius, time)
	local rock = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_rock_throw_arc.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(rock, 0, start)
	ParticleManager:SetParticleControl(rock, 1, point)
	ParticleManager:SetParticleControl(rock, 2, Vector((point - start):Length2D() / time, 0, 0))

	local preview = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_rock_throw_preview.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(preview, 0, point)
	ParticleManager:SetParticleControl(preview, 1, Vector(radius, 0, -2 * radius / time))
	ParticleManager:SetParticleControl(preview, 2, Vector(time, 0, 0))

	self:AddParticle(rock, false, false, -1, false, false)
	self:AddParticle(preview, false, false, -1, false, false)
	table.insert(self.particles, rock)
	table.insert(self.particles, preview)

	AddFOWViewer(self.caster:GetTeamNumber(), point, radius, time + 0.5, false)
end

function modifier_primal_beast_rock_throw_custom:Impact(point, radius)
	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_rock_throw_impact.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, point)
	ParticleManager:SetParticleControl(particle, 3, point)
	ParticleManager:ReleaseParticleIndex(particle)

	EmitSoundOnLocationWithCaster(point, "Hero_PrimalBeast.RockThrow.Impact", self.caster)

	for _, target in pairs(self.caster:FindTargets(radius, point)) do
		if not self.hit[target] then
			self.hit[target] = true
			self.caster:LogProc("modifier_primal_beast_pulverize_7", (point - self.start):Length2D(), target)

			self.damageTable.victim = target
			self.damageTable.damage = target:IsHero() and target:GetHealth() * self.ability.talents.r7_damage
				or self.ability.talents.r7_creeps
			DoDamage(self.damageTable)

			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_generic_stun",
				{ duration = self.ability.talents.r7_stun * (1 - target:GetStatusResistance()) }
			)
			target:EmitSound("Hero_PrimalBeast.RockThrow.Stun")

			if not self.hero_hit and target:IsValidKill(self.caster) and IsValid(self.caster.pulverize_ability) then
				self.hero_hit = true
				self.caster.pulverize_ability:AddLegendaryStack("rock")
			end
		end
	end
end