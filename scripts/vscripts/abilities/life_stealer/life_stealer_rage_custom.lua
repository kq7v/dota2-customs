--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_life_stealer_rage_custom_tracker",
	"abilities/life_stealer/life_stealer_rage_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_rage_custom",
	"abilities/life_stealer/life_stealer_rage_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_life_stealer_rage_custom_charge",
	"abilities/life_stealer/life_stealer_rage_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL,
	"modifier_lifestealer_rage_4"
)
LinkLuaModifier(
	"modifier_life_stealer_rage_custom_armor",
	"abilities/life_stealer/life_stealer_rage_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_rage_1"
)
LinkLuaModifier(
	"modifier_life_stealer_rage_custom_dispel_cd",
	"abilities/life_stealer/life_stealer_rage_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_hero_4"
)
LinkLuaModifier(
	"modifier_life_stealer_rage_custom_dispel_invun",
	"abilities/life_stealer/life_stealer_rage_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_rage_custom_shield_cd",
	"abilities/life_stealer/life_stealer_rage_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_ghoul_4"
)

life_stealer_rage_custom = class({})
life_stealer_rage_custom.active_mod = nil
life_stealer_rage_custom.talents = {}

function life_stealer_rage_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/wraith_king/totem_dispell.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_life_stealer/life_stealer_rage.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/bloodseeker/bloodseeker_ti7/bloodseeker_ti7_thirst_owner.vpcf",
		context
	)
	PrecacheResource("particle", "particles/lifestealer/heal_shield.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/heal_shield_creeps.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/lifestealer/lifestealer_immortal_backbone/lifestealer_immortal_backbone_rage_ambient.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/lifestealer/lifestealer_immortal_backbone_gold/lifestealer_immortal_backbone_rage_ambient_gold.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/lifestealer/lifestealer_immortal_backbone/lifestealer_immortal_backbone_ambient.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/lifestealer/lifestealer_immortal_backbone_gold/lifestealer_immortal_backbone_gold_ambient.vpcf",
		context
	)
end

function life_stealer_rage_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_armor = 0,
			q1_damage = 0,
			q1_duration = caster:GetTalentValue("modifier_lifestealer_rage_1", "duration", true),

			q2_duration = 0,
			q2_cd = 0,

			has_q3 = 0,
			q3_str = 0,
			q3_speed = 0,

			has_q4 = 0,
			q4_duration = caster:GetTalentValue("modifier_lifestealer_rage_4", "duration", true),
			q4_range = caster:GetTalentValue("modifier_lifestealer_rage_4", "range", true),
			q4_move = caster:GetTalentValue("modifier_lifestealer_rage_4", "move", true),
			q4_slow_resist = caster:GetTalentValue("modifier_lifestealer_rage_4", "slow_resist", true),

			has_q7 = 0,
			q7_cd = caster:GetTalentValue("modifier_lifestealer_rage_7", "cd", true) / 100,
			q7_health = caster:GetTalentValue("modifier_lifestealer_rage_7", "health", true) / 100,

			has_h4 = 0,
			h4_talent_cd = caster:GetTalentValue("modifier_lifestealer_hero_4", "talent_cd", true),
			h4_invun = caster:GetTalentValue("modifier_lifestealer_hero_4", "invun", true),
			h4_status = caster:GetTalentValue("modifier_lifestealer_hero_4", "status", true),
			h4_health = caster:GetTalentValue("modifier_lifestealer_hero_4", "health", true),

			has_e4 = 0,
			e4_cd = caster:GetTalentValue("modifier_lifestealer_ghoul_4", "cd", true),
			e4_attacks = caster:GetTalentValue("modifier_lifestealer_ghoul_4", "attacks", true),
			e4_max = caster:GetTalentValue("modifier_lifestealer_ghoul_4", "max", true),
			e4_shield = caster:GetTalentValue("modifier_lifestealer_ghoul_4", "shield", true) / 100,

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_lifestealer_rage_1") then
		self.talents.has_q1 = 1
		self.talents.q1_armor = caster:GetTalentValue("modifier_lifestealer_rage_1", "armor")
		self.talents.q1_damage = caster:GetTalentValue("modifier_lifestealer_rage_1", "damage")
	end

	if caster:HasTalent("modifier_lifestealer_rage_2") then
		self.talents.q2_duration = caster:GetTalentValue("modifier_lifestealer_rage_2", "duration")
		self.talents.q2_cd = caster:GetTalentValue("modifier_lifestealer_rage_2", "cd")
	end

	if caster:HasTalent("modifier_lifestealer_rage_3") then
		self.talents.has_q3 = 1
		self.talents.q3_str = caster:GetTalentValue("modifier_lifestealer_rage_3", "str") / 100
		self.talents.q3_speed = caster:GetTalentValue("modifier_lifestealer_rage_3", "speed")
		if IsServer() then
			caster:AddPercentStat({ str = self.talents.q3_str }, self.tracker)
		end
	end

	if caster:HasTalent("modifier_lifestealer_rage_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_lifestealer_rage_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_lifestealer_hero_4") then
		self.talents.has_h4 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_lifestealer_ghoul_4") then
		self.talents.has_e4 = 1
		if IsServer() then
			self.tracker:StartIntervalThink(1)
			caster:AddDamageEvent_inc(self.tracker, true)
		end
	end

	if caster:HasTalent("modifier_lifestealer_ghoul_7") then
		self.talents.has_e7 = 1
	end

	if not IsServer() then
		return
	end
	if not IsValid(caster.infest_creep) then
		return
	end

	if self.talents.has_e4 == 0 and self.talents.has_h4 == 0 then
		return
	end
	local mod = caster.infest_creep:FindModifierByName(self.tracker:GetName())

	if not mod then
		return
	end
	caster.infest_creep:AddDamageEvent_inc(mod, true)
