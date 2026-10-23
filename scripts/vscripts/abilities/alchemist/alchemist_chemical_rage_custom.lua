--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_alchemist_chemical_rage_custom",
	"abilities/alchemist/alchemist_chemical_rage_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_alchemist_chemical_rage_custom_legendary",
	"abilities/alchemist/alchemist_chemical_rage_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_alchemist_rage_3", "modifier_alchemist_rage_legendary" }
)
LinkLuaModifier(
	"modifier_alchemist_chemical_rage_tracker",
	"abilities/alchemist/alchemist_chemical_rage_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_alchemist_chemical_rage_custom_incoming",
	"abilities/alchemist/alchemist_chemical_rage_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_alchemist_rage_4" }
)
LinkLuaModifier(
	"modifier_alchemist_chemical_rage_custom_attack",
	"abilities/alchemist/alchemist_chemical_rage_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_alchemist_rage_1"
)
LinkLuaModifier(
	"modifier_alchemist_chemical_rage_custom_low_cd",
	"abilities/alchemist/alchemist_chemical_rage_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_alchemist_rage_4"
)

alchemist_chemical_rage_custom = class({})
alchemist_chemical_rage_custom.talents = {}

function alchemist_chemical_rage_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_alchemist/alchemist_chemical_rage.vpcf", context)
	PrecacheResource("particle", "particles/alchemist/alch_cleave.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_alchemist/alchemist_chemical_rage_hero_effect.vpcf",
		context
	)
	PrecacheResource("particle", "particles/alchemist/rage_legendary.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/bounty_hunter/prince_ratsia/prince_ratsia_jinada.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/nullifier_mute.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_alchemist/alchemist_berserk_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_egg.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_streaks.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/rune_arcane_owner.vpcf", context)
end

function alchemist_chemical_rage_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_gold = 0,
			r1_creeps = caster:GetTalentValue("modifier_alchemist_rage_1", "creeps", true),
			r1_bonus = caster:GetTalentValue("modifier_alchemist_rage_1", "bonus", true),
			r1_duration = caster:GetTalentValue("modifier_alchemist_rage_1", "duration", true),
			r1_attacks = caster:GetTalentValue("modifier_alchemist_rage_1", "attacks", true),

			has_r2 = 0,
			r2_cleave = 0,
			r2_move = 0,

			r3_bva = 0,

			has_r4 = 0,
			r4_health = caster:GetTalentValue("modifier_alchemist_rage_4", "health", true),
			r4_duration = caster:GetTalentValue("modifier_alchemist_rage_4", "duration", true),
			r4_damage_reduce = caster:GetTalentValue("modifier_alchemist_rage_4", "damage_reduce", true),
			r4_talent_cd = caster:GetTalentValue("modifier_alchemist_rage_4", "talent_cd", true),

			h3_duration = 0,
			h3_cd = 0,
		}
	end

	if caster:HasTalent("modifier_alchemist_rage_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_alchemist_rage_1", "damage")
		self.talents.r1_gold = caster:GetTalentValue("modifier_alchemist_rage_1", "gold")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_alchemist_rage_2") then
		self.talents.has_r2 = 1
		self.talents.r2_cleave = caster:GetTalentValue("modifier_alchemist_rage_2", "cleave") / 100
		self.talents.r2_move = caster:GetTalentValue("modifier_alchemist_rage_2", "move")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_alchemist_rage_3") then
		self.talents.r3_bva = caster:GetTalentValue("modifier_alchemist_rage_3", "bva")
	end

	if caster:HasTalent("modifier_alchemist_rage_4") then
		self.talents.has_r4 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_alchemist_hero_3") then
		self.talents.h3_duration = caster:GetTalentValue("modifier_alchemist_hero_3", "duration")
		self.talents.h3_cd = caster:GetTalentValue("modifier_alchemist_hero_3", "cd")
	end
end

function alchemist_chemical_rage_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_alchemist_chemical_rage_tracker"
end

function alchemist_chemical_rage_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.h3_cd or 0)
end

