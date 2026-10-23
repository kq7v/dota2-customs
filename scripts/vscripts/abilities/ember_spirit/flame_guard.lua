--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_ember_spirit_flame_guard_custom",
	"abilities/ember_spirit/flame_guard",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_ember_spirit_flame_guard_custom_tracker",
	"abilities/ember_spirit/flame_guard",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_flame_guard_custom_stats",
	"abilities/ember_spirit/flame_guard",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_guard_3"
)
LinkLuaModifier(
	"modifier_ember_spirit_flame_guard_custom_max_visual",
	"abilities/ember_spirit/flame_guard",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_flame_guard_custom_stun_cd",
	"abilities/ember_spirit/flame_guard",
	LUA_MODIFIER_MOTION_NONE
)

ember_spirit_flame_guard_custom = class({})
ember_spirit_flame_guard_custom.talents = {}

function ember_spirit_flame_guard_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_ember_spirit/ember_spirit_flameguard.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/omniknight/hammer_ti6_immortal/ember_shield_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/guard_stack.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/guard_resist_max.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/chains_bkb.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/chains_buff_ready.vpcf", context)
end

function ember_spirit_flame_guard_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e1_burn = 0,
			e1_damage = 0,

			e2_range = 0,
			e2_shield = 0,

			has_e3 = 0,
			e3_agi = 0,
			e3_str = 0,
			e3_duration = caster:GetTalentValue("modifier_ember_guard_3", "duration", true),
			e3_bonus = caster:GetTalentValue("modifier_ember_guard_3", "bonus", true),
			e3_max = caster:GetTalentValue("modifier_ember_guard_3", "max", true),

			has_e4 = 0,
			e4_duration = caster:GetTalentValue("modifier_ember_guard_4", "duration", true),
			e4_duration_legendary = caster:GetTalentValue("modifier_ember_guard_4", "duration_legendary", true),
			e4_stun = caster:GetTalentValue("modifier_ember_guard_4", "stun", true),
			e4_talent_cd = caster:GetTalentValue("modifier_ember_guard_4", "talent_cd", true),
			e4_chance = caster:GetTalentValue("modifier_ember_guard_4", "chance", true),

			has_e7 = 0,
			e7_shield_cd = caster:GetTalentValue("modifier_ember_guard_7", "shield_cd", true),
			e7_duration = caster:GetTalentValue("modifier_ember_guard_7", "duration", true),
			e7_damage_inc = caster:GetTalentValue("modifier_ember_guard_7", "damage_inc", true) / 100,
			e7_speed = caster:GetTalentValue("modifier_ember_guard_7", "speed", true),
			e7_max = caster:GetTalentValue("modifier_ember_guard_7", "max", true),

			h2_magic = 0,
			h2_armor = 0,

			has_h6 = 0,
			h6_cd = caster:GetTalentValue("modifier_ember_hero_6", "cd", true),
			h6_bkb = caster:GetTalentValue("modifier_ember_hero_6", "bkb", true),
			h6_status = caster:GetTalentValue("modifier_ember_hero_6", "status", true),
		}
	end

	if caster:HasTalent("modifier_ember_guard_1") then
		self.talents.e1_burn = caster:GetTalentValue("modifier_ember_guard_1", "burn") / 100
		self.talents.e1_damage = caster:GetTalentValue("modifier_ember_guard_1", "damage")
	end

	if caster:HasTalent("modifier_ember_guard_2") then
		self.talents.e2_range = caster:GetTalentValue("modifier_ember_guard_2", "range")
		self.talents.e2_shield = caster:GetTalentValue("modifier_ember_guard_2", "shield") / 100
	end

	if caster:HasTalent("modifier_ember_guard_3") then
		self.talents.has_e3 = 1
		self.talents.e3_agi = caster:GetTalentValue("modifier_ember_guard_3", "agi") / 100
		self.talents.e3_str = caster:GetTalentValue("modifier_ember_guard_3", "str") / 100
		if IsServer() then
			caster:AddPercentStat({ agi = self.talents.e3_agi, str = self.talents.e3_str }, self.tracker)
		end
	end

	if caster:HasTalent("modifier_ember_guard_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_ember_guard_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_ember_hero_2") then
		self.talents.h2_magic = caster:GetTalentValue("modifier_ember_hero_2", "magic")
		self.talents.h2_armor = caster:GetTalentValue("modifier_ember_hero_2", "armor")
	end

	if caster:HasTalent("modifier_ember_hero_6") then
		self.talents.has_h6 = 1
	end

	if not IsServer() then
		return
	end

	local guard_mod = caster:FindModifierByName("modifier_ember_spirit_flame_guard_custom")
	if guard_mod then
		guard_mod:UpdateEvents()
	end
