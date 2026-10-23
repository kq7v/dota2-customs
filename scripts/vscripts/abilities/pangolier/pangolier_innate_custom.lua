--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_pangolier_innate_custom",
	"abilities/pangolier/pangolier_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_innate_custom_damage_reduce",
	"abilities/pangolier/pangolier_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_pangolier_innate_custom_cd",
	"abilities/pangolier/pangolier_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)

pangolier_innate_custom = class({})
pangolier_innate_custom.talents = {}

function pangolier_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/pangolier/innate_proc.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/innate_attack.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/innate_shield.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_parry.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_pangolier.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_pangolier", context)
end

function pangolier_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,
			q7_bva = caster:GetTalentValue("modifier_pangolier_buckle_7", "bva", true),

			has_e7 = 0,
			e7_bva = caster:GetTalentValue("modifier_pangolier_lucky_7", "bva", true),

			has_h2 = 0,
			h2_move = 0,
			h2_armor = 0,
			h2_bonus = caster:GetTalentValue("modifier_pangolier_hero_2", "bonus", true),

			has_h4 = 0,
			h4_damage_reduce = caster:GetTalentValue("modifier_pangolier_hero_4", "damage_reduce", true),
			h4_health = caster:GetTalentValue("modifier_pangolier_hero_4", "health", true),
			h4_bonus = caster:GetTalentValue("modifier_pangolier_hero_4", "bonus", true),
			h4_heal = caster:GetTalentValue("modifier_pangolier_hero_4", "heal", true),
		}
	end

	if caster:HasTalent("modifier_pangolier_buckle_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_pangolier_lucky_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_pangolier_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_move = caster:GetTalentValue("modifier_pangolier_hero_2", "move")
		self.talents.h2_armor = caster:GetTalentValue("modifier_pangolier_hero_2", "armor")
	end

	if caster:HasTalent("modifier_pangolier_hero_4") then
		self.talents.has_h4 = 1
	end
end

function pangolier_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_pangolier_innate_custom"
end

modifier_pangolier_innate_custom = class(mod_hidden)
function modifier_pangolier_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.bva = self.parent:GetBaseAttackTime(false)

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.damage_reduce = self.ability:GetSpecialValueFor("damage_reduce")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.base = self.ability:GetSpecialValueFor("base")
	self.ability.damage = self.ability:GetSpecialValueFor("damage") / 100
	self.ability.cd = self.ability:GetSpecialValueFor("cd")

	self.damageTable = { attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self.parent:AddAttackEvent_inc(self, true)
	self.parent:AddSpellEvent(self, true)
end

function modifier_pangolier_innate_custom:AttackEvent_inc(params)
	if not IsServer() then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end
	if self.parent ~= params.target then
		return
	end

	self:ApplyEffect()
end

function modifier_pangolier_innate_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent:GetTeamNumber() == params.unit:GetTeamNumber() then
		return
	end
	if not params.target then
		return
	end
	if params.target ~= self.parent then
		return
	end

	self:ApplyEffect()
end

function modifier_pangolier_innate_custom:ApplyEffect()
	if not IsServer() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_pangolier_innate_custom_cd") then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_pangolier_innate_custom_cd", {})
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_pangolier_innate_custom_damage_reduce",
		{ duration = self.ability.duration }
	)
	self.parent:LogProc("pangolier_innate_custom", self.parent:GetHealthPercent())

	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT, 2.5)

	local particle =
		ParticleManager:CreateParticle("particles/pangolier/innate_proc.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:EmitSound("Pangolier.Innate_armor")
	self.parent:EmitSound("Pangolier.Innate_attack")

	self.damageTable.damage = self.ability.base + self.parent:GetBaseDamageMax() * self.ability.damage

	for _, target in pairs(self.parent:FindTargets(self.ability.radius)) do
		if IsValid(self.parent.lucky_ability) then
			self.parent.lucky_ability:ProcPassive(target)
		end

		self.damageTable.victim = target
		DoDamage(self.damageTable)

		local dir = (self.parent:GetAbsOrigin() - target:GetAbsOrigin()):Normalized()
		dir.z = 0

		local particle =
			ParticleManager:CreateParticle("particles/pangolier/innate_attack.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
		ParticleManager:SetParticleControlForward(particle, 0, dir)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			3,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end
end

function modifier_pangolier_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_pangolier_innate_custom:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h2_armor
		* (self.parent:HasModifier("modifier_pangolier_gyroshell_custom") and self.ability.talents.h2_bonus or 1)
end

function modifier_pangolier_innate_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
end

function modifier_pangolier_innate_custom:GetModifierBaseAttackTimeConstant()
	local bva = 0
	if self.ability.talents.has_q7 == 1 then
		bva = self.ability.talents.q7_bva
	end
	if self.parent:GetUpgradeStack("modifier_pangolier_lucky_shot_custom_legendary_caster") == 1 then
		bva = bva + self.ability.talents.e7_bva
	end
	if bva == 0 then
		return
	end
	return self.bva + bva
end

modifier_pangolier_innate_custom_damage_reduce = class(mod_hidden)
function modifier_pangolier_innate_custom_damage_reduce:GetEffectName()
	return "particles/pangolier/innate_shield.vpcf"
end
function modifier_pangolier_innate_custom_damage_reduce:GetStatusEffectName()
	return "particles/status_fx/status_effect_shredder_whirl.vpcf"
end
function modifier_pangolier_innate_custom_damage_reduce:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_pangolier_innate_custom_damage_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_reduce = self.ability.damage_reduce
		+ (self.ability.talents.has_h4 == 1 and self.ability.talents.h4_damage_reduce or 0)
	if not IsServer() then
		return
	end
	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_pangolier_innate_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_pangolier_innate_custom_damage_reduce:GetModifierIncomingDamage_Percentage()
	return self.damage_reduce
end

function modifier_pangolier_innate_custom_damage_reduce:GetModifierHealthRegenPercentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_heal
end

function modifier_pangolier_innate_custom_damage_reduce:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end
	if not self.parent:CheckCd("pangolier_innate_effect", 0.2) then
		return
	end

	self.parent:EmitSound("Juggernaut.Parry")

	for i = 1, 2 do
		local particle = ParticleManager:CreateParticle(
			"particles/juggernaut/jugg_parry.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle)
	end
end

modifier_pangolier_innate_custom_cd = class(mod_cd)
function modifier_pangolier_innate_custom_cd:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.cd = self.ability.cd
	self:SetStackCount(self.cd)

	self:StartIntervalThink(self:GetInterval())
end

function modifier_pangolier_innate_custom_cd:OnIntervalThink()
	if not IsServer() then
		return
	end

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
		return
	end

	self:StartIntervalThink(self:GetInterval())
end

function modifier_pangolier_innate_custom_cd:GetInterval()
	local result = 1
	if self.ability.talents.has_h4 == 1 and self.parent:GetHealthPercent() <= self.ability.talents.h4_health then
		result = result / self.ability.talents.h4_bonus
	end
	return result
end