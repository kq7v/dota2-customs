--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_primal_beast_uproar_custom",
	"abilities/primal_beast/primal_beast_uproar_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_uproar_custom_stack",
	"abilities/primal_beast/primal_beast_uproar_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_primal_beast_uproar_custom_buff",
	"abilities/primal_beast/primal_beast_uproar_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_primal_beast_uproar_custom_debuff",
	"abilities/primal_beast/primal_beast_uproar_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_uproar_custom_legendary",
	"abilities/primal_beast/primal_beast_uproar_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_uproar_7"
)
LinkLuaModifier(
	"modifier_primal_beast_uproar_custom_strength",
	"abilities/primal_beast/primal_beast_uproar_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_uproar_3"
)
LinkLuaModifier(
	"modifier_primal_beast_uproar_custom_root",
	"abilities/primal_beast/primal_beast_uproar_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_uproar_4"
)

primal_beast_uproar_custom = class({})
primal_beast_uproar_custom.talents = {}

function primal_beast_uproar_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_primal_beast/primal_beast_roar_aoe.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_primal_beast/primal_beast_roar.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_uproar_magic_resist.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_status_effect_slow.vpcf",
		context
	)
	PrecacheResource("particle", "particles/primal_beast/beast_hands.vpcf", context)
	PrecacheResource("particle", "particles/primal_beast/blood_frenzy.vpcf", context)
	PrecacheResource("particle", "particles/primal_beast/beast_shield.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_parry.vpcf", context)
	PrecacheResource("particle", "particles/primal_beast/beast_root.vpcf", context)
end

function primal_beast_uproar_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_damage_legendary = 0,
			e1_bva = 0,

			e2_duration = 0,
			e2_heal = 0,

			has_e3 = 0,
			e3_damage = 0,
			e3_str = 0,
			e3_max = caster:GetTalentValue("modifier_primal_beast_uproar_3", "max", true),
			e3_duration = caster:GetTalentValue("modifier_primal_beast_uproar_3", "duration", true),
			e3_max_quake = caster:GetTalentValue("modifier_primal_beast_uproar_3", "max_quake", true),
			e3_duration_quake = caster:GetTalentValue("modifier_primal_beast_uproar_3", "duration_quake", true),

			has_e4 = 0,
			e4_root = caster:GetTalentValue("modifier_primal_beast_uproar_4", "root", true),
			e4_root_legendary = caster:GetTalentValue("modifier_primal_beast_uproar_4", "root_legendary", true),
			e4_radius = caster:GetTalentValue("modifier_primal_beast_uproar_4", "radius", true),
			e4_min_distance = caster:GetTalentValue("modifier_primal_beast_uproar_4", "min_distance", true),
			e4_pull_duration = caster:GetTalentValue("modifier_primal_beast_uproar_4", "pull_duration", true),

			has_e7 = 0,
			e7_max = caster:GetTalentValue("modifier_primal_beast_uproar_7", "max", true),
			e7_speed = caster:GetTalentValue("modifier_primal_beast_uproar_7", "speed", true),
			e7_heal = caster:GetTalentValue("modifier_primal_beast_uproar_7", "heal", true) / 100,
			e7_duration = caster:GetTalentValue("modifier_primal_beast_uproar_7", "duration", true),
			e7_extend = caster:GetTalentValue("modifier_primal_beast_uproar_7", "extend", true),
			e7_damage = caster:GetTalentValue("modifier_primal_beast_uproar_7", "damage", true) / 100,

			has_q7 = 0,

			has_h2 = 0,
			h2_armor = 0,
			h2_magic = 0,
			h2_bonus = caster:GetTalentValue("modifier_primal_beast_hero_2", "bonus", true) / 100,

			has_h4 = 0,
			h4_base = caster:GetTalentValue("modifier_primal_beast_hero_4", "base", true),
			h4_shield = caster:GetTalentValue("modifier_primal_beast_hero_4", "shield", true) / 100,
			h4_duration = caster:GetTalentValue("modifier_primal_beast_hero_4", "duration", true),
		}
	end

	if caster:HasTalent("modifier_primal_beast_uproar_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_primal_beast_uproar_1", "damage")
		self.talents.e1_damage_legendary = caster:GetTalentValue("modifier_primal_beast_uproar_1", "damage_legendary")
		self.talents.e1_bva = caster:GetTalentValue("modifier_primal_beast_uproar_1", "bva")
	end

	if caster:HasTalent("modifier_primal_beast_uproar_2") then
		self.talents.e2_duration = caster:GetTalentValue("modifier_primal_beast_uproar_2", "duration")
		self.talents.e2_heal = caster:GetTalentValue("modifier_primal_beast_uproar_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_primal_beast_uproar_2",
			type = 2,
			value = function()
				return (1 - caster:GetHealthPercent() / 100) * self.talents.e2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_primal_beast_uproar_3") then
		self.talents.has_e3 = 1
		self.talents.e3_damage = caster:GetTalentValue("modifier_primal_beast_uproar_3", "damage") / 100
		self.talents.e3_str = caster:GetTalentValue("modifier_primal_beast_uproar_3", "str")
	end

	if caster:HasTalent("modifier_primal_beast_uproar_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_primal_beast_uproar_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_primal_beast_onslaught_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_primal_beast_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_armor = caster:GetTalentValue("modifier_primal_beast_hero_2", "armor")
		self.talents.h2_magic = caster:GetTalentValue("modifier_primal_beast_hero_2", "magic")
	end

	if caster:HasTalent("modifier_primal_beast_hero_4") then
		self.talents.has_h4 = 1
	end
end

function primal_beast_uproar_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_primal_beast_uproar_custom"
end

function primal_beast_uproar_custom:GetBehavior()
	local bonus = 0
	if self.talents.has_h4 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
		+ bonus
end

function primal_beast_uproar_custom:GetAbilityTextureName()
	local stack = self.caster:GetModifierStackCount("modifier_primal_beast_uproar_custom_stack", self.caster)
	if stack == 0 then
		return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "primal_beast_uproar_none", self)
	end
	if stack >= (self.stack_limit or 0) then
		return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "primal_beast_uproar_max", self)
	end
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "primal_beast_uproar_mid", self)
end