function alchemist_chemical_rage_custom:OnSpellStart()
	local buff_duration = self.duration + self.talents.h3_duration

	self.caster:StartGesture(ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_START)
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_alchemist_chemical_rage_custom",
		{ duration = buff_duration, passive = 0 }
	)

	self.caster:EmitSound("Hero_Alchemist.ChemicalRage.Cast")
	ProjectileManager:ProjectileDodge(self.caster)
end

modifier_alchemist_chemical_rage_custom = class(mod_visible)
function modifier_alchemist_chemical_rage_custom:AllowIllusionDuplicate()
	return true
end
function modifier_alchemist_chemical_rage_custom:GetHeroEffectName()
	return "particles/units/heroes/hero_alchemist/alchemist_chemical_rage_hero_effect.vpcf"
end
function modifier_alchemist_chemical_rage_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bat = self.ability:GetSpecialValueFor("base_attack_time")
	self.health_regen = self.ability:GetSpecialValueFor("bonus_health_regen")
	self.movespeed = self.ability:GetSpecialValueFor("bonus_movespeed")

	if not IsServer() then
		return
	end

	self.parent:Purge(false, true, false, false, false)

	if self.ability.talents.has_r4 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ effect = 1, duration = self.ability.talents.r4_duration }
		)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_alchemist_chemical_rage_custom_incoming",
			{ duration = self.ability.talents.r4_duration }
		)
	end

	self.ability:EndCd()

	if IsValid(self.parent.enrage_potion_ability) then
		self.parent.enrage_potion_ability:SetActivated(true)
	end

	self.RemoveForDuel = true

	self.parent:GenericParticle(
		wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/units/heroes/hero_alchemist/alchemist_chemical_rage.vpcf",
			self
		),
		self
	)
	self.parent:EmitSound("Hero_Alchemist.ChemicalRage")
end

function modifier_alchemist_chemical_rage_custom:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:StartGesture(ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_END)

	self.ability:StartCd()

	self.parent:StopSound("Hero_Alchemist.ChemicalRage")

	if IsValid(self.parent.enrage_potion_ability) then
		self.parent.enrage_potion_ability:SetActivated(false)
	end

	self.parent:RemoveModifierByName("modifier_alchemist_chemical_rage_custom_legendary")
end

function modifier_alchemist_chemical_rage_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND,
	}
end

function modifier_alchemist_chemical_rage_custom:GetModifierBaseAttackTimeConstant()
	return self.bat
		+ (
			self.parent:HasModifier("modifier_alchemist_chemical_rage_custom_legendary")
				and (self.ability.talents.r3_bva or 0)
			or 0
		)
end

function modifier_alchemist_chemical_rage_custom:GetModifierConstantHealthRegen()
	return self.health_regen
end

function modifier_alchemist_chemical_rage_custom:GetModifierMoveSpeedBonus_Constant()
	return self.movespeed
end

function modifier_alchemist_chemical_rage_custom:GetActivityTranslationModifiers()
	return "chemical_rage"
end

function modifier_alchemist_chemical_rage_custom:GetAttackSound()
	return "Hero_Alchemist.ChemicalRage.Attack"
end

modifier_alchemist_chemical_rage_custom_incoming = class(mod_hidden)
function modifier_alchemist_chemical_rage_custom_incoming:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.parent:EmitSound("UI.Generic_shield")
	self.buff_particles = {}
	self.buff_particles[1] = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.buff_particles[1],
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		Vector(0, 0, 0),
		false
	)
	self:AddParticle(self.buff_particles[1], false, false, -1, true, false)
	ParticleManager:SetParticleControl(self.buff_particles[1], 3, Vector(255, 255, 255))

	self.buff_particles[2] = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_egg.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.buff_particles[2],
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		Vector(0, 0, 0),
		false
	)
	self:AddParticle(self.buff_particles[2], false, false, -1, true, false)

	self.buff_particles[3] = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_streaks.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.buff_particles[3],
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		Vector(0, 0, 0),
		false
	)
	self:AddParticle(self.buff_particles[3], false, false, -1, true, false)
end

function modifier_alchemist_chemical_rage_custom_incoming:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_alchemist_chemical_rage_custom_incoming:GetModifierIncomingDamage_Percentage()
	return self.ability.talents.r4_damage_reduce
