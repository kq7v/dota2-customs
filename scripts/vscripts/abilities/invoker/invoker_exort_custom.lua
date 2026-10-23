--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_invoker_exort_custom_passive",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_invoker_exort_custom", "abilities/invoker/invoker_exort_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_invoker_exort_custom_bash_cd",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_invoker_exort_4" }
)
LinkLuaModifier(
	"modifier_invoker_exort_custom_bash_count",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_invoker_exort_4"
)
LinkLuaModifier(
	"modifier_invoker_exort_custom_speed",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_invoker_exort_1"
)
LinkLuaModifier(
	"modifier_invoker_exort_custom_attack",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_sun_strike_custom",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_thinker",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_burn",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_burn_count",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_forged_spirit_melting_strike_custom_debuff",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_forged_spirit_melting_strike_custom_slow",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_invoker_wex_2"
)
LinkLuaModifier(
	"modifier_forged_spirit_melting_strike_custom_range",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_cataclysm",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_cataclysm_caster",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_cataclysm_stack",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_invoker_exort_7"
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_cataclysm_visual",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_cataclysm_root",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_invoker_exort_7"
)
LinkLuaModifier(
	"modifier_invoker_chaos_meteor_custom_cataclysm_root_aura",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_sun_strike_custom_fire",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invoker_sun_strike_custom_fire_debuff",
	"abilities/invoker/invoker_exort_custom",
	LUA_MODIFIER_MOTION_NONE
)

invoker_exort_custom = class({})
invoker_exort_custom.talents = {}
invoker_exort_custom.orb_count = 0

function invoker_exort_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_exort_orb.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_sun_strike_team.vpcf", context)
	PrecacheResource("particle", "particles/invoker/sun_stike_fast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_sun_strike.vpcf", context)
	PrecacheResource("particle", "particles/invoker/sun_strike_radius.vpcf", context)
	PrecacheResource("particle", "particles/invoker/invoker_chaos_meteor_fly_custom.vpcf", context)
	PrecacheResource("particle", "particles/invoker/invoker_chaos_meteor_custom.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_chaos_meteor_burn_debuff.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/ember_slow.vpcf", context)
	PrecacheResource("particle", "particles/invoker/sun_fire.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/black_powder_blind_debuff.vpcf", context)
	PrecacheResource("particle", "particles/invoker/meteor_mark.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf", context)
	PrecacheResource("particle", "particles/invoker/forge_attack.vpcf", context)
	PrecacheResource("particle", "particles/invoker/meteor_leash.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/omni_root.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_forge_spirit_ambient.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_forged_spirit_projectile.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/void_astral_slow.vpcf", context)

	PrecacheResource("model", "models/heroes/invoker/forge_spirit.vmdl", context)
	PrecacheResource("model", "models/heroes/invoker_kid/invoker_kid_trainer_dragon.vmdl", context)
	PrecacheResource(
		"model",
		"models/items/invoker_kid/continuum_echoes_forge_spirit/continuum_echoes_forge_spirit.vmdl",
		context
	)
end

function invoker_exort_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_speed = 0,
			e1_duration = caster:GetTalentValue("modifier_invoker_exort_1", "duration", true),

			has_e2 = 0,
			e2_heal = 0,
			e2_forge = caster:GetTalentValue("modifier_invoker_exort_2", "forge", true),

			has_e3 = 0,
			e3_chance = 0,
			e3_count = 0,
			e3_damage = caster:GetTalentValue("modifier_invoker_exort_3", "damage", true),

			has_e4 = 0,
			e4_stun = caster:GetTalentValue("modifier_invoker_exort_4", "stun", true),
			e4_chance = caster:GetTalentValue("modifier_invoker_exort_4", "chance", true),
			e4_chance_forge = caster:GetTalentValue("modifier_invoker_exort_4", "chance_forge", true),
			e4_talent_cd = caster:GetTalentValue("modifier_invoker_exort_4", "talent_cd", true),
			e4_attacks = caster:GetTalentValue("modifier_invoker_exort_4", "attacks", true),
			e4_duration = caster:GetTalentValue("modifier_invoker_exort_4", "duration", true),

			has_e7 = 0,

			has_w2 = 0,
			w2_slow = 0,
			w2_duration = caster:GetTalentValue("modifier_invoker_wex_2", "duration", true),
		}
	end

	if caster:HasTalent("modifier_invoker_exort_1") then
		self.talents.has_e1 = 1
		self.talents.e1_speed = caster:GetTalentValue("modifier_invoker_exort_1", "speed")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_invoker_exort_2") then
		self.talents.has_e2 = 1
		self.talents.e2_heal = caster:GetTalentValue("modifier_invoker_exort_2", "heal") / 100
	end

	if caster:HasTalent("modifier_invoker_exort_3") then
		self.talents.has_e3 = 1
		self.talents.e3_chance = caster:GetTalentValue("modifier_invoker_exort_3", "chance")
		self.talents.e3_count = caster:GetTalentValue("modifier_invoker_exort_3", "count")
		caster:AddSpellEvent(self.tracker, true)
		caster:AddProc(self.tracker, { name = "e3", illusion = true, prd_owner = true, land = true })
	end

	if caster:HasTalent("modifier_invoker_exort_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { name = "e4", illusion = true, land = true, prd_owner = true })
	end

	if caster:HasTalent("modifier_invoker_exort_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_invoker_wex_2") then
		self.talents.has_w2 = 1
		self.talents.w2_slow = caster:GetTalentValue("modifier_invoker_wex_2", "slow")
	end
end

function invoker_exort_custom:ProcsMagicStick()
	return false
end

function invoker_exort_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "invoker_exort", self)
end

function invoker_exort_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_invoker_exort_custom_passive"
end

function invoker_exort_custom:GetBehavior()
	local bonus = 0
	if self.caster:HasShard() then
		bonus = DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM + DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
		+ bonus
end

function invoker_exort_custom:OnSpellStart()
	local modifier = self.caster:AddNewModifier(self.caster, self, "modifier_invoker_exort_custom", {})

	if IsValid(self.caster.invoke_ability) then
		self.caster.invoke_ability:AddOrb(modifier)
	end