end

function life_stealer_rage_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "life_stealer_rage", self)
end

function life_stealer_rage_custom:CreateTalent()
	self:ToggleAutoCast()
end

function life_stealer_rage_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() or self:GetCaster():IsCreepHero() then
		return
	end
	return "modifier_life_stealer_rage_custom_tracker"
end

function life_stealer_rage_custom:GetBehavior()
	local bonus = self.talents.has_q4 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0
	local stun_use = self.talents.has_h4 == 1 and DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE or 0
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + bonus + stun_use
end

function life_stealer_rage_custom:GetManaCost(level)
	if self.talents.has_q7 == 1 then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function life_stealer_rage_custom:GetHealthCost(level)
	if self.talents.has_q7 == 1 then
		return self.caster:GetHealth() * self.talents.q7_health
	end
	return 0
end

function life_stealer_rage_custom:GetCooldown(level)
	local k = self.talents.has_q7 == 1 and (1 + self.talents.q7_cd) or 1
	return (self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)) * k
end

function life_stealer_rage_custom:OnSpellStart()
	local target = self.caster

	local mod = self.caster:FindModifierByName("modifier_life_stealer_infest_custom")
	if mod and mod.is_legendary == 1 and mod.target then
		target = mod.target
		if self.talents.has_q7 == 1 then
			target:SetHealth(math.max(1, target:GetHealth() * (1 - self.talents.q7_health)))
		end
		target:RemoveModifierByName("modifier_life_stealer_infest_custom_legendary_creep_status")
	end

	local duration = self.duration + self.talents.q2_duration
	if self.talents.has_q7 == 1 then
		duration = duration * (1 + self.talents.q7_cd)
	end

	if self.talents.has_q4 == 1 and self:GetAutoCastState() then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_life_stealer_rage_custom_charge",
			{ duration = self.talents.q4_duration }
		)
	end

	target:EmitSound("Hero_LifeStealer.Rage")
	target:Purge(false, true, false, self.talents.has_h4 == 1, self.talents.has_h4 == 1)
	self.caster:StartGesture(ACT_DOTA_LIFESTEALER_RAGE)

	target:AddNewModifier(self.caster, self, "modifier_life_stealer_rage_custom", { duration = duration })
end

function life_stealer_rage_custom:ApplyShield(full)
	if not IsServer() then
		return
	end
	if self.talents.has_e4 == 0 then
		return
	end

	local target = self.caster.infest_creep or self.caster
	local max = self.talents.e4_shield * target:GetMaxHealth()

	if not IsValid(target.frenzy_shield) then
		target.frenzy_shield = target:AddNewModifier(target, self, "modifier_generic_shield", {
			max_shield = max,
			shield_talent = "modifier_lifestealer_ghoul_4",
			refresh_timer = self.talents.e4_cd,
		})

		if target.frenzy_shield then
			if not target.infest_owner then
				target:GenericParticle("particles/lifestealer/heal_shield.vpcf", target.frenzy_shield)
			else
				local cast_effect = ParticleManager:CreateParticle(
					"particles/lifestealer/heal_shield_creeps.vpcf",
					PATTACH_CUSTOMORIGIN_FOLLOW,
					target
				)
				ParticleManager:SetParticleControlEnt(
					cast_effect,
					0,
					target,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					target:GetAbsOrigin(),
					true
				)
				ParticleManager:SetParticleControl(cast_effect, 1, target:GetAbsOrigin())
				ParticleManager:SetParticleControlEnt(
					cast_effect,
					2,
					target,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					target:GetAbsOrigin(),
					true
				)
				target.frenzy_shield:AddParticle(cast_effect, true, false, -1, false, false)
			end
		end
	end

	if IsValid(target.frenzy_shield) then
		target.frenzy_shield:AddShield(full and max or (max / self.talents.e4_attacks), max)
	end