end

function ember_spirit_flame_guard_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "ember_spirit_flame_guard", self)
end

function ember_spirit_flame_guard_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_ember_spirit_flame_guard_custom_tracker"
end

function ember_spirit_flame_guard_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.has_h6 == 1 and self.talents.h6_cd or 0)
end

function ember_spirit_flame_guard_custom:GetRadius()
	return (self.radius or 0) + (self.talents.e2_range or 0)
end

function ember_spirit_flame_guard_custom:GetCastRange(vLocation, hTarget)
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function ember_spirit_flame_guard_custom:GetDuration()
	return
end

function ember_spirit_flame_guard_custom:OnSpellStart()
	local duration = self.duration + (self.talents.has_e4 == 1 and self.talents.e4_duration or 0)
	if self.talents.has_e7 == 1 then
		duration = nil
	end

	self.caster:EmitSound("Hero_EmberSpirit.FlameGuard.Cast")
	self.caster:RemoveModifierByName("modifier_ember_spirit_flame_guard_custom")
	self.caster:AddNewModifier(self.caster, self, "modifier_ember_spirit_flame_guard_custom", { duration = duration })
end

modifier_ember_spirit_flame_guard_custom = class(mod_visible)
function modifier_ember_spirit_flame_guard_custom:OnCreated(keys)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max_shield = self.ability.absorb_amount + self.ability.talents.e2_shield * self.parent:GetMaxHealth()

	self.interval = self.ability.tick_interval
	self.count = 0
	self.active_radius = self.ability:GetRadius()
	self.damage_per_second = self.ability.damage_per_second
	self.shield = self.max_shield
	self.shield_count = 0

	if not IsServer() then
		return
	end

	self.damageTable = { attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self.duration = self:GetRemainingTime()
	if self.ability.talents.has_e7 == 1 then
		self.interval = 0.1
		self.duration = self.ability.talents.e7_duration
			+ (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_duration_legendary or 0)
		self.max_time = self.duration
		self:OnIntervalThink()
	end

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_ember_spirit/ember_spirit_flameguard.vpcf",
		self
	)
	self.particle_index = ParticleManager:CreateParticle(pfx_name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(self.particle_index, 2, Vector(self.active_radius, 0, 0))
	ParticleManager:SetParticleControl(self.particle_index, 3, Vector(140, 0, 0))
	self:AddParticle(self.particle_index, false, false, -1, false, false)

	self.ability:EndCd()
	self.RemoveForDuel = true
	self:SetHasCustomTransmitterData(true)

	self:UpdateEvents()

	self.parent:EmitSound("Hero_EmberSpirit.FlameGuard.Loop")
	self:StartIntervalThink(self.interval)
end

function modifier_ember_spirit_flame_guard_custom:UpdateEvents()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e3 == 0 and self.ability.talents.has_e7 == 0 then
		return
	end

	self.parent:AddProc(self, { land = true })
end

function modifier_ember_spirit_flame_guard_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end

	if self.ability.talents.has_e7 == 1 then
		if
			not self.parent:HasModifier("modifier_ember_spirit_activate_fire_remnant_custom_caster")
			and not self.parent:HasModifier("modifier_ember_spirit_sleight_of_fist_custom_caster")
		then
			self.duration = self.duration - self.interval
		end

		self.count = self.count + self.interval
		self.shield_count = self.shield_count + self.interval
		if self.duration <= 0 then
			self:Destroy()
			return
		end

		if self.shield_count >= self.ability.talents.e7_shield_cd then
			self.shield_count = 0
			self.max_shield = self.ability.absorb_amount + self.ability.talents.e2_shield * self.parent:GetMaxHealth()
			self.shield = self.max_shield

			self.parent:EmitSound("Ember.Guard_Lowhp")
			self.parent:StopSound("Hero_EmberSpirit.FlameGuard.Loop")
			self.parent:EmitSound("Hero_EmberSpirit.FlameGuard.Loop")

			local effect_target = ParticleManager:CreateParticle(
				"particles/econ/items/omniknight/hammer_ti6_immortal/ember_shield_heal.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControl(effect_target, 1, Vector(200, 100, 100))
			ParticleManager:ReleaseParticleIndex(effect_target)
			self.parent:Purge(false, true, false, true, true)

			self:SendBuffRefreshToClients()
		end

		self.parent:UpdateUIshort({
			max_time = self.max_time,
			time = self.duration,
			stack = "+" .. math.floor(self.ability.talents.e7_damage_inc * self:GetStackCount() * 100) .. "%",
			style = "EmberGuard",
		})
		if self.count < self.ability.tick_interval then
			return
		end
		self.count = 0
	end

	local damage = (self.damage_per_second + self.ability.talents.e1_burn * self.parent:GetAverageTrueAttackDamage(nil))
	if self.ability.talents.has_e7 == 1 then
		damage = damage * (1 + self.ability.talents.e7_damage_inc * self:GetStackCount())
	end
	self.damageTable.damage = damage * self.ability.tick_interval

	local targets = self.parent:FindTargets(self.active_radius)

	if self.parent.chains_ability and self.parent.chains_ability.tracker then
		self.parent.chains_ability.tracker:ProcCd(#targets > 0)
	end

	for _, enemy in pairs(targets) do
		if
			self.ability.talents.has_e4 == 1
			and not enemy:HasModifier("modifier_ember_spirit_flame_guard_custom_stun_cd")
			and RollPseudoRandomPercentage(self.ability.talents.e4_chance, 8350, self.parent)
		then
			enemy:EmitSound("Ember.Remnant_stun")
			local particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				enemy
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				enemy,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				Vector(0, 0, 0),
				true
			)
			ParticleManager:SetParticleControl(particle, 1, enemy:GetOrigin())
			ParticleManager:ReleaseParticleIndex(particle)

			enemy:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_ember_spirit_flame_guard_custom_stun_cd",
				{ duration = self.ability.talents.e4_talent_cd }
			)
			enemy:AddNewModifier(
				self.parent,
				self.parent:BkbAbility(self.ability, true),
				"modifier_bashed",
				{ duration = (1 - enemy:GetStatusResistance()) * self.ability.talents.e4_stun }
			)
		end
		self.damageTable.victim = enemy
		DoDamage(self.damageTable)
	end
end

function modifier_ember_spirit_flame_guard_custom:OnDestroy()
	if not IsServer() then
		return
	end

	self.ended = true
	if not self.parent:HasModifier("modifier_ember_spirit_flame_guard_custom_stats") then
		self.parent:RemoveModifierByName("modifier_ember_spirit_flame_guard_custom_max_visual")
	end

	self.ability:StartCd()
	self.parent:StopSound("Hero_EmberSpirit.FlameGuard.Loop")

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "EmberGuard" })
end