end

function invoker_exort_custom:ProcBash(target)
	if not IsServer() then
		return
	end
	if self.talents.has_e4 ~= 1 then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(particle, 1, target:GetOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	target:EmitSound("Invoker.Forge_bash")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_invoker_exort_custom_bash_cd",
		{ duration = self.talents.e4_talent_cd }
	)
	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, true),
		"modifier_bashed",
		{ duration = self.talents.e4_stun * (1 - target:GetStatusResistance()) }
	)
end

modifier_invoker_exort_custom_passive = class(mod_hidden)
function modifier_invoker_exort_custom_passive:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.exort_ability = self.ability
	self.count = 0

	self.int = self.ability:GetSpecialValueFor("intelligence_bonus") * self.ability:GetLevel()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.forge_bonus = self.ability:GetSpecialValueFor("forge_bonus") / 100

	self.parent:AddProc(self, { name = "hit", land = true, illusion = true })
	InvokerAbilityManager(self.parent)
end

function modifier_invoker_exort_custom_passive:OnRefresh()
	self:OnCreated()
end

function modifier_invoker_exort_custom_passive:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_e1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_invoker_exort_custom_speed",
			{ duration = self.ability.talents.e1_duration }
		)
	end

	if self.ability.talents.has_e3 == 1 and self.parent.forge_ability then
		self.count = self.count + 1

		if self.count >= self.ability.talents.e3_count then
			self.parent.forge_ability:SummonSpirit(false)
			self.count = 0
		end
	end
end

function modifier_invoker_exort_custom_passive:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	local is_forge = params.attacker ~= self.parent
		and params.attacker:FindAbilityByName("forged_spirit_melting_strike_custom")
	if params.attacker ~= self.parent and not is_forge then
		return 0
	end
	if name == "e3" then
		return is_forge and self.ability.talents.e3_chance or 0
	end
	if params.target:HasModifier("modifier_invoker_exort_custom_bash_cd") then
		return 0
	end
	return is_forge and self.ability.talents.e4_chance_forge or self.ability.talents.e4_chance
end

function modifier_invoker_exort_custom_passive:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local target = params.target

	local attacker = params.attacker
	local melt_ability = attacker:FindAbilityByName("forged_spirit_melting_strike_custom")
	local is_forge = melt_ability and attacker.owner and attacker.owner == self.parent

	if not is_forge and attacker ~= self.parent then
		return
	end

	local procs = params.procs and params.procs[self]
	local force_stack = false

	if is_forge then
		if melt_ability and melt_ability.duration then
			target:AddNewModifier(
				attacker,
				melt_ability,
				"modifier_forged_spirit_melting_strike_custom_debuff",
				{ duration = melt_ability.duration }
			)
		end

		if procs and procs.e3 then
			target:EmitSound("Invoker.Forge_attack")
			target:GenericParticle("particles/invoker/forge_attack.vpcf")
			self.parent:AddNewModifier(self.parent, self.ability, "modifier_invoker_exort_custom_attack", {})
			self.parent:PerformAttack(target, true, true, true, true, false, false, true)
			self.parent:RemoveModifierByName("modifier_invoker_exort_custom_attack")
			force_stack = true

			if IsValid(self.parent.emp_ability) then
				self.parent.emp_ability:ProcCd()
			end
		end

		if
			target:IsRealHero()
			and IsValid(self.parent.invoke_ability)
			and IsValid(self.parent.invoke_ability.tracker)
		then
			self.parent.invoke_ability.tracker:ScepterEvent("modifier_invoker_spells_2", 1)
		end
	end

	if
		target:IsHero()
		and self.ability.talents.has_e7 == 1
		and ((not is_forge and not params.no_attack_cooldown) or force_stack)
	then
		local mod = self.parent:FindModifierByName("modifier_invoker_chaos_meteor_custom_cataclysm_stack")
		if mod then
			mod:AddStack(1)
		end
	end

	if self.ability.talents.has_w2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_forged_spirit_melting_strike_custom_slow",
			{ duration = self.ability.talents.w2_duration }
		)
	end

	if self.ability.talents.has_e2 == 1 then
		local heal = self.parent:GetMaxHealth() * self.ability.talents.e2_heal
		if is_forge then
			heal = heal / self.ability.talents.e2_forge
		end
		self.parent:GenericHeal(heal, self.ability, true, nil, "modifier_invoker_exort_2")
	end

	if self.ability.talents.has_e4 == 1 and not is_forge then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_invoker_exort_custom_bash_count",
			{ duration = self.ability.talents.e4_duration }
		)
	end

	if procs and procs.e4 and not target:HasModifier("modifier_invoker_exort_custom_bash_cd") then
		self.ability:ProcBash(target)
	end
end

function modifier_invoker_exort_custom_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_invoker_exort_custom_passive:GetModifierBonusStats_Intellect()
	return self.int
end

function modifier_invoker_exort_custom_passive:GetModifierPreAttack_BonusDamage()
	if not self.parent:HasShard() then
		return
	end
	return self.ability.damage * 3
end

modifier_invoker_exort_custom = class(mod_visible)
function modifier_invoker_exort_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_PERMANENT + MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_invoker_exort_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ability.orb_count = self.ability.orb_count + 1
end

function modifier_invoker_exort_custom:OnDestroy()
	self.ability.orb_count = self.ability.orb_count - 1
end

function modifier_invoker_exort_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_invoker_exort_custom:GetModifierPreAttack_BonusDamage()
	if self.parent:HasShard() then
		return
	end
	return self.ability.damage
end

modifier_invoker_exort_custom_speed = class(mod_visible)
function modifier_invoker_exort_custom_speed:GetTexture()
	return "buffs/invoker/exort_1"
end
function modifier_invoker_exort_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e1_speed
end

function modifier_invoker_exort_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_invoker_exort_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

modifier_invoker_exort_custom_attack = class(mod_hidden)
function modifier_invoker_exort_custom_attack:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.e3_damage - 100
end

