--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_kunkka_innate_custom_tracker",
	"abilities/kunkka/kunkka_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_innate_custom_effect",
	"abilities/kunkka/kunkka_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_kunkka_innate_custom_damage",
	"abilities/kunkka/kunkka_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_kunkka_innate_custom_heal",
	"abilities/kunkka/kunkka_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_hero_2"
)
LinkLuaModifier(
	"modifier_kunkka_innate_custom_shard",
	"abilities/kunkka/kunkka_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)
LinkLuaModifier("modifier_kunkka_innate_custom_anim", "abilities/kunkka/kunkka_innate_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_kunkka_innate_custom_reduce",
	"abilities/kunkka/kunkka_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_hero_2"
)

kunkka_innate_custom = class({})
kunkka_innate_custom.talents = {}

function kunkka_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_kunkka/kunkka_admirals_rum.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/innate_shield.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/innate_effect.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/scepter_damage_reduce.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/innate_effecta.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_kunkka.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_kunkka", context)
end

function kunkka_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			h1_armor = 0,
			h1_move = 0,
			h1_bonus = caster:GetTalentValue("modifier_kunkka_hero_1", "bonus", true),

			has_h2 = 0,
			h2_base = 0,
			h2_heal = 0,
			h2_reduce = 0,
			h2_duration = caster:GetTalentValue("modifier_kunkka_hero_2", "duration", true),
			h2_reduce_duration = caster:GetTalentValue("modifier_kunkka_hero_2", "reduce_duration", true),

			h3_cdr = 0,
			h3_duration = 0,

			has_h4 = 0,
			h4_cast = caster:GetTalentValue("modifier_kunkka_hero_4", "cast", true),

			has_h5 = 0,
			h5_absorb = caster:GetTalentValue("modifier_kunkka_hero_5", "absorb", true) / 100,
			h5_shield = caster:GetTalentValue("modifier_kunkka_hero_5", "shield", true) / 100,
			h5_burn = caster:GetTalentValue("modifier_kunkka_hero_5", "burn", true) / 100,

			has_h6 = 0,
			h6_status = caster:GetTalentValue("modifier_kunkka_hero_6", "status", true),
		}
	end

	if caster:HasTalent("modifier_kunkka_hero_1") then
		self.talents.h1_armor = caster:GetTalentValue("modifier_kunkka_hero_1", "armor")
		self.talents.h1_move = caster:GetTalentValue("modifier_kunkka_hero_1", "move")
	end

	if caster:HasTalent("modifier_kunkka_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_base = caster:GetTalentValue("modifier_kunkka_hero_2", "base")
		self.talents.h2_heal = caster:GetTalentValue("modifier_kunkka_hero_2", "heal") / 100
		self.talents.h2_reduce = caster:GetTalentValue("modifier_kunkka_hero_2", "reduce")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_kunkka_hero_3") then
		self.talents.h3_cdr = caster:GetTalentValue("modifier_kunkka_hero_3", "cdr")
		self.talents.h3_duration = caster:GetTalentValue("modifier_kunkka_hero_3", "duration")
	end

	if caster:HasTalent("modifier_kunkka_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_kunkka_hero_5") then
		self.talents.has_h5 = 1
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_kunkka_hero_5", heal = false, proc = "LifestealBurn", value = self.talents.h5_burn }
		)
	end

	if caster:HasTalent("modifier_kunkka_hero_6") then
		self.talents.has_h6 = 1
	end
end

function kunkka_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_kunkka_innate_custom_tracker"
end

function kunkka_innate_custom:GetBehavior()
	if not self.caster:HasShard() then
		return DOTA_ABILITY_BEHAVIOR_PASSIVE
			+ DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE
			+ DOTA_ABILITY_BEHAVIOR_SKIP_FOR_KEYBINDS
	end

	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
		+ DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE
end

function kunkka_innate_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) - (self.caster:HasShard() and (self.shard_cd or 0) or 0)
end