function modifier_ember_spirit_flame_guard_custom:AddCustomTransmitterData()
	return {
		shield = self.shield,
	}
end

function modifier_ember_spirit_flame_guard_custom:HandleCustomTransmitterData(data)
	self.shield = data.shield
end

function modifier_ember_spirit_flame_guard_custom:GetProcChance()
	return 100
end

function modifier_ember_spirit_flame_guard_custom:AttackProc(params, name)
	if self.ability.talents.has_e3 == 1 and params.target:IsRealHero() then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_ember_spirit_flame_guard_custom_stats",
			{ duration = self.ability.talents.e3_duration }
		)
	end

	if self.ability.talents.has_e7 == 0 then
		return
	end
	if not self.max_time then
		return
	end

	self.duration = self.max_time
	if params.target:IsRealHero() and self:GetStackCount() < self.ability.talents.e7_max then
		self:IncrementStackCount()
		if
			self:GetStackCount() >= self.ability.talents.e7_max / 2
			and not self.parent:HasModifier("modifier_ember_spirit_flame_guard_custom_max_visual")
		then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_ember_spirit_flame_guard_custom_max_visual",
				{}
			)
		end
	end
end

function modifier_ember_spirit_flame_guard_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_ember_spirit_flame_guard_custom:GetModifierAttackSpeedBonus_Constant()
	if self.ability.talents.has_e7 == 0 then
		return
	end
	return self.ability.talents.e7_speed