end

modifier_life_stealer_rage_custom = class(mod_visible)
function modifier_life_stealer_rage_custom:GetStatusEffectName()
	return wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/status_fx/status_effect_life_stealer_rage.vpcf",
		self
	)
end
function modifier_life_stealer_rage_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_life_stealer_rage_custom:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.q3_speed * (1 - self.parent:GetHealthPercent() / 100)
	self.status = self.ability.talents.has_h4 == 1 and self.ability.talents.h4_status or 0

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.ability.active_mod = self
	self.ability:EndCd()

	if self.ability.talents.has_q3 == 1 then
		self:SetStackCount(self.speed)
	end

	self.shield_count = 0
	if self.ability.talents.has_q1 == 1 or self.ability.talents.has_e4 == 1 then
		self.caster:AddProc(self, { land = true, illusion = true })
	end

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_life_stealer/life_stealer_rage.vpcf",
		self
	)

	local lifestealer_back = self.caster:GetItemWearableHandle("back")
	if
		lifestealer_back
		and lifestealer_back:GetModelName()
			== "models/items/lifestealer/immortal_back/lifestealer_immortal_back.vmdl"
	then
		local modifier_donate_hero_illusion_item =
			lifestealer_back:FindModifierByName("modifier_donate_hero_illusion_item")
		if modifier_donate_hero_illusion_item then
			if modifier_donate_hero_illusion_item.pfx_list then
				for _, pfx in pairs(modifier_donate_hero_illusion_item.pfx_list) do
					ParticleManager:DestroyParticle(pfx, true)
					ParticleManager:ReleaseParticleIndex(pfx)
				end
			end
			lifestealer_back:SetModel("models/items/lifestealer/immortal_back/lifestealer_immortal_back_rage.vmdl")
			lifestealer_back:SetOriginalModel(
				"models/items/lifestealer/immortal_back/lifestealer_immortal_back_rage.vmdl"
			)
			local new_fx = ParticleManager:CreateParticle(
				"particles/econ/items/lifestealer/lifestealer_immortal_backbone/lifestealer_immortal_backbone_rage_ambient.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				lifestealer_back
			)
			table.insert(modifier_donate_hero_illusion_item.pfx_list, new_fx)
			modifier_donate_hero_illusion_item:AddParticle(new_fx, true, false, -1, false, false)
		end
	end

	if
		lifestealer_back
		and lifestealer_back:GetModelName()
			== "models/items/lifestealer/immortal_back/lifestealer_immortal_back_golden.vmdl"
	then
		local modifier_donate_hero_illusion_item =
			lifestealer_back:FindModifierByName("modifier_donate_hero_illusion_item")
		if modifier_donate_hero_illusion_item then
			if modifier_donate_hero_illusion_item.pfx_list then
				for _, pfx in pairs(modifier_donate_hero_illusion_item.pfx_list) do
					ParticleManager:DestroyParticle(pfx, true)
					ParticleManager:ReleaseParticleIndex(pfx)
				end
			end
			lifestealer_back:SetModel(
				"models/items/lifestealer/immortal_back/lifestealer_immortal_back_rage_golden.vmdl"
			)
			lifestealer_back:SetOriginalModel(
				"models/items/lifestealer/immortal_back/lifestealer_immortal_back_rage_golden.vmdl"
			)
			local new_fx = ParticleManager:CreateParticle(
				"particles/econ/items/lifestealer/lifestealer_immortal_backbone_gold/lifestealer_immortal_backbone_rage_ambient_gold.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				lifestealer_back
			)
			table.insert(modifier_donate_hero_illusion_item.pfx_list, new_fx)
			modifier_donate_hero_illusion_item:AddParticle(new_fx, true, false, -1, false, false)
		end
	end

	local rage_particle = self.parent:GenericParticle(pfx_name, self)
	ParticleManager:SetParticleControlEnt(
		rage_particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)

	self.bkb = self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_generic_debuff_immune",
		{ magic_damage = self.ability.magic_resist }
	)
end