function modifier_invoker_exort_custom_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_invoker_exort_custom_attack:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_invoker_exort_custom_bash_cd = class(mod_hidden)

modifier_invoker_exort_custom_bash_count = class(mod_hidden)
function modifier_invoker_exort_custom_bash_count:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e4_attacks
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_invoker_exort_custom_bash_count:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() < self.max then
		return
	end
	self.parent:GenericParticle("particles/invoker/meteor_mark.vpcf", self, true)
end

modifier_forged_spirit_melting_strike_custom_slow = class(mod_hidden)
function modifier_forged_spirit_melting_strike_custom_slow:IsPurgable()
	return true
end
function modifier_forged_spirit_melting_strike_custom_slow:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.w2_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/void_spirit/void_astral_slow.vpcf", self)
end

function modifier_forged_spirit_melting_strike_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_forged_spirit_melting_strike_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

invoker_sun_strike_custom = class({})
invoker_sun_strike_custom.talents = {}

function invoker_sun_strike_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e7_sun_delay = caster:GetTalentValue("modifier_invoker_exort_7", "sun_delay", true),
			e7_damage = caster:GetTalentValue("modifier_invoker_exort_7", "damage", true) / 100,
			e7_max = caster:GetTalentValue("modifier_invoker_exort_7", "max", true),
		}
	end
end

function invoker_sun_strike_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "invoker_sun_strike", self)
end

function invoker_sun_strike_custom:GetCastRange(vLocation, hTarget)
	if not IsClient() then
		return
	end
	return (self.creep_radius or 0) - self.caster:GetCastRangeBonus()
end

function invoker_sun_strike_custom:GetAOERadius()
	return (self.area_of_effect or 0)
end

function invoker_sun_strike_custom:OnSpellStart(new_point, legendary_stack)
	local is_legendary = 0
	local point
	local delay = self.delay
	local vision_distance = self.vision_distance
	local vision_duration = self.vision_duration
	local stack = 0

	if new_point then
		point = new_point
		delay = self.talents.e7_sun_delay
		is_legendary = 1
		stack = legendary_stack

		local sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Invoker.SunStrike.Charge", self)
		EmitSoundOnLocationWithCaster(point, sound, self.caster)
	else
		local sound = wearables_system:GetSoundReplacement(self.caster, "Invoker.Sun_strike", self)
		point = self:GetCursorPosition()
		self.caster:StartGesture(ACT_DOTA_CAST_SUN_STRIKE)
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetPlayerOwnerID()),
			"generic_sound",
			{ sound = sound }
		)
	end

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_invoker_sun_strike_custom",
		{ is_legendary = is_legendary, duration = delay, stack = stack },
		point,
		self.caster:GetTeamNumber(),
		false
	)
	AddFOWViewer(self.caster:GetTeamNumber(), point, vision_distance, vision_duration, false)
end

