--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_searing_chains_custom_debuff",
	"abilities/ember_spirit/searing_chains",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_searing_chains_custom_tracker",
	"abilities/ember_spirit/searing_chains",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_searing_chains_custom_legendary_attacks",
	"abilities/ember_spirit/searing_chains",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_searing_chains_custom_legendary_damage",
	"abilities/ember_spirit/searing_chains",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_searing_chains_custom_legendary_stack",
	"abilities/ember_spirit/searing_chains",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_chain_7"
)
LinkLuaModifier(
	"modifier_searing_chains_custom_armor",
	"abilities/ember_spirit/searing_chains",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_chain_1"
)

ember_spirit_searing_chains_custom = class({})
ember_spirit_searing_chains_custom.talents = {}

function ember_spirit_searing_chains_custom:CreateTalent()
	self:ToggleAutoCast()
end

function ember_spirit_searing_chains_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_ember_spirit/ember_spirit_weapon_blur_both.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ember_spirit/ember_spirit_weapon_blur.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_weapon_blur_overhead.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_searing_chains_cast.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_searing_chains_start.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_searing_chains_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/chains_proc_legendary.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/vindicators_axe_armor.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_parry.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/chains_bkb.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_legion_commander_duel.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/chains_buff_ready.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_stack.vpcf", context)
end

function ember_spirit_searing_chains_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_armor = 0,
			q1_duration = caster:GetTalentValue("modifier_ember_chain_1", "duration", true),

			q2_duration = 0,
			q2_cd = 0,

			has_q3 = 0,
			q3_heal = 0,
			q3_crit = 0,
			q3_bonus = caster:GetTalentValue("modifier_ember_chain_3", "bonus", true),
			q3_chance = caster:GetTalentValue("modifier_ember_chain_3", "chance", true),

			has_q4 = 0,
			q4_damage_reduce = caster:GetTalentValue("modifier_ember_chain_4", "damage_reduce", true),
			q4_distance = caster:GetTalentValue("modifier_ember_chain_4", "distance", true),
			q4_duration = caster:GetTalentValue("modifier_ember_chain_4", "duration", true),
			q4_radius = caster:GetTalentValue("modifier_ember_chain_4", "radius", true),

			has_q7 = 0,
			q7_damage = caster:GetTalentValue("modifier_ember_chain_7", "damage", true),
			q7_interval = caster:GetTalentValue("modifier_ember_chain_7", "interval", true),
			q7_cd_inc = caster:GetTalentValue("modifier_ember_chain_7", "cd_inc", true) / 100,
			q7_effect_duration = caster:GetTalentValue("modifier_ember_chain_7", "effect_duration", true),
			q7_attacks = caster:GetTalentValue("modifier_ember_chain_7", "attacks", true),
			q7_damage_inc = caster:GetTalentValue("modifier_ember_chain_7", "damage_inc", true),
			q7_max = caster:GetTalentValue("modifier_ember_chain_7", "max", true),
			q7_mana = caster:GetTalentValue("modifier_ember_chain_7", "mana", true) / 100,

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_ember_chain_1") then
		self.talents.has_q1 = 1
		self.talents.q1_armor = caster:GetTalentValue("modifier_ember_chain_1", "armor")
	end

	if caster:HasTalent("modifier_ember_chain_2") then
		self.talents.q2_duration = caster:GetTalentValue("modifier_ember_chain_2", "duration")
		self.talents.q2_cd = caster:GetTalentValue("modifier_ember_chain_2", "cd")
	end

	if caster:HasTalent("modifier_ember_chain_3") then
		self.talents.has_q3 = 1
		self.talents.q3_heal = caster:GetTalentValue("modifier_ember_chain_3", "heal") / 100
		self.talents.q3_crit = caster:GetTalentValue("modifier_ember_chain_3", "crit")
		caster:AddRecordDestroyEvent(self.tracker, true)
		caster:AddLifesteal(self.tracker, {
			name = "modifier_ember_chain_3",
			text = true,
			proc = "LifestealHit",
			value = function(params)
				if not self.tracker.records[params.record] then
					return 0
				end
				return self.talents.q3_heal
			end,
		})
	end

	if caster:HasTalent("modifier_ember_chain_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_ember_chain_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_ember_fist_7") then
		self.talents.has_w7 = 1
	end
end

function ember_spirit_searing_chains_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_searing_chains_custom_tracker"
end

function ember_spirit_searing_chains_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + (self.talents.has_q4 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0)
end

function ember_spirit_searing_chains_custom:GetAbilityTargetFlags()
	if self.talents.has_q4 == 1 then
		return DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
	end
	return DOTA_UNIT_TARGET_FLAG_NONE
end

function ember_spirit_searing_chains_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q2_cd or 0)
end