function modifier_life_stealer_rage_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability.active_mod = nil
	self.ability:StartCd()

	if IsValid(self.bkb) then
		self.bkb:Destroy()
	end

	if self.parent ~= self.caster then
		self.parent:AddNewModifier(self.parent, nil, "modifier_life_stealer_infest_custom_legendary_creep_status", {})
	end

	local lifestealer_back = self.caster:GetItemWearableHandle("back")
	if
		lifestealer_back
		and lifestealer_back:GetModelName()
			== "models/items/lifestealer/immortal_back/lifestealer_immortal_back_rage.vmdl"
	then
		local modifier_donate_hero_illusion_item =
			lifestealer_back:FindModifierByName("modifier_donate_hero_illusion_item")
		if modifier_donate_hero_illusion_item then
			if modifier_donate_hero_illusion_item.pfx_list then
				for _, pfx in pairs(modifier_donate_hero_illusion_item.pfx_list) do
					ParticleManager:DestroyParticle(pfx, true)
					ParticleManager:ReleaseParticleIndex(pfx)
				end
			end
			lifestealer_back:SetModel("models/items/lifestealer/immortal_back/lifestealer_immortal_back.vmdl")
			lifestealer_back:SetOriginalModel("models/items/lifestealer/immortal_back/lifestealer_immortal_back.vmdl")
			local new_fx = ParticleManager:CreateParticle(
				"particles/econ/items/lifestealer/lifestealer_immortal_backbone/lifestealer_immortal_backbone_ambient.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				lifestealer_back
			)
			table.insert(modifier_donate_hero_illusion_item.pfx_list, new_fx)
			modifier_donate_hero_illusion_item:AddParticle(new_fx, true, false, -1, false, false)
		end
	end

	if
		lifestealer_back
		and lifestealer_back:GetModelName()
			== "models/items/lifestealer/immortal_back/lifestealer_immortal_back_rage_golden.vmdl"
	then
		local modifier_donate_hero_illusion_item =
			lifestealer_back:FindModifierByName("modifier_donate_hero_illusion_item")
		if modifier_donate_hero_illusion_item then
			if modifier_donate_hero_illusion_item.pfx_list then
				for _, pfx in pairs(modifier_donate_hero_illusion_item.pfx_list) do
					ParticleManager:DestroyParticle(pfx, true)
					ParticleManager:ReleaseParticleIndex(pfx)
				end
			end
			lifestealer_back:SetModel("models/items/lifestealer/immortal_back/lifestealer_immortal_back_golden.vmdl")
			lifestealer_back:SetOriginalModel(
				"models/items/lifestealer/immortal_back/lifestealer_immortal_back_golden.vmdl"
			)
			local new_fx = ParticleManager:CreateParticle(
				"particles/econ/items/lifestealer/lifestealer_immortal_backbone_gold/lifestealer_immortal_backbone_gold_ambient.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				lifestealer_back
			)
			table.insert(modifier_donate_hero_illusion_item.pfx_list, new_fx)
			modifier_donate_hero_illusion_item:AddParticle(new_fx, true, false, -1, false, false)
		end
	end
end

function modifier_life_stealer_rage_custom:GetProcChance()
	return 100
end

function modifier_life_stealer_rage_custom:AttackProc(params, name)
	local real_attacker = params.attacker
	local attacker = real_attacker.lifestealer_creep and real_attacker.owner or real_attacker

	if self.caster ~= attacker then
		return
	end

	if self.ability.talents.has_e4 == 1 and self.shield_count < self.ability.talents.e4_attacks then
		self.shield_count = self.shield_count + 1
		self.ability:ApplyShield()
	end

	if self.ability.talents.has_q1 == 0 then
		return
	end
	params.target:AddNewModifier(
		self.caster,
		self.parent:BkbAbility(self.ability, true),
		"modifier_life_stealer_rage_custom_armor",
		{ duration = self.ability.talents.q1_duration }
	)
end

function modifier_life_stealer_rage_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_life_stealer_rage_custom:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

function modifier_life_stealer_rage_custom:GetModifierStatusResistanceStacking()
	return self.status
end

function modifier_life_stealer_rage_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.move_bonus + (self.ability.talents.has_q4 == 1 and self.ability.talents.q4_move or 0)
end

modifier_life_stealer_rage_custom_tracker = class(mod_hidden)
function modifier_life_stealer_rage_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	if not self.ability.tracker then
		self.ability.tracker = self
	end

	self.ability:UpdateTalents()

	self.parent.rage_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.move_bonus = self.ability:GetSpecialValueFor("move_bonus")
	self.ability.magic_resist = self.ability:GetSpecialValueFor("magic_resist")

	if not IsServer() then
		return
	end
	if self.parent ~= self.caster then
		return
	end
	if not self.parent.infest_ability then
		return
	end
	self.parent.infest_ability:UpdateLevels()