modifier_invoker_sun_strike_custom = class(mod_hidden)
function modifier_invoker_sun_strike_custom:OnCreated(kv)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.area_of_effect = self.ability.area_of_effect
	self.damage = self.ability.damage

	self.is_legendary = 0
	self.stack = kv.stack
	local part = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_invoker/invoker_sun_strike_team.vpcf",
		self
	)

	if kv.is_legendary and kv.is_legendary == 1 then
		self.is_legendary = 1
		self.damage = self.damage * (1 + self.stack * self.ability.talents.e7_damage)
		part =
			wearables_system:GetParticleReplacementAbility(self.caster, "particles/invoker/sun_stike_fast.vpcf", self)
	end

	local effect_cast =
		ParticleManager:CreateParticleForTeam(part, PATTACH_WORLDORIGIN, self.caster, self.caster:GetTeamNumber())
	ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(40, 0, 0))
	ParticleManager:SetParticleControl(effect_cast, 4, Vector(self:GetRemainingTime(), 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function modifier_invoker_sun_strike_custom:OnDestroy()
	if not IsServer() then
		return
	end
	local damageTable =
		{ attacker = self.caster, damage_type = DAMAGE_TYPE_PURE, ability = self.ability, damage = self.damage }

	for _, enemy in pairs(self.caster:FindTargets(self.area_of_effect, self.parent:GetAbsOrigin())) do
		if
			not enemy:IsCreep()
			or (enemy:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D() <= self.ability.creep_radius
		then
			if IsValid(self.caster.invoke_ability) then
				self.caster.invoke_ability:AbilityHit(enemy)
			end
			damageTable.victim = enemy
			DoDamage(damageTable, self.is_legendary == 1 and "modifier_invoker_exort_7" or nil)
		end
	end

	CreateModifierThinker(
		self.caster,
		self.ability,
		"modifier_invoker_sun_strike_custom_fire",
		{ duration = self.ability.burn_duration, is_legendary = self.is_legendary, stack = self.stack },
		self.parent:GetAbsOrigin(),
		self.caster:GetTeamNumber(),
		false
	)

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_invoker/invoker_sun_strike.vpcf",
		PATTACH_WORLDORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.area_of_effect, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	local sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Invoker.SunStrike.Ignite", self)
	EmitSoundOnLocationWithCaster(self.parent:GetOrigin(), sound, self.caster)
	UTIL_Remove(self.parent)
end

modifier_invoker_sun_strike_custom_fire = class(mod_hidden)
function modifier_invoker_sun_strike_custom_fire:IsAura()
	return true
end
function modifier_invoker_sun_strike_custom_fire:GetModifierAura()
	return "modifier_invoker_sun_strike_custom_fire_debuff"
end
function modifier_invoker_sun_strike_custom_fire:GetAuraRadius()
	return self.radius
end
function modifier_invoker_sun_strike_custom_fire:GetAuraDuration()
	return 0.5
end
function modifier_invoker_sun_strike_custom_fire:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_invoker_sun_strike_custom_fire:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_invoker_sun_strike_custom_fire:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.radius = self.ability.burn_radius

	if not IsServer() then
		return
	end
	self.is_legendary = kv.is_legendary
	self.stack = kv.stack
	self.parent:EmitSound("Invoker.SunStrike_burn")

	self.nFXIndex = ParticleManager:CreateParticle("particles/invoker/sun_fire.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.nFXIndex, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(self.nFXIndex, 1, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(self.nFXIndex, 2, Vector(self:GetRemainingTime(), 0, 0))
	ParticleManager:ReleaseParticleIndex(self.nFXIndex)
	self:AddParticle(self.nFXIndex, false, false, -1, false, false)
end

function modifier_invoker_sun_strike_custom_fire:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Invoker.SunStrike_burn")
end

function modifier_invoker_sun_strike_custom_fire:GetAuraEntityReject(hEntity)
	return hEntity:IsCreep()
		and (hEntity:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D() > self.ability.creep_radius
end

modifier_invoker_sun_strike_custom_fire_debuff = class(mod_hidden)
function modifier_invoker_sun_strike_custom_fire_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end

	self.interval = 0.5
	self.damage = self.ability.burn_damage * self.interval

	local owner = self:GetAuraOwner()
	if IsValid(owner) then
		local mod = owner:FindModifierByName("modifier_invoker_sun_strike_custom_fire")
		if mod and mod.is_legendary == 1 and mod.stack then
			self.damage = self.damage * (1 + mod.stack * self.ability.talents.e7_damage)
			self.talent_name = "modifier_invoker_exort_7"
		end
	end

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage = self.damage,
		damage_type = DAMAGE_TYPE_PURE,
	}
	self:StartIntervalThink(self.interval)
end

function modifier_invoker_sun_strike_custom_fire_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end
	DoDamage(self.damageTable, self.talent_name)
end

invoker_chaos_meteor_custom = class({})
invoker_chaos_meteor_custom.talents = {}

function invoker_chaos_meteor_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e7 = 0,
			e7_reset = caster:GetTalentValue("modifier_invoker_exort_7", "reset", true),
			e7_duration = caster:GetTalentValue("modifier_invoker_exort_7", "duration", true),
			e7_stack = caster:GetTalentValue("modifier_invoker_exort_7", "stack", true),
			e7_meteor = caster:GetTalentValue("modifier_invoker_exort_7", "meteor", true),
			e7_radius = caster:GetTalentValue("modifier_invoker_exort_7", "radius", true),
			e7_sun = caster:GetTalentValue("modifier_invoker_exort_7", "sun", true),
			e7_max = caster:GetTalentValue("modifier_invoker_exort_7", "max", true),
			e7_talent_cd = caster:GetTalentValue("modifier_invoker_exort_7", "talent_cd", true),
			e7_root = caster:GetTalentValue("modifier_invoker_exort_7", "root", true),
			e7_mana = caster:GetTalentValue("modifier_invoker_exort_7", "mana", true) / 100,
			e7_damage = caster:GetTalentValue("modifier_invoker_exort_7", "damage", true) / 100,
		}
	end

	if caster:HasTalent("modifier_invoker_exort_7") then
		self.talents.has_e7 = 1
		if IsServer() and not caster:HasModifier("modifier_invoker_chaos_meteor_custom_cataclysm_stack") then
			caster:AddNewModifier(caster, self, "modifier_invoker_chaos_meteor_custom_cataclysm_stack", {})
		end
	end
end

function invoker_chaos_meteor_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "invoker_chaos_meteor", self)
end

function invoker_chaos_meteor_custom:GetBehavior()
	local bonus = 0
	if self.talents.has_e7 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_CHANNELLED
	end
	return DOTA_ABILITY_BEHAVIOR_POINT
		+ DOTA_ABILITY_BEHAVIOR_AOE
		+ DOTA_ABILITY_BEHAVIOR_HIDDEN
		+ DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
		+ bonus
end

function invoker_chaos_meteor_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) * (1 + (self.talents.has_e7 == 1 and self.talents.e7_mana or 0))
end

function invoker_chaos_meteor_custom:GetCooldown(level)
	if self.talents.has_e7 == 1 then
		return self.talents.e7_talent_cd
	end
	return self.BaseClass.GetCooldown(self, level)
end

function invoker_chaos_meteor_custom:GetAOERadius()
	if self.talents.has_e7 == 1 then
		return self.talents.e7_radius
	end
	return (self.area_of_effect or 0)
end

function invoker_chaos_meteor_custom:GetChannelTime()
	if self.talents.has_e7 ~= 1 then
		return 0
	end
	return self:GetCastTime() + 0.1
end

function invoker_chaos_meteor_custom:OnSpellStart(new_point, legendary_stack)
	local point
	local is_legendary = 0
	local stack = 0

	if new_point then
		point = new_point
		is_legendary = 1
		stack = legendary_stack
	else
		point = self:GetCursorPosition()

		if self.talents.has_e7 == 1 then
			local max_time = self:GetMaxTime()
			local mod = self.caster:FindModifierByName("modifier_invoker_chaos_meteor_custom_cataclysm_stack")
			local mod_stack = 0

			if mod then
				mod_stack = mod:GetStackCount()
				stack = mod_stack
				if mod:GetStackCount() >= self.talents.e7_max then
					EmitSoundOnLocationWithCaster(point, "Invoker.Exort_legendary_leash", self.caster)
					local effect_cast =
						ParticleManager:CreateParticle("particles/invoker/meteor_leash.vpcf", PATTACH_WORLDORIGIN, nil)
					ParticleManager:SetParticleControl(effect_cast, 0, point)
					ParticleManager:SetParticleControl(
						effect_cast,
						2,
						Vector(self.talents.e7_radius, self.talents.e7_radius, self.talents.e7_radius)
					)
					ParticleManager:ReleaseParticleIndex(effect_cast)
					CreateModifierThinker(
						self.caster,
						self,
						"modifier_invoker_chaos_meteor_custom_cataclysm_root_aura",
						{ duration = self.talents.e7_root },
						point,
						self.caster:GetTeamNumber(),
						false
					)
				end
			end
			self.thinker = CreateModifierThinker(
				self.caster,
				self,
				"modifier_invoker_chaos_meteor_custom_cataclysm",
				{ max = max_time, stack = mod_stack },
				point,
				self.caster:GetTeamNumber(),
				false
			)
		else
			self.caster:StartGesture(ACT_DOTA_CAST_CHAOS_METEOR)
		end
	end

	if point == self.caster:GetAbsOrigin() then
		point = point + self.caster:GetForwardVector()
	end

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_invoker_chaos_meteor_custom_thinker",
		{ is_legendary = is_legendary, stack = stack },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function invoker_chaos_meteor_custom:OnChannelFinish(bInterrupted)
	if IsValid(self.thinker) and bInterrupted then
		self.thinker:Destroy()
	end

	local mod = self.caster:FindModifierByName("modifier_invoker_chaos_meteor_custom_cataclysm_stack")
	if mod then
		mod:SetStackCount(0)
		mod:UpdateUI()
	end
end

function invoker_chaos_meteor_custom:GetMaxTime()
	if self.talents.has_e7 ~= 1 then
		return 0
	end
	local bonus = 0
	if self.caster:HasModifier("modifier_invoker_chaos_meteor_custom_cataclysm_stack") then
		bonus = self.caster:GetUpgradeStack("modifier_invoker_chaos_meteor_custom_cataclysm_stack")
			* self.talents.e7_stack
	end
	return self.talents.e7_duration + bonus
end

function invoker_chaos_meteor_custom:GetCastTime()
	if self.talents.has_e7 ~= 1 then
		return 0
	end
	return self:GetMaxTime() + FrameTime() * 2
end

modifier_invoker_chaos_meteor_custom_thinker = class(mod_hidden)
function modifier_invoker_chaos_meteor_custom_thinker:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.caster_origin = self.caster:GetOrigin()
	self.parent_origin = self.parent:GetOrigin()
	self.direction = self.parent_origin - self.caster_origin

	self.is_legendary = kv.is_legendary

	if self.is_legendary == 1 then
		self.direction = self.caster:GetForwardVector()
		self.caster_origin = self.parent_origin - self.direction * (self.ability.talents.e7_radius / 2)
	end

	self.direction.z = 0
	self.direction = self.direction:Normalized()

	self.delay = self.ability.land_time
	self.radius = self.ability.area_of_effect
	self.distance = self.ability.travel_distance
	self.speed = self.ability.travel_speed
	self.vision = self.ability.vision_distance
	self.vision_duration = self.ability.end_vision_duration
	self.interval = self.ability.damage_interval
	self.duration = self.ability.burn_duration
	self.stack = kv.stack
	self.damage = self.ability.main_damage
		* (1 + (self.ability.talents.has_e7 == 1 and self.stack * self.ability.talents.e7_damage or 0))

	self.fallen = false
	self.hit_hero = {}

	self.damageTable = {
		attacker = self.caster,
		damage = self.damage,
		damage_type = self.ability:GetAbilityDamageType(),
		ability = self.ability,
	}

	self.parent:SetMoveCapability(DOTA_UNIT_CAP_MOVE_FLY)
	self.nMoveStep = 0

	self.effect_cast = ParticleManager:CreateParticle(
		"particles/invoker/invoker_chaos_meteor_fly_custom.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.caster_origin + Vector(0, 0, 1500))
	ParticleManager:SetParticleControl(self.effect_cast, 1, self.parent_origin + Vector(0, 0, 40))
	ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(self.delay + 0.05, 0, 0))
	ParticleManager:SetParticleControl(self.effect_cast, 5, Vector(self.radius / self.ability.base_radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(self.effect_cast)

	EmitSoundOnLocationWithCaster(self.caster_origin, "Hero_Invoker.ChaosMeteor.Cast", self.caster)
	self.parent:EmitSound("Hero_Invoker.ChaosMeteor.Loop")

	self:StartIntervalThink(self.delay)
end

function modifier_invoker_chaos_meteor_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetOrigin(), self.vision, self.vision_duration, false)
	StopSoundOn("Hero_Invoker.ChaosMeteor.Loop", self.parent)

	if self.nLinearProjectile then
		ProjectileManager:DestroyLinearProjectile(self.nLinearProjectile)
	end
end

function modifier_invoker_chaos_meteor_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.fallen then
		self.fallen = true
		self:Burn(true)

		if self.effect_cast then
			ParticleManager:DestroyParticle(self.effect_cast, true)
			ParticleManager:ReleaseParticleIndex(self.effect_cast)
			self.effect_cast = nil
		end

		self.effect_cast = ParticleManager:CreateParticle(
			"particles/invoker/invoker_chaos_meteor_custom.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent_origin)
		ParticleManager:SetParticleControl(self.effect_cast, 1, self.direction * self.speed)
		ParticleManager:SetParticleControl(self.effect_cast, 5, Vector(self.radius / self.ability.base_radius, 0, 0))
		self:AddParticle(self.effect_cast, false, false, -1, false, false)

		local meteor_projectile = {
			Ability = self.ability,
			EffectName = nil,
			vSpawnOrigin = self.parent_origin,
			fDistance = self.distance,
			fStartRadius = self.radius,
			fEndRadius = self.radius,
			Source = self.caster,
			bHasFrontalCone = false,
			bReplaceExisting = false,
			iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_NONE,
			iUnitTargetType = DOTA_UNIT_TARGET_NONE,
			bDeleteOnHit = false,
			vVelocity = self.direction * self.speed,
			bProvidesVision = true,
			iVisionRadius = self.vision,
			iVisionTeamNumber = self.caster:GetTeamNumber(),
		}
		self.nLinearProjectile = ProjectileManager:CreateLinearProjectile(meteor_projectile)
		EmitSoundOnLocationWithCaster(self.parent_origin, "Hero_Invoker.ChaosMeteor.Impact", self.caster)
		self:StartIntervalThink(self.interval)
	else
		local target = self.direction * self.speed * self.interval
		self.parent:SetOrigin(self.parent:GetOrigin() + target)
		self.nMoveStep = self.nMoveStep + 1
		self:Burn()

		if self.nMoveStep and self.nMoveStep > 20 then
			self:Destroy()
			return
		end

		if (self.parent:GetOrigin() - self.parent_origin + target):Length2D() > self.distance then
			self:Destroy()
			return
		end
	end
end

function modifier_invoker_chaos_meteor_custom_thinker:Burn(first)
	if not IsServer() then
		return
	end

	for _, enemy in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
		self.damageTable.victim = enemy

		if first and self.is_legendary == 0 then
			local mod = enemy:FindModifierByName("modifier_invoker_exort_custom_bash_count")
			if mod and mod:GetStackCount() >= mod.max then
				mod:Destroy()
				if IsValid(self.caster.exort_ability) then
					self.caster.exort_ability:ProcBash(enemy)
				end
			end
		end

		if not self.hit_hero[enemy] then
			self.hit_hero[enemy] = true
			if IsValid(self.caster.invoke_ability) then
				self.caster.invoke_ability:AbilityHit(enemy)
			end
		end

		DoDamage(self.damageTable, self.is_legendary == 1 and "modifier_invoker_exort_7" or nil)
		enemy:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_invoker_chaos_meteor_custom_burn",
			{ stack = self.stack, is_legendary = self.is_legendary }
		)
		enemy:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_invoker_chaos_meteor_custom_burn_count",
			{ duration = self.duration + 0.1 }
		)
	end
end

modifier_invoker_chaos_meteor_custom_burn = class(mod_hidden)
function modifier_invoker_chaos_meteor_custom_burn:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_invoker_chaos_meteor_custom_burn:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.count = self.ability.burn_duration
	self.damage = self.ability.burn_dps
		* (1 + (self.ability.talents.has_e7 == 1 and kv.stack * self.ability.talents.e7_damage or 0))
	self.talent_name = kv.is_legendary == 1 and "modifier_invoker_exort_7" or nil

	self.damageTable = {
		victim = self.parent,
		damage = self.damage,
		attacker = self.caster,
		damage_type = self.ability:GetAbilityDamageType(),
		ability = self.ability,
	}
	self:StartIntervalThink(1)
end

function modifier_invoker_chaos_meteor_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	DoDamage(self.damageTable, self.talent_name)
	self.parent:EmitSound("Hero_Invoker.ChaosMeteor.Damage")

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

function modifier_invoker_chaos_meteor_custom_burn:OnDestroy()
	if not IsServer() then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_invoker_chaos_meteor_custom_burn_count")

	if not mod then
		return
	end
	mod:DecrementStackCount()
	if mod:GetStackCount() < 1 then
		mod:Destroy()
	end
end

modifier_invoker_chaos_meteor_custom_burn_count = class(mod_visible)
function modifier_invoker_chaos_meteor_custom_burn_count:GetEffectName()
	return "particles/units/heroes/hero_invoker/invoker_chaos_meteor_burn_debuff.vpcf"
end
function modifier_invoker_chaos_meteor_custom_burn_count:GetStatusEffectName()
	return "particles/status_fx/status_effect_burn.vpcf"
end
function modifier_invoker_chaos_meteor_custom_burn_count:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_invoker_chaos_meteor_custom_burn_count:OnCreated()
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_invoker_chaos_meteor_custom_burn_count:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
end

modifier_invoker_chaos_meteor_custom_cataclysm = class(mod_hidden)
function modifier_invoker_chaos_meteor_custom_cataclysm:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.sun_strike = self.caster.sun_ability
	self.meteor = self.caster.meteor_ability

	self.radius = self.ability.talents.e7_radius
	self.meteor_max = self.ability.talents.e7_meteor
	self.max = self.ability.talents.e7_sun
	self.count = 0

	self.stack = kv.stack
	self.meteor_interval = (self.max + 1) / self.meteor_max
	self.meteor_count = 0

	self.interval = kv.max / self.max
	self.ability:EndCd()

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_invoker_chaos_meteor_custom_cataclysm_caster",
		{ interval = self.interval }
	)
	self:StartIntervalThink(self.interval)