function primal_beast_uproar_custom:GetCastRange(vLocation, hTarget)
	return (self.radius or 0) - self.caster:GetCastRangeBonus()
end

function primal_beast_uproar_custom:CastFilterResult()
	if self.caster:GetModifierStackCount("modifier_primal_beast_uproar_custom_stack", self.caster) < 1 then
		return UF_FAIL_CUSTOM
	end
	return UF_SUCCESS
end

function primal_beast_uproar_custom:GetCustomCastError(hTarget)
	if self.caster:GetModifierStackCount("modifier_primal_beast_uproar_custom_stack", self.caster) < 1 then
		return "#dota_hud_error_no_uproar_stacks"
	end
	return ""
end

function primal_beast_uproar_custom:OnSpellStart()
	local stack = self.caster:GetModifierStackCount("modifier_primal_beast_uproar_custom_stack", self.caster)
	self.caster:RemoveModifierByName("modifier_primal_beast_uproar_custom_stack")

	local duration = self.roar_duration + self.talents.e2_duration
	self.caster:RemoveModifierByName("modifier_primal_beast_uproar_custom_buff")

	if self.talents.has_e7 == 1 then
		duration = -1
	end

	self.buff_mod = self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_uproar_custom_buff",
		{ duration = duration, stack = stack }
	)

	if IsValid(self.caster.onslaught_ability) then
		self.caster.onslaught_ability:ReduceCd()
	end

	if self.talents.has_h4 == 1 then
		if self.caster:IsStunned() or self.caster:IsTaunted() then
			self.caster:LogProc("modifier_primal_beast_hero_4_control")
		end
		self.caster:Purge(false, true, false, false, false)
	end

	if self.talents.has_e7 == 0 then
		self:ProcShield()
	end

	self:ProcRoar(stack, true)
