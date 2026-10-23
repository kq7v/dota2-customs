--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_primal_beast_innate_custom",
	"abilities/primal_beast/primal_beast_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)

primal_beast_innate_custom = class({})
primal_beast_innate_custom.talents = {}

function primal_beast_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/items_fx/battlefury_cleave_custom.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_primal_beast.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_primal_beast", context)
end

function primal_beast_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e7 = 0,

			h1_move = 0,
			h1_bonus = caster:GetTalentValue("modifier_primal_beast_hero_1", "bonus", true),

			has_h5 = 0,
			h5_bonus = caster:GetTalentValue("modifier_primal_beast_hero_5", "bonus", true) / 100,
			h5_max_move = caster:GetTalentValue("modifier_primal_beast_hero_5", "max_move", true),
			h5_status = caster:GetTalentValue("modifier_primal_beast_hero_5", "status", true),
			h5_health = caster:GetTalentValue("modifier_primal_beast_hero_5", "health", true),
			h5_max = caster:GetTalentValue("modifier_primal_beast_hero_5", "max", true),
		}
	end

	if caster:HasTalent("modifier_primal_beast_uproar_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_primal_beast_hero_1") then
		self.talents.h1_move = caster:GetTalentValue("modifier_primal_beast_hero_1", "move")
	end

	if caster:HasTalent("modifier_primal_beast_hero_5") then
		self.talents.has_h5 = 1
	end
end

function primal_beast_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_primal_beast_innate_custom"
end

function primal_beast_innate_custom:UpdateScale()
	if not self:IsTrained() then
		return
	end
	self.tracker:OnIntervalThink()
end

modifier_primal_beast_innate_custom = class(mod_hidden)
function modifier_primal_beast_innate_custom:RemoveOnDeath()
	return false
end
function modifier_primal_beast_innate_custom:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.innate_ability = self.ability

	self.cleave = self.ability:GetSpecialValueFor("cleave") / 100
	self.health = self.ability:GetSpecialValueFor("health")
	self.move = self.ability:GetSpecialValueFor("move")
	self.range = self.ability:GetSpecialValueFor("range")
	self.str = self.ability:GetSpecialValueFor("str")
	self.model = self.ability:GetSpecialValueFor("model")

	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { land = true })
	self.current_scale = self.parent:GetModelScale()
	self.speed = 0.01
	self:OnIntervalThink()
end

function modifier_primal_beast_innate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local bonus = ((self.parent:GetStrength() / self.str) * self.model * self:GetK()) / 100
	local bkb = self.parent:FindModifierByName("modifier_item_black_king_bar_custom_active")
	if bkb and IsValid(bkb.ability) then
		bonus = bonus + bkb.ability.model_scale / 100
	end
	local ring = self.parent:FindModifierByName("modifier_item_giants_ring_custom")
	if ring then
		bonus = bonus + ring:GetScale() / 100
	end
	if
		self.ability.talents.has_e7 == 1
		and self.parent:HasModifier("modifier_primal_beast_uproar_custom_buff")
		and not self.parent:HasModifier("modifier_primal_beast_uproar_custom_legendary")
	then
		bonus = bonus + 0.2
	end

	local scale = 1 + bonus
	if self.current_scale < scale then
		self.current_scale = math.min(self.current_scale + self.speed, scale)
	elseif self.current_scale > scale then
		self.current_scale = math.max(self.current_scale - self.speed, scale)
	end

	self.parent:SetModelScale(self.current_scale)
	self:StartIntervalThink(self.current_scale == scale and 1 or 0.03)
end

function modifier_primal_beast_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
		MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL,
		MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE,
	}
end

function modifier_primal_beast_innate_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.parent:GetMaxHealth() / self.health * self.move * self:GetK()
end

function modifier_primal_beast_innate_custom:GetModifierMoveSpeedBonus_Constant()
	if self.parent:HasModifier("modifier_primal_beast_onslaught_custom_move") then
		return self.ability.talents.h1_move * self.ability.talents.h1_bonus
	end
	return self.ability.talents.h1_move
end

function modifier_primal_beast_innate_custom:GetModifierSlowResistance_Stacking()
	return self:GetModifierMoveSpeedBonus_Percentage()
end

function modifier_primal_beast_innate_custom:GetModifierAttackRangeBonus()
	return self.parent:GetMaxHealth() / self.health * self.range * self:GetK()
end

function modifier_primal_beast_innate_custom:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return math.min(
		self.ability.talents.h5_max,
		self.parent:GetMaxHealth() / self.ability.talents.h5_health * self.ability.talents.h5_status
	)
end

function modifier_primal_beast_innate_custom:GetModifierIgnoreMovespeedLimit()
	if self.ability.talents.has_h5 == 0 then
		return 0
	end
	return 1
end

function modifier_primal_beast_innate_custom:GetModifierMoveSpeed_Max()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_max_move
end

function modifier_primal_beast_innate_custom:GetModifierMoveSpeed_Limit()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_max_move
end

function modifier_primal_beast_innate_custom:GetModifierOverrideAbilitySpecial(data)
	if data.ability ~= self.ability then
		return
	end
	if not self:GetModifierOverrideAbilitySpecialValue(data) then
		return
	end
	return 1
end

function modifier_primal_beast_innate_custom:GetModifierOverrideAbilitySpecialValue(data)
	if data.ability ~= self.ability then
		return
	end
	local result
	if data.ability_special_value == "current_move" then
		result = self:GetModifierMoveSpeedBonus_Percentage()
	elseif data.ability_special_value == "current_slow" then
		result = self:GetModifierSlowResistance_Stacking()
	elseif data.ability_special_value == "current_range" then
		result = self:GetModifierAttackRangeBonus()
	elseif data.ability_special_value == "current_status" then
		result = self:GetModifierStatusResistanceStacking() or 0
	end
	if not result then
		return
	end
	return math.floor(result + 0.5)
end

function modifier_primal_beast_innate_custom:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	if self.parent.beast_scepter then
		return
	end
	if self.parent.fake_attack then
		return
	end
	params.target:EmitSound(params.no_attack_cooldown and "PBeast.Attack_custom_auto" or "PBeast.Attack_custom")
end

function modifier_primal_beast_innate_custom:GetProcChance()
	return 100
end

function modifier_primal_beast_innate_custom:AttackProc(params, name)
	if IsValid(self.parent.onslaught_ability) then
		self.parent.onslaught_ability:ProcSlow(params.target)
	end

	if IsValid(self.parent.uproar_ability) and not params.no_attack_cooldown then
		self.parent.uproar_ability:ProcStrength()
	end

	if params.no_cleave_flag then
		return
	end

	DoCleaveAttack(
		self.parent,
		params.target,
		self.ability,
		self.cleave * self:GetK() * params.damage,
		150,
		360,
		500 + self:GetModifierAttackRangeBonus(),
		"particles/items_fx/battlefury_cleave_custom.vpcf"
	)
end

function modifier_primal_beast_innate_custom:GetK()
	if self.ability.talents.has_h5 == 0 then
		return 1
	end
	return 1 + self.ability.talents.h5_bonus
end