end

function modifier_invoker_chaos_meteor_custom_cataclysm:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.caster:RemoveModifierByName("modifier_invoker_chaos_meteor_custom_cataclysm_caster")
end

function modifier_invoker_chaos_meteor_custom_cataclysm:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.count >= self.max then
		return
	end

	self.count = self.count + 1
	self.meteor_count = self.meteor_count + 1

	if self.sun_strike then
		self.sun_strike:OnSpellStart(self:GivePoint(1), self.stack)
	end

	if self.meteor_count >= self.meteor_interval then
		self.meteor_count = 0
		if self.meteor then
			self.meteor:OnSpellStart(self:GivePoint(2), self.stack)
		end
	end

	if self.count >= self.max then
		self:Destroy()
		return
	end
end

function modifier_invoker_chaos_meteor_custom_cataclysm:GivePoint(k)
	local radius = self.radius
	local point = self.parent:GetAbsOrigin()

	if k == 2 then
		local dir = (self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		point = self.parent:GetAbsOrigin() + dir * self.radius * 0.6
		radius = self.radius * 0.6
	end

	return point + RandomVector(RandomInt(radius * 0.2, radius))
end

modifier_invoker_chaos_meteor_custom_cataclysm_caster = class(mod_hidden)
function modifier_invoker_chaos_meteor_custom_cataclysm_caster:GetEffectName()
	return "particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf"
end
function modifier_invoker_chaos_meteor_custom_cataclysm_caster:GetStatusEffectName()
	return "particles/status_fx/status_effect_omnislash.vpcf"
end
function modifier_invoker_chaos_meteor_custom_cataclysm_caster:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_invoker_chaos_meteor_custom_cataclysm_caster:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:RemoveModifierByName("modifier_invoker_chaos_meteor_custom_cataclysm_visual")
	self.duration = kv.interval * self.ability.talents.e7_sun

	if self.duration <= 1.4 then
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_TORNADO, 0.8)
	else
		self.parent:StartGesture(ACT_DOTA_GENERIC_CHANNEL_1)
	end