end

modifier_alchemist_chemical_rage_tracker = class(mod_hidden)
function modifier_alchemist_chemical_rage_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.duration = self.ability:GetSpecialValueFor("duration")

	self.parent.enrage_potion_ability = self.parent:FindAbilityByName("alchemist_enrage_potion")
	if IsValid(self.parent.enrage_potion_ability) then
		if IsServer() and not self.parent.enrage_potion_ability:IsTrained() then
			self.parent.enrage_potion_ability:SetLevel(1)
		end
		self.parent.enrage_potion_ability:UpdateTalents()
	end
end

function modifier_alchemist_chemical_rage_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_alchemist_chemical_rage_tracker:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.r1_damage
end

function modifier_alchemist_chemical_rage_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.r2_move
end

function modifier_alchemist_chemical_rage_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.r4_health then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if self.parent:HasModifier("modifier_alchemist_chemical_rage_custom_low_cd") then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_alchemist_chemical_rage_custom_low_cd",
		{ duration = self.ability.talents.r4_talent_cd }
	)

	self.parent:EmitSound("Alchemist.Lowhp_bkb")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_generic_debuff_immune",
		{ effect = 1, duration = self.ability.talents.r4_duration }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_alchemist_chemical_rage_custom_incoming",
		{ duration = self.ability.talents.r4_duration }
	)
end

function modifier_alchemist_chemical_rage_tracker:GetProcChance()
	return 100
end

function modifier_alchemist_chemical_rage_tracker:AttackProc(params, name)
	if self.ability.talents.has_r2 == 1 then
		DoCleaveAttack(
			self.parent,
			params.target,
			self.ability,
			params.damage * self.ability.talents.r2_cleave,
			150,
			360,
			650,
			"particles/alchemist/alch_cleave.vpcf"
		)
	end

	if self.ability.talents.has_r1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_alchemist_chemical_rage_custom_attack",
			{ duration = self.ability.talents.r1_duration, target = params.target:entindex() }
		)
	end
end

modifier_alchemist_chemical_rage_custom_attack = class(mod_visible)
function modifier_alchemist_chemical_rage_custom_attack:GetTexture()
	return "buffs/alchemist/rage_1"
end
function modifier_alchemist_chemical_rage_custom_attack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.attacks = self.ability.talents.r1_attacks
	self.damage = self.ability.talents.r1_damage
	self.gold = self.ability.talents.r1_gold
	self.creeps = self.ability.talents.r1_creeps
	self.bonus = self.ability.talents.r1_bonus

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
end

function modifier_alchemist_chemical_rage_custom_attack:OnRefresh(table)
	if not IsServer() then
		return
	end

	self:IncrementStackCount()

	if self:GetStackCount() < self.attacks then
		return
	end
	local target = EntIndexToHScript(table.target)
	if IsValid(target) then
		target:EmitSound("Alch.gold_attack")

		local bonus_gold = target:IsRealHero() and self.gold or self.gold / self.creeps

		self.parent:GiveGold(bonus_gold, nil, true, "modifier_alchemist_rage_1")

		local digit = string.len(tostring(math.floor(bonus_gold))) + 1
		local effect_cast_2 = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_alchemist/alchemist_lasthit_msg_gold.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(effect_cast_2, 1, Vector(0, bonus_gold, 0))
		ParticleManager:SetParticleControl(effect_cast_2, 2, Vector(1, digit, 0))
		ParticleManager:SetParticleControl(effect_cast_2, 3, Vector(255, 255, 0))
		ParticleManager:ReleaseParticleIndex(effect_cast_2)

		local item_effect = ParticleManager:CreateParticle(
			"particles/econ/items/bounty_hunter/prince_ratsia/prince_ratsia_jinada.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			item_effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			item_effect,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(item_effect)
	end

	self:Destroy()
end

function modifier_alchemist_chemical_rage_custom_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_alchemist_chemical_rage_custom_attack:GetModifierPreAttack_BonusDamage()
	if self:GetStackCount() ~= self.attacks - 1 then
		return
	end
	return self.damage * (self.bonus - 1)
end

modifier_alchemist_chemical_rage_custom_low_cd = class(mod_cd)
function modifier_alchemist_chemical_rage_custom_low_cd:GetTexture()
	return "buffs/alchemist/hero_8"
end

alchemist_enrage_potion = class({})
alchemist_enrage_potion.talents = {}

function alchemist_enrage_potion:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r3 = 0,
			r3_heal = 0,
			r3_duration = caster:GetTalentValue("modifier_alchemist_rage_3", "duration", true),

			has_r7 = 0,
			r7_cd = caster:GetTalentValue("modifier_alchemist_rage_legendary", "cd", true),
			r7_duration = caster:GetTalentValue("modifier_alchemist_rage_legendary", "duration", true),
			r7_orbs_count = caster:GetTalentValue("modifier_alchemist_rage_legendary", "orbs_count", true),
		}
	end

	if caster:HasTalent("modifier_alchemist_rage_3") then
		self.talents.has_r3 = 1
		self.talents.r3_heal = caster:GetTalentValue("modifier_alchemist_rage_3", "heal") / 100
	end

	if caster:HasTalent("modifier_alchemist_rage_legendary") then
		self.talents.has_r7 = 1
	end

	if IsServer() then
		local mod = caster:FindModifierByName("modifier_alchemist_chemical_rage_custom_legendary")
		if mod then
			mod:UpdateEvents()
		end
	end