function kunkka_innate_custom:GetReduce()
	return self.ghostship_absorb + (self.talents.has_h5 == 1 and self.talents.h5_absorb or 0)
end

function kunkka_innate_custom:OnSpellStart()
	if not IsServer() then
		return
	end

	self:EndCooldown()
	self:ApplyEffect(self.caster, 0)
end

function kunkka_innate_custom:ApplyEffect(target, damage_reduce, no_cd)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	local duration = self.buff_duration + self.talents.h3_duration
	if not no_cd then
		self.caster:AddNewModifier(self.caster, self, "modifier_kunkka_innate_custom_anim", {})
	end
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_innate_custom_effect",
		{ duration = duration, start_damage = damage_reduce, no_cd = no_cd and 1 or 0 }
	)
end

function kunkka_innate_custom:ApplyHeal()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_h2 == 0 then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_innate_custom_heal",
		{ duration = self.talents.h2_duration }
	)
end

function kunkka_innate_custom:ApplyHealReduce(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_h2 == 0 then
		return
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_innate_custom_reduce",
		{ duration = self.talents.h2_reduce_duration }
	)
end

modifier_kunkka_innate_custom_tracker = class(mod_hidden)
function modifier_kunkka_innate_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.kunkka_innate = self.ability

	self.ability.damage_threshold = self.ability:GetSpecialValueFor("damage_threshold") / 100
	self.ability.ghostship_absorb = self.ability:GetSpecialValueFor("ghostship_absorb") / 100
	self.ability.buff_duration = self.ability:GetSpecialValueFor("buff_duration")
	self.ability.movespeed_bonus = self.ability:GetSpecialValueFor("movespeed_bonus")
	self.ability.shard_reduce = self.ability:GetSpecialValueFor("shard_reduce") / 100
	self.ability.shard_duration = self.ability:GetSpecialValueFor("shard_duration")
	self.ability.shard_cd = self.ability:GetSpecialValueFor("shard_cd")
end

function modifier_kunkka_innate_custom_tracker:LifestealBurn(params, burn)
	local delayed = self.parent:FindModifierByName("modifier_kunkka_innate_custom_damage")
	if not delayed then
		return
	end
	delayed:Burn(burn)
end

function modifier_kunkka_innate_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if params.ability:IsItem() then
		return
	end

	self.ability:ApplyHeal()
end

function modifier_kunkka_innate_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK,
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_CASTTIME_PERCENTAGE,
	}
end

function modifier_kunkka_innate_custom_tracker:GetModifierMagicalResistanceBonus()
	return self.ability.talents.has_h6 == 1 and self.ability.talents.h6_status or 0
end

function modifier_kunkka_innate_custom_tracker:GetModifierStatusResistanceStacking()
	return self.ability.talents.has_h6 == 1 and self.ability.talents.h6_status or 0
end

function modifier_kunkka_innate_custom_tracker:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h1_armor
		* (self.parent:HasModifier("modifier_kunkka_innate_custom_effect") and self.ability.talents.h1_bonus or 1)
end

function modifier_kunkka_innate_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h1_move
end

function modifier_kunkka_innate_custom_tracker:GetModifierPercentageCooldown()
	return self.ability.talents.h3_cdr
end

function modifier_kunkka_innate_custom_tracker:GetModifierPercentageCasttime()
	return self.ability.talents.has_h4 == 1 and self.ability.talents.h4_cast or 0
end

function modifier_kunkka_innate_custom_tracker:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	if self.parent.fake_attack then
		return
	end
	if self.parent.kunkka_w7 then
		return
	end
	params.target:EmitSound(params.no_attack_cooldown and "Kunkka.Attack_custom_auto" or "Kunkka.Attack_custom")
end