end

function modifier_invoker_chaos_meteor_custom_cataclysm_caster:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:FadeGesture(ACT_DOTA_GENERIC_CHANNEL_1)
	self.parent:FadeGesture(ACT_DOTA_CAST_TORNADO)
end

modifier_invoker_chaos_meteor_custom_cataclysm_root_aura = class(mod_hidden)
function modifier_invoker_chaos_meteor_custom_cataclysm_root_aura:IsAura()
	return true
end
function modifier_invoker_chaos_meteor_custom_cataclysm_root_aura:GetModifierAura()
	return "modifier_invoker_chaos_meteor_custom_cataclysm_root"
end
function modifier_invoker_chaos_meteor_custom_cataclysm_root_aura:GetAuraRadius()
	return self.radius
end
function modifier_invoker_chaos_meteor_custom_cataclysm_root_aura:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_invoker_chaos_meteor_custom_cataclysm_root_aura:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_invoker_chaos_meteor_custom_cataclysm_root_aura:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.radius = self.ability.talents.e7_radius
end

modifier_invoker_chaos_meteor_custom_cataclysm_root = class(mod_hidden)
function modifier_invoker_chaos_meteor_custom_cataclysm_root:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/invoker/forge_attack.vpcf")
	self.parent:GenericParticle("particles/juggernaut/omni_root.vpcf", self)