function ember_spirit_searing_chains_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) * (1 + (self.talents.has_q7 == 1 and self.talents.q7_mana or 0))
end

function ember_spirit_searing_chains_custom:GetRadius()
	return (self.radius or 0) + (self.talents.has_q4 == 1 and self.talents.q4_radius or 0)
end

function ember_spirit_searing_chains_custom:GetCastRange(vLocation, hTarget)
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function ember_spirit_searing_chains_custom:OnSpellStart()
	local caster_loc = self.caster:GetAbsOrigin()
	local duration = self.duration + self.talents.q2_duration
	local radius = self:GetRadius()
	local ability = self.talents.has_q4 == 1 and self.caster:BkbAbility(self, true) or self

	self.caster:EmitSound("Hero_EmberSpirit.SearingChains.Cast")

	local cast_pfx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_searing_chains_cast.vpcf",
		PATTACH_ABSORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControl(cast_pfx, 0, caster_loc)
	ParticleManager:SetParticleControl(cast_pfx, 1, Vector(radius, 1, 1))
	ParticleManager:ReleaseParticleIndex(cast_pfx)

	local targets =
		self.caster:FindTargets(radius, nil, nil, DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE)
	for _, target in pairs(targets) do
		if self.talents.has_q1 == 1 then
			target:AddNewModifier(
				self.caster,
				ability,
				"modifier_searing_chains_custom_armor",
				{ duration = self.talents.q1_duration }
			)
		end

		if self.talents.has_q7 == 1 then
			target:RemoveModifierByName("modifier_searing_chains_custom_legendary_attacks")
			target:AddNewModifier(self.caster, self, "modifier_searing_chains_custom_legendary_attacks", {})
		end

		target:AddNewModifier(
			self.caster,
			ability,
			"modifier_searing_chains_custom_debuff",
			{ duration = duration * (1 - target:GetStatusResistance()) }
		)

		target:EmitSound("Hero_EmberSpirit.SearingChains.Target")
		local impact_pfx = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_ember_spirit/ember_spirit_searing_chains_start.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControl(impact_pfx, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			impact_pfx,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(impact_pfx)

		if
			self.talents.has_q4 == 1
			and (self.caster:GetAbsOrigin() - target:GetAbsOrigin()):Length2D() > self.talents.q4_distance
			and self:GetAutoCastState()
		then
			local dir = (self.caster:GetAbsOrigin() - target:GetAbsOrigin()):Normalized()
			local distance = (self.caster:GetAbsOrigin() - target:GetAbsOrigin()):Length2D()

			distance = math.max(0, distance - self.talents.q4_distance)
			local point = target:GetAbsOrigin() + dir * distance

			local mod = target:AddNewModifier(self.caster, self.caster:BkbAbility(self, true), "modifier_generic_arc", {
				target_x = point.x,
				target_y = point.y,
				distance = distance,
				duration = self.talents.q4_duration,
				height = 0,
				fix_end = false,
				isStun = false,
				activity = ACT_DOTA_FLAIL,
			})
			if mod then
				target:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", mod)
			end
		end
	end
end

modifier_searing_chains_custom_tracker = class(mod_hidden)
function modifier_searing_chains_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.chains_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.damage_per_second = self.ability:GetSpecialValueFor("damage_per_second")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.tick_interval = self.ability:GetSpecialValueFor("tick_interval")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.records = {}
	self.interval = 0.5
	self.is_active = false
end

function modifier_searing_chains_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.damage_per_second = self.ability:GetSpecialValueFor("damage_per_second")
end

function modifier_searing_chains_custom_tracker:ProcCd(is_active)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end

	if not is_active then
		self.is_active = false
	end

	if is_active and not self.is_active then
		self.is_active = true
		self:StartIntervalThink(self.interval)
	end
end

function modifier_searing_chains_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:CdAbility(self.ability, self.interval * self.ability.talents.q7_cd_inc, nil, "modifier_ember_chain_7")

	if not self.parent:HasModifier("modifier_ember_spirit_flame_guard_custom") or not self.is_active then
		self.is_active = false
		self:StartIntervalThink(-1)
	end
end

function modifier_searing_chains_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_searing_chains_custom_tracker:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	self.records[params.record] = nil
end

function modifier_searing_chains_custom_tracker:GetCritChance(target)
	if self.ability.talents.has_q3 == 0 then
		return 0
	end
	if target and target:HasModifier("modifier_searing_chains_custom_debuff") then
		return self.ability.talents.q3_chance * self.ability.talents.q3_bonus, 1292
	end

	return self.ability.talents.q3_chance, 1291
end

function modifier_searing_chains_custom_tracker:GetCritDamage()
	return self.ability.talents.q3_crit
end

function modifier_searing_chains_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q3 == 0 then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	local target = params.target
	local chance, index = self:GetCritChance(target)

	if not RollPseudoRandomPercentage(chance, index, self.parent) then
		return
	end
	self.records[params.record] = true

	if
		not self.parent:HasModifier("modifier_searing_chains_custom_legendary_damage")
		and not self.parent:HasModifier("modifier_ember_spirit_sleight_of_fist_custom_caster")
	then
		local cast_pfx = ParticleManager:CreateParticle(
			"particles/ember_spirit/chains_proc_legendary.vpcf",
			PATTACH_ABSORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControl(cast_pfx, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(cast_pfx, 0, self.parent:GetForwardVector())
		ParticleManager:ReleaseParticleIndex(cast_pfx)

		local sound = wearables_system:GetSoundReplacement(self.parent, "Hero_EmberSpirit.PreAttack_Custom", self)
		self.parent:EmitSound(sound)
		self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_1)
	end

	target:EmitSound("Ember.Chains_Proc")
	return self:GetCritDamage()
end

function modifier_searing_chains_custom_tracker:LifestealHit(params)
	local target = params.unit
	target:EmitSound("DOTA_Item.Daedelus.Crit")

	local hit_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
		PATTACH_CUSTOMORIGIN,
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
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)
end

modifier_searing_chains_custom_debuff = class(mod_visible)
function modifier_searing_chains_custom_debuff:IsPurgable()
	return true
end
function modifier_searing_chains_custom_debuff:GetTexture()
	return "ember_spirit_searing_chains"
end
function modifier_searing_chains_custom_debuff:GetEffectName()
	return "particles/units/heroes/hero_ember_spirit/ember_spirit_searing_chains_debuff.vpcf"
end
function modifier_searing_chains_custom_debuff:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_searing_chains_custom_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.chains_ability
	if not self.ability then
		self:Destroy()
		return
	end

	if not IsServer() then
		return
	end
	self.tick_interval = self.ability.tick_interval
	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
	self:StartIntervalThink(self.tick_interval - FrameTime())
end

function modifier_searing_chains_custom_debuff:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

function modifier_searing_chains_custom_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.damageTable.damage = self.ability.damage_per_second * self.tick_interval
	DoDamage(self.damageTable)

	if self.caster:GetQuest() == "Ember.Quest_5" and not self.caster:QuestCompleted() and self.parent:IsRealHero() then
		self.caster:UpdateQuest(self.tick_interval)
	end
end

function modifier_searing_chains_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_searing_chains_custom_debuff:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_damage_reduce
end

function modifier_searing_chains_custom_debuff:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_damage_reduce
end

modifier_searing_chains_custom_armor = class(mod_hidden)
function modifier_searing_chains_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.chains_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.armor = self.ability.talents.q1_armor

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_searing_chains_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_searing_chains_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_searing_chains_custom_legendary_attacks = class(mod_hidden)
function modifier_searing_chains_custom_legendary_attacks:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.stack = 0
	local mod = self.parent:FindModifierByName("modifier_searing_chains_custom_legendary_stack")
	if mod then
		self.stack = mod:GetStackCount()
	end

	self.attack_sound = wearables_system:GetSoundReplacement(self.caster, "Hero_EmberSpirit.SleightOfFist.Damage", self)
	self.count = self.ability.talents.q7_attacks
	self:StartIntervalThink(self.ability.talents.q7_interval)
end

function modifier_searing_chains_custom_legendary_attacks:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.caster:IsAlive() then
		self:Destroy()
		return
	end

	self.count = self.count - 1

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_searing_chains_custom_legendary_damage",
		{ stack = self.stack }
	)
	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_searing_chains_custom_legendary_damage")

	self.parent:EmitSound(self.attack_sound)
	local particle = ParticleManager:CreateParticle(
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_v2_omni_slash_tgt.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	if self.count <= 0 then
		self:Destroy()
		return
	end
end

function modifier_searing_chains_custom_legendary_attacks:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_searing_chains_custom_legendary_stack",
		{ duration = self.ability.talents.q7_effect_duration }
	)
end

modifier_searing_chains_custom_legendary_damage = class(mod_hidden)
function modifier_searing_chains_custom_legendary_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.talents.q7_damage + table.stack * self.ability.talents.q7_damage_inc - 100
end

function modifier_searing_chains_custom_legendary_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_searing_chains_custom_legendary_damage:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_searing_chains_custom_legendary_stack = class(mod_visible)
function modifier_searing_chains_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q7_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	if self.ability.talents.has_w7 == 0 then
		self.effect_cast =
			self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_unleash_stack.vpcf", self, true)
	end

	self:OnRefresh()
end

function modifier_searing_chains_custom_legendary_stack:OnRefresh()
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