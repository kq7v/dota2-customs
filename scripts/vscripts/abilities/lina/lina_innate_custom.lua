--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_lina_innate_custom", "abilities/lina/lina_innate_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_lina_innate_custom_burn", "abilities/lina/lina_innate_custom", LUA_MODIFIER_MOTION_NONE, true)
LinkLuaModifier(
	"modifier_lina_innate_custom_magic",
	"abilities/lina/lina_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_laguna_3"
)

lina_innate_custom = class({})
lina_innate_custom.talents = {}

function lina_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_overheat_explosion.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_phoenix/phoenix_fire_spirit_burn.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/guard_resist_max.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_lina.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_lina", context)
end

function lina_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w7_damage = caster:GetTalentValue("modifier_lina_array_7", "damage", true) / 100,

			q3_heal = 0,

			has_r3 = 0,
			r3_magic = 0,
			r3_max = caster:GetTalentValue("modifier_lina_laguna_3", "max", true),
			r3_duration = caster:GetTalentValue("modifier_lina_laguna_3", "duration", true),

			has_h1 = 0,
			h1_mana = 0,
			h1_range = 0,

			has_h2 = 0,
			h2_magic = 0,
			h2_move = 0,
		}
	end

	if caster:HasTalent("modifier_lina_dragon_3") then
		self.talents.q3_heal = caster:GetTalentValue("modifier_lina_dragon_3", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_lina_dragon_3",
			type = 1,
			value = function(params)
				return params.inflictor == self and self.talents.q3_heal or 0
			end,
		})
	end

	if caster:HasTalent("modifier_lina_laguna_3") then
		self.talents.has_r3 = 1
		self.talents.r3_magic = caster:GetTalentValue("modifier_lina_laguna_3", "magic")
	end

	if caster:HasTalent("modifier_lina_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_mana = caster:GetTalentValue("modifier_lina_hero_1", "mana")
		self.talents.h1_range = caster:GetTalentValue("modifier_lina_hero_1", "range")
	end

	if caster:HasTalent("modifier_lina_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_magic = caster:GetTalentValue("modifier_lina_hero_2", "magic")
		self.talents.h2_move = caster:GetTalentValue("modifier_lina_hero_2", "move")
	end
end

function lina_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_lina_innate_custom"
end

function lina_innate_custom:ApplyBurn(target, damage, more_damage, is_attack)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	if not is_attack then
		if IsValid(self.caster.fiery_ability) then
			self.caster.fiery_ability:ApplyCrit(target)
		end

		if IsValid(self.caster.laguna_ability) then
			self.caster.laguna_ability:ApplyReduce(target)
		end
	end

	local real_damage = damage * self.damage
	if more_damage then
		real_damage = real_damage + more_damage
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_lina_innate_custom_burn",
		{ damage = real_damage, duration = self.duration + 0.3 }
	)
end

modifier_lina_innate_custom = class(mod_hidden)
function modifier_lina_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.lina_innate = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage") / 100
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")
	self.ability.attack_cd = self.ability:GetSpecialValueFor("attack_cd")

	self.parent:AddProc(self, { land = true })
end

function modifier_lina_innate_custom:GetProcChance()
	return 100
end

function modifier_lina_innate_custom:AttackProc(params, name)
	local k = 1
	if not self.parent:HasModifier("modifier_lina_light_strike_array_custom_legendary") then
		if not self.parent:CheckCd("lina_innate", self.ability.attack_cd) then
			return
		end
	else
		k = 1 + self.ability.talents.w7_damage
	end

	local target = params.target

	target:EmitSound("Hero_Lina.Overheat.Explosion")

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_lina/lina_overheat_explosion.vpcf",
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
	ParticleManager:ReleaseParticleIndex(particle)

	self.ability:ApplyBurn(target, params.original_damage * k, false, true)
end

function modifier_lina_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_lina_innate_custom:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h1_range
end

function modifier_lina_innate_custom:GetModifierPercentageManacostStacking()
	return self.ability.talents.h1_mana
end

function modifier_lina_innate_custom:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h2_magic
end

function modifier_lina_innate_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
end

modifier_lina_innate_custom_burn = class(mod_visible)
function modifier_lina_innate_custom_burn:GetStatusEffectName()
	return "particles/status_fx/status_effect_burn.vpcf"
end
function modifier_lina_innate_custom_burn:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_lina_innate_custom_burn:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.interval
	self.duration = self.ability.duration

	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self.ability }
	if not IsServer() then
		return
	end

	if IsValid(self.caster.fiery_ability) and IsValid(self.caster.fiery_ability.tracker) then
		self.caster.fiery_ability.tracker:UpdateMod(self)
	end

	self.parent:GenericParticle("particles/units/heroes/hero_phoenix/phoenix_fire_spirit_burn.vpcf", self)

	self:OnRefresh(table)
	self:StartIntervalThink(self.interval)
end

function modifier_lina_innate_custom_burn:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.caster.fiery_ability) and IsValid(self.caster.fiery_ability.tracker) then
		self.caster.fiery_ability.tracker:UpdateMod(self, true)
	end
end

function modifier_lina_innate_custom_burn:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.total_damage = self.total_damage + table.damage
	self.tick = self.total_damage / self.duration
	self.count = self.duration / self.interval
	self.damageTable.damage = self.tick
end

function modifier_lina_innate_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	DoDamage(self.damageTable)

	if self.ability.talents.has_r3 == 1 and IsValid(self.caster.laguna_ability) then
		self.parent:AddNewModifier(
			self.caster,
			self.caster.laguna_ability,
			"modifier_lina_innate_custom_magic",
			{ duration = self.ability.talents.r3_duration }
		)
	end

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1

	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_lina_innate_custom_magic = class(mod_visible)
function modifier_lina_innate_custom_magic:GetTexture()
	return "buffs/lina/laguna_3"
end
function modifier_lina_innate_custom_magic:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.lina_innate
	if not self.ability then
		self:Destroy()
		return
	end

	self.max = self.ability.talents.r3_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_lina_innate_custom_magic:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Lina.Laguna_resist")
		self.parent:GenericParticle("particles/ember_spirit/guard_resist_max.vpcf", self)
	end
end

function modifier_lina_innate_custom_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_lina_innate_custom_magic:GetModifierMagicalResistanceBonus()
	return (self:GetStackCount() * self.ability.talents.r3_magic) / self.max
end