end

function modifier_invoker_chaos_meteor_custom_cataclysm_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_invoker_chaos_meteor_custom_cataclysm_stack = class(mod_hidden)
function modifier_invoker_chaos_meteor_custom_cataclysm_stack:RemoveOnDeath()
	return false
end
function modifier_invoker_chaos_meteor_custom_cataclysm_stack:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.reset = self.ability.talents.e7_reset
	self.duration = self.ability.talents.e7_duration
	self.stack = self.ability.talents.e7_stack
	self.max_stack = self.ability.talents.e7_max

	self:UpdateUI()
end

function modifier_invoker_chaos_meteor_custom_cataclysm_stack:AddStack(stack)
	if not IsServer() then
		return
	end
	if self.ability:GetCooldownTimeRemaining() > 0 then
		return
	end
	if self.parent:HasModifier("modifier_invoker_chaos_meteor_custom_cataclysm_caster") then
		return
	end

	self:StartIntervalThink(self.reset)

	if self:GetStackCount() >= self.max_stack then
		return
	end

	self:SetStackCount(math.min(self.max_stack, self:GetStackCount() + stack))
	self:UpdateUI()

	if self:GetStackCount() >= self.max_stack then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_invoker_chaos_meteor_custom_cataclysm_visual",
			{}
		)
	end
end

function modifier_invoker_chaos_meteor_custom_cataclysm_stack:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_invoker_chaos_meteor_custom_cataclysm_caster") then
		return
	end

	self:SetStackCount(0)
	self:UpdateUI()
	self:StartIntervalThink(-1)
end

function modifier_invoker_chaos_meteor_custom_cataclysm_stack:UpdateUI()
	if not IsServer() then
		return
	end

	if self:GetStackCount() < self.max_stack then
		self.parent:RemoveModifierByName("modifier_invoker_chaos_meteor_custom_cataclysm_visual")
	end

	self.cast = self:GetStackCount()

	local no_min = 1

	if self.ability:GetCooldownTimeRemaining() > 0 then
		self.cast = 0
		self.number = 0
		no_min = 0
	end

	self.parent:UpdateUIlong({
		max = self.max_stack,
		stack = self.cast,
		override_stack = self.cast,
		no_min = no_min,
		priority = 2,
		style = "InvokerExort",
	})
end

modifier_invoker_chaos_meteor_custom_cataclysm_visual = class(mod_hidden)
function modifier_invoker_chaos_meteor_custom_cataclysm_visual:GetEffectName()
	return "particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf"
end
function modifier_invoker_chaos_meteor_custom_cataclysm_visual:GetStatusEffectName()
	return "particles/status_fx/status_effect_omnislash.vpcf"
end
function modifier_invoker_chaos_meteor_custom_cataclysm_visual:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_invoker_chaos_meteor_custom_cataclysm_visual:OnCreated()
	self.parent = self:GetParent()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Invoker.Exort_legendary")
end

function modifier_invoker_chaos_meteor_custom_cataclysm_visual:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_invoker_chaos_meteor_custom_cataclysm_visual:GetModifierModelScale()
	return 15
end

invoker_forge_spirit_custom = class({})
invoker_forge_spirit_custom.talents = {}
invoker_forge_spirit_custom.forged_spirits = {}

function invoker_forge_spirit_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e1_speed = 0,
			e1_forge = caster:GetTalentValue("modifier_invoker_exort_1", "forge", true) / 100,

			e2_health = 0,

			e3_duration = caster:GetTalentValue("modifier_invoker_exort_3", "duration", true),

			h2_armor = 0,

			w2_range = 0,

			has_r4 = 0,
			r4_level = caster:GetTalentValue("modifier_invoker_invoke_4", "level", true),

			has_s2 = 0,
			s2_count = caster:GetTalentValue("modifier_invoker_spells_2", "count", true),
			s2_armor = caster:GetTalentValue("modifier_invoker_spells_2", "armor", true),
		}
	end

	if caster:HasTalent("modifier_invoker_exort_1") then
		self.talents.e1_speed = caster:GetTalentValue("modifier_invoker_exort_1", "speed")
	end

	if caster:HasTalent("modifier_invoker_exort_2") then
		self.talents.e2_health = caster:GetTalentValue("modifier_invoker_exort_2", "health") / 100
	end

	if caster:HasTalent("modifier_invoker_hero_2") then
		self.talents.h2_armor = caster:GetTalentValue("modifier_invoker_hero_2", "armor")
	end

	if caster:HasTalent("modifier_invoker_wex_2") then
		self.talents.w2_range = caster:GetTalentValue("modifier_invoker_wex_2", "range")
	end

	if caster:HasTalent("modifier_invoker_invoke_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_invoker_spells_2") then
		self.talents.has_s2 = 1
	end