end

function primal_beast_uproar_custom:ProcShield()
	if self.talents.has_h4 == 0 then
		return
	end

	if IsValid(self.shield_mod) then
		self.shield_mod:Destroy()
	end

	local shield = self.talents.h4_base
		+ (self.caster:GetMaxHealth() - self.caster:GetHealth()) * self.talents.h4_shield
	self.shield_mod = self.caster:AddNewModifier(self.caster, self, "modifier_generic_shield_multiple", {
		duration = self.talents.h4_duration,
		start_full = 1,
		max_shield = shield,
		shield_talent = "modifier_primal_beast_hero_4",
	})

	if not IsValid(self.shield_mod) then
		return
	end

	self.caster:LogProc("modifier_primal_beast_hero_4", self.caster:GetHealthPercent())

	local particle = ParticleManager:CreateParticle(
		"particles/primal_beast/beast_shield.vpcf",
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
	ParticleManager:SetParticleControl(particle, 5, Vector(self.caster:GetModelScale(), 0, 0))
	self.shield_mod:AddParticle(particle, false, false, -1, false, false)

	self.shield_mod:SetHitFunction(function()
		if not self.caster:CheckCd("primal_beast_shield_hit", 0.2) then
			return
		end
		self.caster:EmitSound("Juggernaut.Parry")
		local hit = ParticleManager:CreateParticle(
			"particles/juggernaut/jugg_parry.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControlEnt(
			hit,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(hit, 1, self.caster:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(hit)
	end)
end

function primal_beast_uproar_custom:ProcRoar(stack, root)
	local origin = self.caster:GetAbsOrigin()

	for _, enemy in pairs(self.caster:FindTargets(self.radius)) do
		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_primal_beast_uproar_custom_debuff",
			{ duration = self.slow_duration, stack = stack }
		)

		if root and self.talents.has_e4 == 1 then
			local vec = origin - enemy:GetAbsOrigin()
			vec.z = 0
			local length = vec:Length2D()
			local pull = length <= self.talents.e4_radius and length > self.talents.e4_min_distance

			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_primal_beast_uproar_custom_root",
				{
					duration = (self.talents.has_e7 == 1 and self.talents.e4_root_legendary or self.talents.e4_root)
						* (1 - enemy:GetStatusResistance()),
					delay = pull and self.talents.e4_pull_duration or nil,
				}
			)

			if pull then
				local dir = vec:Normalized()
				enemy:AddNewModifier(self.caster, self, "modifier_generic_arc", {
					dir_x = dir.x,
					dir_y = dir.y,
					distance = length - self.talents.e4_min_distance,
					duration = self.talents.e4_pull_duration,
					height = 0,
					fix_end = false,
					activity = ACT_DOTA_FLAIL,
				})
			end
		end
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_roar_aoe.vpcf",
		PATTACH_ABSORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, self.radius, self.radius))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	local effect_roar = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_roar.vpcf",
		PATTACH_POINT_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		effect_roar,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_jaw_fx",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_roar)

	self.caster:EmitSound("Hero_PrimalBeast.Uproar.Cast")
end

function primal_beast_uproar_custom:AddStack()
	if not self:IsTrained() then
		return
	end
	if not self.caster:IsAlive() then
		return
	end
	if not self:IsActivated() and not self.caster:HasModifier("modifier_primal_beast_uproar_custom_legendary") then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_uproar_custom_stack",
		{ duration = self.stack_duration }
	)
end

function primal_beast_uproar_custom:ProcStrength(quake)
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 == 0 then
		return
	end
	if self.talents.has_q7 == 1 and not quake then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_uproar_custom_strength",
		{ duration = self.talents.has_q7 == 1 and self.talents.e3_duration_quake or self.talents.e3_duration }
	)
end