end

function modifier_life_stealer_rage_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.move_bonus = self.ability:GetSpecialValueFor("move_bonus")
end

function modifier_life_stealer_rage_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e4 == 0 then
		return
	end

	local target = self.parent.infest_creep or self.parent

	if not target:IsAlive() then
		return
	end
	if IsValid(target.frenzy_shield) then
		return
	end
	if target:HasModifier("modifier_life_stealer_rage_custom_shield_cd") then
		return
	end

	self.ability:ApplyShield(true)
end

function modifier_life_stealer_rage_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end

	if self.ability.talents.has_e4 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_rage_custom_shield_cd",
			{ duration = self.ability.talents.e4_cd }
		)
	end

	if self.ability.talents.has_h4 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.h4_health then
		return
	end
	if self.parent:HasModifier("modifier_life_stealer_rage_custom_dispel_cd") then
		return
	end
	if self.parent:HasModifier("modifier_life_stealer_rage_custom") then
		return
	end

	self.parent:EmitSound("Lifestealer.Rage_dispell")
	self.parent:Purge(false, true, false, false, false)

	local effect_cast = ParticleManager:CreateParticle(
		"particles/wraith_king/totem_dispell.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(200, 200, 200))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_life_stealer_rage_custom_dispel_invun",
		{ duration = self.ability.talents.h4_invun }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_life_stealer_rage_custom_dispel_cd",
		{ duration = self.ability.talents.h4_talent_cd }
	)
end

function modifier_life_stealer_rage_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_life_stealer_rage_custom_tracker:GetModifierPreAttack_BonusDamage()
	if self.parent ~= self.caster then
		return
	end
	if self.ability.talents.has_e7 == 1 then
		return
	end
	return self.ability.talents.q1_damage
end

function modifier_life_stealer_rage_custom_tracker:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_slow_resist
end

modifier_life_stealer_rage_custom_charge = class(mod_hidden)
function modifier_life_stealer_rage_custom_charge:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.parent:EmitSound("Lifestealer.Rage_charge")
	self.angle = self.parent:GetForwardVector():Normalized()
	self.speed = self.ability.talents.q4_range / self:GetDuration()
	self.parent:GenericParticle(
		"particles/econ/items/bloodseeker/bloodseeker_ti7/bloodseeker_ti7_thirst_owner.vpcf",
		self
	)

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_life_stealer_rage_custom_charge:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:InterruptMotionControllers(true)

	local dir = self.parent:GetForwardVector()
	dir.z = 0
	self.parent:FacePoint(self.parent:GetAbsOrigin() + dir * 10)
	ResolveNPCPositions(self.parent:GetAbsOrigin(), 128)
end

function modifier_life_stealer_rage_custom_charge:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	local pos = self.parent:GetAbsOrigin()
	GridNav:DestroyTreesAroundPoint(pos, 80, false)

	local pos_p = self.angle * self.speed * dt
	local next_pos = GetGroundPosition(pos + pos_p, self.parent)
	self.parent:SetAbsOrigin(next_pos)
end

function modifier_life_stealer_rage_custom_charge:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_life_stealer_rage_custom_charge:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

function modifier_life_stealer_rage_custom_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_life_stealer_rage_custom_charge:GetModifierDisableTurning()
	return 1
end

modifier_life_stealer_rage_custom_armor = class(mod_hidden)
function modifier_life_stealer_rage_custom_armor:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self.caster.rage_ability
	if not self.ability then
		self:Destroy()
		return
	end
	self.armor = self.ability.talents.q1_armor
end

function modifier_life_stealer_rage_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_life_stealer_rage_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_life_stealer_rage_custom_dispel_cd = class(mod_cd)
function modifier_life_stealer_rage_custom_dispel_cd:GetTexture()
	return "buffs/lifestealer/hero_4"
end

modifier_life_stealer_rage_custom_dispel_invun = class(mod_hidden)
function modifier_life_stealer_rage_custom_dispel_invun:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

modifier_life_stealer_rage_custom_shield_cd = class(mod_cd)
function modifier_life_stealer_rage_custom_shield_cd:GetTexture()
	return "buffs/lifestealer/ghoul_4"
end
function modifier_life_stealer_rage_custom_shield_cd:OnCreated()
	self.ability = self:GetAbility()
end

function modifier_life_stealer_rage_custom_shield_cd:OnDestroy()
	if not IsServer() then
		return
	end
	if self.ability.tracker then
		self.ability.tracker:OnIntervalThink()
	end
end