end

function invoker_forge_spirit_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "invoker_forge_spirit", self)
end

function invoker_forge_spirit_custom:OnSpellStart()
	local spirit_count = self.spirit_count
	if self.caster:HasScepter() and self.talents.has_s2 == 1 then
		spirit_count = spirit_count + self.talents.s2_count
	end

	self.caster:StartGesture(ACT_DOTA_CAST_FORGE_SPIRIT)

	for _, unit in pairs(self.forged_spirits) do
		if IsValid(unit) and unit:IsAlive() then
			unit:Kill(nil, nil)
		end
	end

	self.forged_spirits = {}

	for i = 1, spirit_count do
		self:SummonSpirit(true)
	end

	self.caster:EmitSound("Hero_Invoker.ForgeSpirit")
end

function invoker_forge_spirit_custom:SummonSpirit(active)
	if not IsServer() then
		return
	end
	local damage = self.spirit_damage
	local health = self.spirit_hp * (1 + self.talents.e2_health)
	local duration = self.spirit_duration
	local spirit_armor = self.spirit_armor

	if not active then
		duration = self.talents.e3_duration
	end

	local forged_spirit = CreateUnitByName(
		"npc_dota_invoker_forged_spirit_custom",
		self.caster:GetAbsOrigin() + RandomVector(100),
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	forged_spirit:AddNewModifier(self.caster, self, "modifier_kill", { duration = duration })
	forged_spirit:AddNewModifier(self.caster, self, "modifier_forged_spirit_melting_strike_custom_range", {})

	local forge_model = "models/heroes/invoker/forge_spirit.vmdl"
	local new_forge_model = wearables_system:GetUnitModelReplacement(self.caster, "npc_dota_invoker_forged_spirit")
	if new_forge_model then
		forge_model = new_forge_model
	end
	forged_spirit:SetOriginalModel(forge_model)
	forged_spirit:SetModel(forge_model)
	local projectile_forge = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_invoker/invoker_forged_spirit_projectile.vpcf"
	)
	if
		projectile_forge
		and projectile_forge ~= "particles/units/heroes/hero_invoker/invoker_forged_spirit_projectile.vpcf"
	then
		forged_spirit:SetRangedProjectileName(projectile_forge)
	end

	forged_spirit.owner = self.caster

	forged_spirit:SetControllableByPlayer(self.caster:GetPlayerID(), true)
	forged_spirit:SetBaseMaxHealth(health)
	forged_spirit:SetMaxHealth(health)
	forged_spirit:SetHealth(health)

	forged_spirit:SetBaseDamageMin(damage)
	forged_spirit:SetBaseDamageMax(damage)

	forged_spirit:SetPhysicalArmorBaseValue(spirit_armor)
	FindClearSpaceForUnit(forged_spirit, forged_spirit:GetOrigin(), false)
	forged_spirit:SetAngles(0, 0, 0)
	forged_spirit:FacePoint(forged_spirit:GetAbsOrigin() + self.caster:GetForwardVector())

	if active == true then
		self.forged_spirits[#self.forged_spirits + 1] = forged_spirit
	end
end

modifier_forged_spirit_melting_strike_custom_range = class(mod_hidden)
function modifier_forged_spirit_melting_strike_custom_range:OnCreated(kv)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.movespeed_bonus = self.ability.spirit_movespeed
	self.range = self.ability.spirit_attack_range + self.ability.talents.w2_range

	local ability = self.parent:FindAbilityByName("forged_spirit_melting_strike_custom")
	if ability and self.caster.exort_ability then
		local level = self.caster.exort_ability:GetLevel()
		if self.ability.talents.has_r4 == 1 then
			level = level + self.ability.talents.r4_level
		end
		if IsServer() then
			ability:SetLevel(level)
		end
		ability.armor_removed = ability:GetSpecialValueFor("armor_removed") * -1
		ability.max_armor_removed = ability:GetSpecialValueFor("max_armor_removed")
		ability.duration = ability:GetSpecialValueFor("duration")
		ability.base_armor = 0

		if self.ability.talents.has_s2 == 1 and self.caster:HasScepter() then
			ability.base_armor = self.ability.talents.s2_armor
		end
	end

	if not IsServer() then
		return
	end
	local forge_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_invoker/invoker_forge_spirit_ambient.vpcf",
		self
	)
	self.parent:GenericParticle(forge_pfx, self)
end

function modifier_forged_spirit_melting_strike_custom_range:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_forged_spirit_melting_strike_custom_range:GetModifierMoveSpeedBonus_Constant()
	return self.movespeed_bonus
end

function modifier_forged_spirit_melting_strike_custom_range:GetModifierAttackRangeBonus()
	return self.range
end

function modifier_forged_spirit_melting_strike_custom_range:GetModifierAttackSpeedBonus_Constant()
	if not self.caster:HasModifier("modifier_invoker_exort_custom_speed") then
		return
	end
	return self.ability.talents.e1_speed * self.ability.talents.e1_forge
end

function modifier_forged_spirit_melting_strike_custom_range:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h2_armor
end

function modifier_forged_spirit_melting_strike_custom_range:GetModifierPreAttack_BonusDamage()
	if not self.caster.exort_ability then
		return
	end
	if not self.caster.exort_ability.tracker then
		return
	end
	local count = self.caster:HasShard() and 3 or self.caster.exort_ability.orb_count
	return self.caster.exort_ability.damage * count * self.caster.exort_ability.forge_bonus
end

forged_spirit_melting_strike_custom = class({})

modifier_forged_spirit_melting_strike_custom_debuff = class(mod_visible)
function modifier_forged_spirit_melting_strike_custom_debuff:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.armor = self.ability.armor_removed
	self.base_armor = self.ability.base_armor
	self.max = self.ability.max_armor_removed

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_forged_spirit_melting_strike_custom_debuff:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_forged_spirit_melting_strike_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_forged_spirit_melting_strike_custom_debuff:GetModifierPhysicalArmorBonus()
	return self.base_armor + self.armor * self:GetStackCount()
end