function modifier_kunkka_innate_custom_tracker:GetModifierTotal_ConstantBlock(params)
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_kunkka_innate_custom_effect") then
		return
	end
	if not self.ability:IsFullyCastable() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local damage = params.damage
	local health_left = self.parent:GetHealth() - damage

	if health_left > self.parent:GetMaxHealth() * self.ability.damage_threshold then
		return
	end

	local percent = self.parent:HasShard() and self.ability.shard_reduce or self.ability:GetReduce()
	local damage_reduce = percent * damage
	self.ability:ApplyEffect(self.parent, damage_reduce)
	self.ability:ApplyHeal()

	return damage_reduce
end

modifier_kunkka_innate_custom_effect = class(mod_visible)
function modifier_kunkka_innate_custom_effect:GetStatusEffectName()
	return "particles/status_fx/status_effect_rum.vpcf"
end
function modifier_kunkka_innate_custom_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_kunkka_innate_custom_effect:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.is_caster = self.parent == self.caster
	self.blocked_damage = table.start_damage or 0
	self.shield_damage = self.blocked_damage
	self:SetHasCustomTransmitterData(true)

	if self.is_caster then
		self.ability:SetActivated(false)
	end

	self:SetParams(table)
	self.parent:GenericParticle("particles/units/heroes/hero_kunkka/kunkka_admirals_rum.vpcf", self)
	self.parent:GenericParticle("particles/kunkka/innate_effect.vpcf", self)
end

function modifier_kunkka_innate_custom_effect:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:SetParams(table)
	self:ApplyShield()
end

function modifier_kunkka_innate_custom_effect:SetParams(params)
	if not IsServer() then
		return
	end

	if params.no_cd == 0 then
		self.start_cd = true
	end

	self.duration = params.duration
	self.damage_reduce = self.ability:GetReduce()
	self.reduce = self.damage_reduce * 100
	self.move = self.ability.movespeed_bonus
	self:SendBuffRefreshToClients()

	self.parent:EmitSound("Kunkka.Innate_proc")
	self.parent:EmitSound("Kunkka.Innate_proc2")

	if not self.caster:HasShard() then
		return
	end
	self.parent:RemoveModifierByName("modifier_kunkka_innate_custom_shard")
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_kunkka_innate_custom_shard",
		{ duration = self.ability.shard_duration }
	)
end

function modifier_kunkka_innate_custom_effect:OnDestroy()
	if not IsServer() then
		return
	end

	if self.is_caster then
		if self.start_cd then
			self.ability:StartCd()
		else
			self.ability:SetActivated(true)
		end
	end

	if self:GetRemainingTime() > 0.1 then
		return
	end
	if self.blocked_damage <= 0 then
		return
	end

	self.parent:RemoveModifierByName("modifier_kunkka_innate_custom_damage")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_kunkka_innate_custom_damage",
		{ effect_duration = self.ability.buff_duration, blocked_damage = self.blocked_damage }
	)

	self:ApplyShield()
end