end

function alchemist_enrage_potion:CreateTalent(name)
	self:UpdateTalents()
	self:SetHidden(false)
	self:SetActivated(self.caster:HasModifier("modifier_alchemist_chemical_rage_custom"))

	if name == "modifier_alchemist_rage_legendary" and dota1x6.current_wave >= upgrade_orange then
		for i = 1, self.talents.r7_orbs_count do
			dota1x6:CreateUpgradeOrb(self.caster, 1)
		end
	end
end

function alchemist_enrage_potion:GetCooldown()
	return self.talents.r7_cd or 0
end

function alchemist_enrage_potion:OnSpellStart()
	local duration = self.talents.has_r7 == 1 and self.talents.r7_duration or self.talents.r3_duration

	self.caster:EmitSound("Alch.Weapon_legendary_vo")
	self.caster:EmitSound("Alch.Weapon_legendary2")
	self.caster:EmitSound("Alch.Weapon_legendary")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_alchemist_chemical_rage_custom_legendary",
		{ duration = duration }
	)
end

modifier_alchemist_chemical_rage_custom_legendary = class(mod_visible)
function modifier_alchemist_chemical_rage_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:RefreshTalentIncrease()

	if not IsServer() then
		return
	end
	self.ability:EndCd()

	self:UpdateEvents()

	self.parent:GenericParticle("particles/generic_gameplay/rune_arcane_owner.vpcf", self)
	self.parent:GenericParticle("particles/alchemist/rage_legendary.vpcf", self)
	self.parent:GenericParticle("particles/generic_gameplay/rune_doubledamage_owner.vpcf", self)

	for i = 1, 2 do
		self.parent:GenericParticle("particles/units/heroes/hero_alchemist/alchemist_berserk_buff.vpcf", self)
	end

	self.parent:CalculateStatBonus(true)
end

function modifier_alchemist_chemical_rage_custom_legendary:UpdateEvents()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r3 == 0 then
		return
	end

	self.parent:AddLifesteal(
		self,
		{ name = "modifier_alchemist_rage_3", type = 2, value = self.ability.talents.r3_heal }
	)
end

function modifier_alchemist_chemical_rage_custom_legendary:OnDestroy()
	if IsValid(self.parent) then
		self.parent:RefreshTalentIncrease()
	end

	if not IsServer() then
		return
	end
	self.ability:StartCd()
	if not self.parent:HasModifier("modifier_alchemist_chemical_rage_custom") then
		self.ability:SetActivated(false)
	end

	self.parent:CalculateStatBonus(true)
end

function modifier_alchemist_chemical_rage_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_alchemist_chemical_rage_custom_legendary:GetModifierModelScale()
	return 20
end