end

function modifier_ember_spirit_flame_guard_custom:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h2_armor
end

function modifier_ember_spirit_flame_guard_custom:GetModifierIncomingDamageConstant(params)
	if self.parent:HasModifier("modifier_generic_shield") then
		return
	end

	if IsClient() then
		if params.report_max then
			return self.max_shield
		else
			return self.shield
		end
	end

	if not IsServer() then
		return
	end
	if self.shield <= 0 then
		return
	end

	local damage = math.min(params.damage, self.shield)

	if self.parent:GetQuest() == "Ember.Quest_7" and params.attacker:IsRealHero() then
		self.parent:UpdateQuest(damage)
	end

	self.parent:AddShieldInfo({ shield_mod = self, healing = damage, healing_type = "shield" })

	self.shield = self.shield - damage
	if self.shield <= 0 and self.ability.talents.has_h6 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ duration = self.ability.talents.h6_bkb, sound = 1, effect = 2 }
		)
	end
	self:SendBuffRefreshToClients()

	return -damage
end

modifier_ember_spirit_flame_guard_custom_tracker = class(mod_hidden)
function modifier_ember_spirit_flame_guard_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.absorb_amount = self.ability:GetSpecialValueFor("absorb_amount")
	self.ability.tick_interval = self.ability:GetSpecialValueFor("tick_interval")
	self.ability.damage_per_second = self.ability:GetSpecialValueFor("damage_per_second")
end

function modifier_ember_spirit_flame_guard_custom_tracker:OnRefresh()
	self.ability.absorb_amount = self.ability:GetSpecialValueFor("absorb_amount")
	self.ability.damage_per_second = self.ability:GetSpecialValueFor("damage_per_second")
end

function modifier_ember_spirit_flame_guard_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_ember_spirit_flame_guard_custom_tracker:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h2_magic
end

function modifier_ember_spirit_flame_guard_custom_tracker:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_status
end

function modifier_ember_spirit_flame_guard_custom_tracker:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.e1_damage
end

function modifier_ember_spirit_flame_guard_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.e2_range
end

modifier_ember_spirit_flame_guard_custom_stats = class(mod_visible)
function modifier_ember_spirit_flame_guard_custom_stats:GetTexture()
	return "buffs/ember_spirit/guard_3"
end
function modifier_ember_spirit_flame_guard_custom_stats:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.max = self.ability.talents.e3_max
	self.agi = self.ability.talents.e3_agi * (self.ability.talents.e3_bonus - 1) / self.max
	self.str = self.ability.talents.e3_str * (self.ability.talents.e3_bonus - 1) / self.max
	self:OnRefresh()
end

function modifier_ember_spirit_flame_guard_custom_stats:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:AddPercentStat({ agi = self.agi * self:GetStackCount(), str = self.str * self:GetStackCount() }, self)

	if
		self:GetStackCount() >= self.max
		and not self.parent:HasModifier("modifier_ember_spirit_flame_guard_custom_max_visual")
		and self.parent:HasModifier("modifier_ember_spirit_flame_guard_custom")
	then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_ember_spirit_flame_guard_custom_max_visual", {})
	end
end

function modifier_ember_spirit_flame_guard_custom_stats:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_ember_spirit_flame_guard_custom_max_visual")
end

modifier_ember_spirit_flame_guard_custom_max_visual = class(mod_hidden)
function modifier_ember_spirit_flame_guard_custom_max_visual:GetStatusEffectName()
	return "particles/status_fx/status_effect_legion_commander_duel.vpcf"
end
function modifier_ember_spirit_flame_guard_custom_max_visual:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_ember_spirit_flame_guard_custom_max_visual:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:EmitSound("Ember.Chain_speed")
	self.parent:EmitSound("Ember.Chain_speed2")
	self.parent:GenericParticle("particles/ember_spirit/chains_bkb.vpcf", self)
	self.sword_effect = self.parent:GenericParticle("particles/ember_spirit/chains_buff_ready.vpcf", self, true)
end

function modifier_ember_spirit_flame_guard_custom_max_visual:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_ember_spirit_flame_guard_custom_max_visual:GetModifierModelScale()
	return 25
end

modifier_ember_spirit_flame_guard_custom_stun_cd = class(mod_hidden)