modifier_primal_beast_uproar_custom = class(mod_hidden)
function modifier_primal_beast_uproar_custom:RemoveOnDeath()
	return false
end
function modifier_primal_beast_uproar_custom:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.uproar_ability = self.ability

	self.ability.bonus_damage_per_stack = self.ability:GetSpecialValueFor("bonus_damage_per_stack")
	self.ability.trample_damage_per_stack = self.ability:GetSpecialValueFor("trample_damage_per_stack")
	self.ability.stack_limit = self.ability:GetSpecialValueFor("stack_limit")
	self.ability.damage_limit = self.ability:GetSpecialValueFor("damage_limit")
	self.ability.stack_duration = self.ability:GetSpecialValueFor("stack_duration")
	self.ability.move_slow_per_stack = self.ability:GetSpecialValueFor("move_slow_per_stack")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.roared_bonus_armor = self.ability:GetSpecialValueFor("roared_bonus_armor")
	self.ability.roar_duration = self.ability:GetSpecialValueFor("roar_duration")

	if not IsServer() then
		return
	end
	self.damage_count = 0
	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_primal_beast_uproar_custom:OnRefresh(params)
	self.ability.bonus_damage_per_stack = self.ability:GetSpecialValueFor("bonus_damage_per_stack")
	self.ability.trample_damage_per_stack = self.ability:GetSpecialValueFor("trample_damage_per_stack")
	self.ability.move_slow_per_stack = self.ability:GetSpecialValueFor("move_slow_per_stack")
	self.ability.roared_bonus_armor = self.ability:GetSpecialValueFor("roared_bonus_armor")
end

function modifier_primal_beast_uproar_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_primal_beast_uproar_custom:GetModifierPhysicalArmorBonus()
	if self.ability.talents.has_h2 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_primal_beast_uproar_custom_buff") then
		return
	end
	return self.ability.talents.h2_armor * self.ability.talents.h2_bonus
end

function modifier_primal_beast_uproar_custom:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_h2 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_primal_beast_uproar_custom_buff") then
		return
	end
	return self.ability.talents.h2_magic * self.ability.talents.h2_bonus
end

function modifier_primal_beast_uproar_custom:GetModifierBaseAttack_BonusDamage()
	if self.ability.talents.has_e3 == 0 then
		return
	end
	return self.parent:GetStrength() * self.ability.talents.e3_damage
end

function modifier_primal_beast_uproar_custom:GetModifierAttackSpeedBonus_Constant()
	return self:GetModifierBaseAttack_BonusDamage()
end

function modifier_primal_beast_uproar_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end

	local final = self.damage_count + params.original_damage
	if final < self.ability.damage_limit then
		self.damage_count = final
		return
	end

	local delta = math.floor(final / self.ability.damage_limit)

	for i = 1, delta do
		self.ability:AddStack()
	end

	self.parent:LogProc("primal_beast_uproar_custom", delta)
	self.damage_count = final - delta * self.ability.damage_limit
end

modifier_primal_beast_uproar_custom_stack = class(mod_visible)
function modifier_primal_beast_uproar_custom_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_primal_beast_uproar_custom_stack:OnRefresh()
	if not IsServer() then
		return
	end
	local max = self.parent:HasModifier("modifier_primal_beast_uproar_custom_legendary") and self.ability.talents.e7_max
		or self.ability.stack_limit
	if self:GetStackCount() >= max then
		return
	end

	self:IncrementStackCount()
	if self:GetStackCount() == self.ability.stack_limit then
		self.parent:EmitSound("Hero_PrimalBeast.Uproar.MaxStacks")
	end
end

modifier_primal_beast_uproar_custom_buff = class(mod_visible)
function modifier_primal_beast_uproar_custom_buff:GetTexture()
	return "primal_beast_uproar"