function modifier_kunkka_innate_custom_effect:ApplyShield()
	if not IsServer() then
		return
	end
	if not self.is_caster then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self.shield_damage <= 0 then
		return
	end

	if IsValid(self.ability.shield_mod) then
		self.ability.shield_mod:Destroy()
	end

	self.ability.shield_mod =
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield_multiple", {
			duration = self.duration,
			start_full = 1,
			max_shield = self.shield_damage * self.ability.talents.h5_shield,
			shield_talent = "modifier_kunkka_hero_5",
		})

	self.shield_damage = 0

	if not self.ability.shield_mod then
		return
	end

	self.parent:EmitSound("Kunkka.Innate_shield")

	self.particle =
		ParticleManager:CreateParticle("particles/kunkka/innate_shield.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self.ability.shield_mod:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_kunkka_innate_custom_effect:AddCustomTransmitterData()
	return {
		move = self.move,
		reduce = self.reduce,
	}
end

function modifier_kunkka_innate_custom_effect:HandleCustomTransmitterData(data)
	self.move = data.move
	self.reduce = data.reduce
end

function modifier_kunkka_innate_custom_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_kunkka_innate_custom_effect:OnTooltip()
	return self.reduce
end

function modifier_kunkka_innate_custom_effect:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_kunkka_innate_custom_effect:GetModifierTotal_ConstantBlock(params)
	if not IsServer() then
		return
	end

	local damage = params.damage
	local percent = self.damage_reduce

	if self.parent:HasModifier("modifier_kunkka_innate_custom_shard") then
		percent = self.ability.shard_reduce
		self.parent:EmitSound("Kunkka.innate_scepter_damage")
		self.parent:GenericParticle("particles/kunkka/innate_effecta.vpcf")
	end

	local reduce = percent * damage
	self.blocked_damage = self.blocked_damage + reduce
	self.shield_damage = self.shield_damage + reduce

	return reduce
end

modifier_kunkka_innate_custom_shard = class(mod_hidden)
function modifier_kunkka_innate_custom_shard:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.parent:GenericParticle("particles/kunkka/scepter_damage_reduce.vpcf", self)
end

modifier_kunkka_innate_custom_damage = class(mod_visible)
function modifier_kunkka_innate_custom_damage:IsDebuff()
	return true
end
function modifier_kunkka_innate_custom_damage:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.damage_left = table.blocked_damage
	self.duration = table.effect_duration
	self.interval = 1

	self.damage_tick = self.damage_left / self.duration * self.interval
	self:SetStackCount(self.damage_left)

	self:StartIntervalThink(self.interval)
end

function modifier_kunkka_innate_custom_damage:Burn(amount)
	if not IsServer() then
		return
	end

	self.damage_left = math.max(0, self.damage_left - amount)
	self:SetStackCount(self.damage_left)

	if self.damage_left > 0 then
		return
	end
	self:Destroy()
end

function modifier_kunkka_innate_custom_damage:OnIntervalThink()
	if not IsServer() then
		return
	end
	local damage = math.min(self.damage_left, self.damage_tick)

	self.damage_left = self.damage_left - damage
	self.parent:SetHealth(math.max(1, self.parent:GetHealth() - damage))
	self:SetStackCount(self.damage_left)

	if self:GetStackCount() <= 0 then
		self:Destroy()
		return
	end
end

modifier_kunkka_innate_custom_heal = class(mod_visible)
function modifier_kunkka_innate_custom_heal:GetTexture()
	return "buffs/kunkka/hero_2"
end
function modifier_kunkka_innate_custom_heal:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.heal = (self.ability.talents.h2_base + self.parent:GetMaxHealth() * self.ability.talents.h2_heal)
		/ self.ability.talents.h2_duration
end

function modifier_kunkka_innate_custom_heal:OnRefresh()
	self:OnCreated()
end

function modifier_kunkka_innate_custom_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_kunkka_innate_custom_heal:GetModifierConstantHealthRegen()
	return self.heal
end

modifier_kunkka_innate_custom_anim = class(mod_hidden)
function modifier_kunkka_innate_custom_anim:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local duration_base = 0.8
	local duration_k = 1.4

	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_IDLE_RARE, duration_k)
	self:StartIntervalThink(duration_base / duration_k)
end

function modifier_kunkka_innate_custom_anim:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:FadeGesture(ACT_DOTA_IDLE_RARE)
	self:Destroy()
end

function modifier_kunkka_innate_custom_anim:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_kunkka_innate_custom_anim:GetActivityTranslationModifiers()
	return "agedspirit"
end

modifier_kunkka_innate_custom_reduce = class(mod_hidden)
function modifier_kunkka_innate_custom_reduce:OnCreated()
	self.ability = self:GetAbility()
	self.reduce = self.ability.talents.h2_reduce

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_kunkka_innate_custom_reduce:OnRefresh()
	self.reduce = self.ability.talents.h2_reduce
end

function modifier_kunkka_innate_custom_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_kunkka_innate_custom_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.reduce
end

function modifier_kunkka_innate_custom_reduce:GetModifierHealChange()
	return self.reduce
end