end
function modifier_primal_beast_uproar_custom_buff:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.bonus_damage_per_stack
		* (1 + (self.ability.talents.has_e7 == 1 and self.ability.talents.e7_damage or 0))
	self.trample = self.ability.trample_damage_per_stack
	self.armor = self.ability.roared_bonus_armor
	self.max = self.ability.stack_limit
	self.damage_inc = self.ability.talents.has_e7 == 1 and self.ability.talents.e1_damage_legendary
		or self.ability.talents.e1_damage

	if self.ability.talents.has_e1 == 1 and (self.ability.talents.has_e7 == 1 or self.ability.talents.has_q7 == 0) then
		self.bva = self.parent:GetBaseAttackTime(false) + self.ability.talents.e1_bva
	end

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.legendary = self.ability.talents.has_e7 == 1
	self.ability:EndCd()

	self.interval = 0.1
	self:StartIntervalThink(self.interval)

	if self.legendary then
		self.max_time = self.ability.talents.e7_duration
		self:SetStackCount(params.stack)
		self.legendary_mod = self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_primal_beast_uproar_custom_legendary",
			{ duration = self.max_time }
		)
		self:OnIntervalThink()
		return
	end

	self:OnRefresh(params)
end

function modifier_primal_beast_uproar_custom_buff:OnRefresh(params)
	if not IsServer() then
		return
	end
	self:SetStackCount(params.stack)
	self.max_time = params.duration

	local effect_cast = self.parent:GenericParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_uproar_magic_resist.vpcf",
		self,
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		2,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)

	if not self.legendary then
		return
	end
	local effect = self.parent:GenericParticle("particles/primal_beast/beast_hands.vpcf", self, true)
	ParticleManager:SetParticleControlEnt(
		effect,
		2,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
end

function modifier_primal_beast_uproar_custom_buff:OnIntervalThink()
	if not IsServer() then
		return
	end
	local charging = IsValid(self.legendary_mod)
	if not charging and self.parent:HasModifier("modifier_primal_beast_pulverize_custom") then
		self:SetDuration(self:GetRemainingTime() + self.interval, true)
	end

	if not self.legendary then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = charging and self.legendary_mod:GetRemainingTime() or self:GetRemainingTime(),
		stack = self:GetStackCount() + (charging and self.parent:GetModifierStackCount(
			"modifier_primal_beast_uproar_custom_stack",
			self.parent
		) or 0),
		glow = charging and 0 or 1,
		active = charging and 0 or 1,
		style = "BeastUproar",
		priority = 1,
	})
end

function modifier_primal_beast_uproar_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if not self.legendary then
		return
	end
	self.parent:RemoveModifierByName("modifier_primal_beast_uproar_custom_legendary")
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "BeastUproar", priority = 1 })
	self.parent.innate_ability:UpdateScale()
end

function modifier_primal_beast_uproar_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_primal_beast_uproar_custom_buff:GetModifierPhysicalArmorBonus()
	return (self.armor + self.ability.talents.h2_armor) * math.min(self.max, self:GetStackCount())
end

function modifier_primal_beast_uproar_custom_buff:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h2_magic * math.min(self.max, self:GetStackCount())
end

function modifier_primal_beast_uproar_custom_buff:GetModifierDamageOutgoing_Percentage()
	return (self.damage + self.damage_inc) * self:GetStackCount()
end

function modifier_primal_beast_uproar_custom_buff:GetModifierBaseAttackTimeConstant()
	return self.bva
end

function modifier_primal_beast_uproar_custom_buff:OnTooltip()
	return self:GetTrampleBonus()
end

function modifier_primal_beast_uproar_custom_buff:GetTrampleBonus()
	return self.trample * math.min(self.max, self:GetStackCount())
end

modifier_primal_beast_uproar_custom_debuff = class(mod_visible)
function modifier_primal_beast_uproar_custom_debuff:IsPurgable()
	return true
end
function modifier_primal_beast_uproar_custom_debuff:GetTexture()
	return "primal_beast_uproar"
end
function modifier_primal_beast_uproar_custom_debuff:GetStatusEffectName()
	return "particles/units/heroes/hero_primal_beast/primal_beast_status_effect_slow.vpcf"
end
function modifier_primal_beast_uproar_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_primal_beast_uproar_custom_debuff:OnCreated(params)
	self.ability = self:GetAbility()

	self.slow = self.ability.move_slow_per_stack

	if not IsServer() then
		return
	end
	self:SetStackCount(params.stack)
end

function modifier_primal_beast_uproar_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_primal_beast_uproar_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.slow * self:GetStackCount()
end

modifier_primal_beast_uproar_custom_legendary = class(mod_hidden)
function modifier_primal_beast_uproar_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_legion_commander_duel.vpcf"
end
function modifier_primal_beast_uproar_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_primal_beast_uproar_custom_legendary:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e7_speed

	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { land = true })

	local effect_cast = self.parent:GenericParticle("particles/primal_beast/beast_hands.vpcf", self, true)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		2,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)

	local effect = self.parent:GenericParticle("particles/primal_beast/blood_frenzy.vpcf", self)
	ParticleManager:SetParticleControlEnt(
		effect,
		2,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	self.parent:EmitSound("PBeast.Uproar_legendary")
end

function modifier_primal_beast_uproar_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	local stack = self.parent:GetModifierStackCount("modifier_primal_beast_uproar_custom_stack", self.parent)
	self.parent:RemoveModifierByName("modifier_primal_beast_uproar_custom_stack")

	local buff = self.ability.buff_mod
	if not IsValid(buff) then
		return
	end
	if not self.parent:HasModifier("modifier_primal_beast_uproar_custom_buff") then
		return
	end

	if not self.parent:IsAlive() then
		buff:Destroy()
		return
	end

	local total = buff:GetStackCount() + stack
	self.ability:ProcShield()
	if stack > 0 then
		self.parent:GenericHeal(
			self.parent:GetMaxHealth() * stack * self.ability.talents.e7_heal,
			self.ability,
			nil,
			nil,
			"modifier_primal_beast_uproar_7"
		)
	end
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_3)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_primal_beast_uproar_custom_buff",
		{ duration = self.ability.talents.e7_extend + self.ability.talents.e2_duration, stack = total }
	)
	self.ability:ProcRoar(math.min(total, self.ability.stack_limit), true)
	self.parent.innate_ability:UpdateScale()
end

function modifier_primal_beast_uproar_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_primal_beast_uproar_custom_legendary:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

function modifier_primal_beast_uproar_custom_legendary:GetProcChance()
	return 100
end

function modifier_primal_beast_uproar_custom_legendary:AttackProc(params, name)
	self.ability:AddStack()
	self.parent:LogProc("modifier_primal_beast_uproar_7")
end

modifier_primal_beast_uproar_custom_strength = class(mod_visible)
function modifier_primal_beast_uproar_custom_strength:GetTexture()
	return "buffs/primal_beast/uproar_3"
end
function modifier_primal_beast_uproar_custom_strength:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.has_q7 == 1 and self.ability.talents.e3_max_quake or self.ability.talents.e3_max
	self.str = self.ability.talents.e3_str / self.max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_primal_beast_uproar_custom_strength:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_primal_beast_uproar_custom_strength:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_primal_beast_uproar_custom_strength:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_primal_beast_uproar_custom_strength:GetModifierBonusStats_Strength()
	return self.str * self:GetStackCount()
end

modifier_primal_beast_uproar_custom_root = class(mod_hidden)
function modifier_primal_beast_uproar_custom_root:IsPurgable()
	return true
end
function modifier_primal_beast_uproar_custom_root:OnCreated(params)
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	if params.delay then
		self:StartIntervalThink(params.delay)
		return
	end

	self:OnIntervalThink()
end

function modifier_primal_beast_uproar_custom_root:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/primal_beast/beast_root.vpcf", self)
	self.parent:EmitSound("PBeast.Uproar_root")
	self:StartIntervalThink(-1)
end

function modifier_primal_beast_uproar_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end