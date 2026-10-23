--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_antimage_mana_void_custom_slow",
	"abilities/antimage/antimage_mana_void_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_hero_4"
)
LinkLuaModifier(
	"modifier_antimage_mana_void_custom_tracker",
	"abilities/antimage/antimage_mana_void_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_mana_void_custom_int",
	"abilities/antimage/antimage_mana_void_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_void_3"
)
LinkLuaModifier(
	"modifier_antimage_mana_void_custom_cast_cd",
	"abilities/antimage/antimage_mana_void_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_mana_void_custom_illusion",
	"abilities/antimage/antimage_mana_void_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_mana_void_custom_perma",
	"abilities/antimage/antimage_mana_void_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_hero_4"
)
LinkLuaModifier(
	"modifier_antimage_mana_void_custom_silence",
	"abilities/antimage/antimage_mana_void_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_hero_5"
)

antimage_mana_void_custom = class({})
antimage_mana_void_custom.talents = {}

function antimage_mana_void_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_antimage/antimage_manavoid.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/void_astral_slow.vpcf", context)
	PrecacheResource("particle", "particles/antimage/am_void_cd.vpcf", context)
	PrecacheResource("particle", "particles/antimage/am_mana_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_faceless_void/faceless_void_dialatedebuf_2.vpcf", context)
	PrecacheResource("particle", "particles/antimage/am_cast.vpcf", context)
	PrecacheResource("particle", "particles/antimage/am_mana_mark.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_silencer/silencer_last_word_status.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/nullifier_mute_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_nullifier.vpcf", context)
	PrecacheResource("particle", "particles/antimage/void_silence.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_perma.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/antimage/antimage_weapon_basher_ti5/antimage_manavoid_ti_5.vpcf",
		context
	)
end

function antimage_mana_void_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_base = 0,
			r1_mana = caster:GetTalentValue("modifier_antimage_void_1", "mana", true) / 100,
			r1_damage_type = caster:GetTalentValue("modifier_antimage_void_1", "damage_type", true),

			r2_cd = 0,
			r2_heal = 0,

			has_r3 = 0,
			r3_mana = 0,
			r3_spell = 0,
			r3_max = caster:GetTalentValue("modifier_antimage_void_3", "max", true),
			r3_duration = caster:GetTalentValue("modifier_antimage_void_3", "duration", true),

			has_r4 = 0,
			r4_cdr = caster:GetTalentValue("modifier_antimage_void_4", "cdr", true),
			r4_cd_items = caster:GetTalentValue("modifier_antimage_void_4", "cd_items", true),
			r4_range = caster:GetTalentValue("modifier_antimage_void_4", "range", true),

			has_r7 = 0,

			has_h4 = 0,
			h4_slow = caster:GetTalentValue("modifier_antimage_hero_4", "slow", true),
			h4_duration = caster:GetTalentValue("modifier_antimage_hero_4", "duration", true),
			h4_mana = caster:GetTalentValue("modifier_antimage_hero_4", "mana", true) / 100,
			h4_max = caster:GetTalentValue("modifier_antimage_hero_4", "max", true),
			h4_damage = caster:GetTalentValue("modifier_antimage_hero_4", "damage", true),

			has_h5 = 0,
			h5_attack_slow = caster:GetTalentValue("modifier_antimage_hero_5", "attack_slow", true),
			h5_silence = caster:GetTalentValue("modifier_antimage_hero_5", "silence", true),
			h5_talent_cd = caster:GetTalentValue("modifier_antimage_hero_5", "talent_cd", true),
			h5_radius = caster:GetTalentValue("modifier_antimage_hero_5", "radius", true),
		}
	end

	if caster:HasTalent("modifier_antimage_void_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_antimage_void_1", "damage") / 100
		self.talents.r1_base = caster:GetTalentValue("modifier_antimage_void_1", "base")
	end

	if caster:HasTalent("modifier_antimage_void_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_antimage_void_2", "cd")
		self.talents.r2_heal = caster:GetTalentValue("modifier_antimage_void_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_antimage_void_2", type = 1, value = self.talents.r2_heal })
	end

	if caster:HasTalent("modifier_antimage_void_3") then
		self.talents.has_r3 = 1
		self.talents.r3_mana = caster:GetTalentValue("modifier_antimage_void_3", "mana") / 100
		self.talents.r3_spell = caster:GetTalentValue("modifier_antimage_void_3", "spell")
	end

	if caster:HasTalent("modifier_antimage_void_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_antimage_void_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_antimage_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_antimage_hero_5") then
		self.talents.has_h5 = 1
		caster:AddSpellEvent(self.tracker, true)
	end
end

function antimage_mana_void_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "antimage_mana_void", self)
end

function antimage_mana_void_custom:GetIntrinsicModifierName()
	return "modifier_antimage_mana_void_custom_tracker"
end

function antimage_mana_void_custom:GetAOERadius()
	return (self.mana_void_aoe_radius or 0)
end

function antimage_mana_void_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.r2_cd or 0)
end

function antimage_mana_void_custom:OnAbilityPhaseStart(kv)
	self.target = self:GetCursorTarget()
	self.sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Antimage.ManaVoidCast", self)
	self.target:EmitSound(self.sound)
	return true
end

function antimage_mana_void_custom:OnAbilityPhaseInterrupted()
	self.target:StopSound(self.sound)
end

function antimage_mana_void_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	local legendary_mod = self.caster:FindModifierByName("modifier_antimage_mana_void_custom_illusion")
	if legendary_mod then
		legendary_mod.ready = false
	end

	if target:TriggerSpellAbsorb(self) then
		return
	end

	if
		self.caster:IsRealHero()
		and target:IsRealHero()
		and self.caster:GetQuest() == "Anti.Quest_8"
		and target:GetManaPercent() <= self.caster.quest.number
		and not self.caster:QuestCompleted()
	then
		self.caster:UpdateQuest(1)
	end

	local max_mana = target:GetMaxMana()
	local min_mana = target:GetMana()

	if max_mana == 0 then
		max_mana = self.nomana_max
		min_mana = self.nomana_min
	end

	local mana_damage = (max_mana - min_mana) * self.mana_void_damage_per_mana
	mana_damage = legendary_mod and legendary_mod.damage * mana_damage or mana_damage

	local damage_ability = legendary_mod and "modifier_antimage_void_7" or nil

	target:EmitSound("Hero_Antimage.ManaVoid")

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_antimage/antimage_manavoid.vpcf",
		self
	)
	local particle = ParticleManager:CreateParticle(particle_name, PATTACH_POINT_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(particle, 1, Vector(self.mana_void_aoe_radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	if not legendary_mod then
		if self.talents.has_r4 == 1 then
			self.caster:CdItems(self.talents.r4_cd_items * (1 - min_mana / max_mana), "modifier_antimage_void_4")
		end
		if self.talents.has_h4 == 1 then
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_antimage_mana_void_custom_slow",
				{ duration = (1 - target:GetStatusResistance()) * self.talents.h4_duration }
			)
		end
		if target:IsRealHero() and min_mana / max_mana <= self.talents.h4_mana then
			self.caster:AddNewModifier(self.caster, self, "modifier_antimage_mana_void_custom_perma", {})
		end
	end

	local attacker = self.caster.owner or self.caster

	for _, enemy in pairs(self.caster:FindTargets(self.mana_void_aoe_radius, target:GetAbsOrigin())) do
		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_stunned",
			{ duration = self.mana_void_ministun * (1 - enemy:GetStatusResistance()) }
		)
		DoDamage(
			{
				victim = enemy,
				attacker = attacker,
				damage = mana_damage,
				damage_type = DAMAGE_TYPE_MAGICAL,
				ability = self,
			},
			damage_ability
		)
	end

	if target:IsCreep() then
		self:EndCd(0)
		self:StartCooldown(self.creep_cd)
	end
end

function antimage_mana_void_custom:ApplyBurn(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r1 == 0 then
		return
	end

	target:EmitSound("Antimage.Void_burn")
	local damage = self.caster:GetMaxMana() * self.talents.r1_damage + self.talents.r1_base
	local damageTable = {
		victim = target,
		attacker = self.caster,
		damage = damage,
		ability = self,
		damage_type = self.talents.r1_damage_type,
	}

	local real_damage = DoDamage(damageTable, "modifier_antimage_void_1")
	local real_mana = target:Script_ReduceMana(damage * self.talents.r1_mana, self)
	if self.caster.counterspell_ability then
		self.caster.counterspell_ability:ShardMana(real_mana)
	end

	target:SendNumber(4, real_damage)
end

modifier_antimage_mana_void_custom_slow = class(mod_hidden)
function modifier_antimage_mana_void_custom_slow:GetEffectName()
	return "particles/items4_fx/nullifier_mute_debuff.vpcf"
end
function modifier_antimage_mana_void_custom_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_nullifier.vpcf"
end
function modifier_antimage_mana_void_custom_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_antimage_mana_void_custom_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Antimage.Void_break")
end

function modifier_antimage_mana_void_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_antimage_mana_void_custom_slow:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

function modifier_antimage_mana_void_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.h4_slow
end

modifier_antimage_mana_void_custom_tracker = class(mod_hidden)
function modifier_antimage_mana_void_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.manavoid_ability = self.ability

	self.parent.manavoid_ability_legendary = self.parent:FindAbilityByName("antimage_mana_overload_custom")
	if self.parent.manavoid_ability_legendary then
		self.parent.manavoid_ability_legendary:UpdateTalents()
	end

	self.ability.mana_void_damage_per_mana = self.ability:GetSpecialValueFor("mana_void_damage_per_mana")
	self.ability.mana_void_ministun = self.ability:GetSpecialValueFor("mana_void_ministun")
	self.ability.mana_void_aoe_radius = self.ability:GetSpecialValueFor("mana_void_aoe_radius")
	self.ability.creep_cd = self.ability:GetSpecialValueFor("creep_cd")
	self.ability.nomana_min = self.ability:GetSpecialValueFor("nomana_min")
	self.ability.nomana_max = self.ability:GetSpecialValueFor("nomana_max")
end

function modifier_antimage_mana_void_custom_tracker:OnRefresh()
	self.ability.mana_void_damage_per_mana = self.ability:GetSpecialValueFor("mana_void_damage_per_mana")
end

function modifier_antimage_mana_void_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_antimage_mana_void_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.r3_spell
end

function modifier_antimage_mana_void_custom_tracker:GetModifierCastRangeBonusStacking()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_range
end

function modifier_antimage_mana_void_custom_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_cdr
end

function modifier_antimage_mana_void_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	local unit = params.unit

	if params.ability:IsItem() then
		return
	end
	if unit:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if (unit:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.ability.talents.h5_radius then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if unit:IsInvulnerable() then
		return
	end
	if unit:HasModifier("modifier_antimage_mana_void_custom_cast_cd") then
		return
	end

	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_antimage_mana_void_custom_silence",
		{ duration = self.ability.talents.h5_silence * (1 - unit:GetStatusResistance()) }
	)
	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_antimage_mana_void_custom_cast_cd",
		{ duration = self.ability.talents.h5_talent_cd }
	)
	unit:EmitSound("Antimage.Void_silence2")

	local zap_pfx =
		ParticleManager:CreateParticle("particles/antimage/am_void_cd.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		zap_pfx,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		zap_pfx,
		1,
		unit,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		unit:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(zap_pfx)
end

modifier_antimage_mana_void_custom_int = class(mod_visible)
function modifier_antimage_mana_void_custom_int:GetTexture()
	return "buffs/antimage/manavoid_3"
end
function modifier_antimage_mana_void_custom_int:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.stack = self.ability.talents.r3_mana

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.effect_cast = self.parent:GenericParticle("particles/antimage/am_mana_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_antimage_mana_void_custom_int:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))

	if self.parent:IsRealHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_antimage_mana_void_custom_int:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANA_BONUS,
	}
end

function modifier_antimage_mana_void_custom_int:GetModifierManaBonus()
	return self:GetStackCount() * self.caster:GetMaxMana() * self.stack
end

modifier_antimage_mana_void_custom_cast_cd = class(mod_hidden)
function modifier_antimage_mana_void_custom_cast_cd:OnCreated(table)
	self.RemoveForDuel = true
end

modifier_antimage_mana_void_custom_perma = class(mod_hidden)
function modifier_antimage_mana_void_custom_perma:IsHidden()
	return self.ability.talents.has_h4 == 0 or self:GetStackCount() >= self.max
end
function modifier_antimage_mana_void_custom_perma:RemoveOnDeath()
	return false
end
function modifier_antimage_mana_void_custom_perma:GetTexture()
	return "buffs/antimage/hero_4"
end
function modifier_antimage_mana_void_custom_perma:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.h4_max
	self.damage = self.ability.talents.h4_damage

	if not IsServer() then
		return
	end
	self:IncrementStackCount()
	self:StartIntervalThink(1)
end

function modifier_antimage_mana_void_custom_perma:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_antimage_mana_void_custom_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end
	if self.ability.talents.has_h4 == 0 then
		return
	end

	self.parent:GenericParticle("particles/enigma/summon_perma.vpcf")

	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_antimage_mana_void_custom_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_antimage_mana_void_custom_perma:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self:GetStackCount() * self.damage
end

function modifier_antimage_mana_void_custom_perma:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self:GetStackCount() * self.damage
end

modifier_antimage_mana_void_custom_silence = class(mod_hidden)
function modifier_antimage_mana_void_custom_silence:IsPurgable()
	return true
end
function modifier_antimage_mana_void_custom_silence:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Antimage.Void_silence")
	self.parent:GenericParticle("particles/antimage/void_silence.vpcf", self, true)
end

function modifier_antimage_mana_void_custom_silence:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_antimage_mana_void_custom_silence:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_antimage_mana_void_custom_silence:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.h5_attack_slow
end

antimage_mana_overload_custom = class({})
antimage_mana_overload_custom.talents = {}

function antimage_mana_overload_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_antimage/antimage_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_antimage/antimage_blink_end.vpcf", context)
end

function antimage_mana_overload_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_talent_cd = caster:GetTalentValue("modifier_antimage_void_7", "talent_cd", true),
			r7_delay = caster:GetTalentValue("modifier_antimage_void_7", "delay", true),

			has_h6 = 0,
		}
	end

	if caster:HasTalent("modifier_antimage_hero_6") then
		self.talents.has_h6 = 1
	end
end

function antimage_mana_overload_custom:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.duration = self:GetLevelSpecialValueFor("duration", 1)
	self.outgoing_damage = self:GetLevelSpecialValueFor("outgoing_damage", 1)
	self.incoming_damage = self:GetLevelSpecialValueFor("incoming_damage", 1)
	self.incoming = self:GetLevelSpecialValueFor("incoming", 1)
	self.ulti_damage = self:GetLevelSpecialValueFor("ulti_damage", 1)
	self.ulti_timer = self:GetLevelSpecialValueFor("ulti_timer", 1)
	self.nomana_max = self:GetLevelSpecialValueFor("nomana_max", 1)
	self.mana_burn = self:GetLevelSpecialValueFor("mana_burn", 1)
	self.mana_burn_creeps = self:GetLevelSpecialValueFor("mana_burn_creeps", 1)
	self.damage_reduce = self:GetLevelSpecialValueFor("damage_reduce", 1)

	if IsServer() then
		self:SetLevel(1)
	end
end

function antimage_mana_overload_custom:CreateTalent()
	self:SetHidden(false)
end

function antimage_mana_overload_custom:GetCooldown(iLevel)
	return (self.talents.r7_talent_cd or 0)
end

function antimage_mana_overload_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	if self.caster.antimage_blink_ability then
		self.caster.antimage_blink_ability:DealDamage(self.caster:GetAbsOrigin(), point)
	end

	local illusions = CreateIllusions(
		self.caster,
		self.caster,
		{ duration = self.duration, outgoing_damage = self.outgoing_damage, incoming_damage = self.incoming_damage },
		1,
		0,
		false,
		false
	)

	for _, illusion in pairs(illusions) do
		illusion.owner = self.caster

		for _, mod in pairs(self.caster:FindAllModifiers()) do
			if mod.StackOnIllusion == true then
				illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount(), mod)
			end
		end

		illusion:AddNewModifier(self.caster, self, "modifier_antimage_mana_void_custom_illusion", {})
		illusion:SetHealth(illusion:GetMaxHealth())

		local direction = (point - illusion:GetAbsOrigin())
		direction.z = 0
		direction = direction:Normalized()

		local particle_start = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_antimage/antimage_blink_start.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(particle_start, 0, illusion:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(particle_start, 0, direction:Normalized())
		ParticleManager:ReleaseParticleIndex(particle_start)
		EmitSoundOnLocationWithCaster(illusion:GetAbsOrigin(), "Hero_Antimage.Blink_out", illusion)

		FindClearSpaceForUnit(illusion, point, true)

		illusion:StartGesture(ACT_DOTA_CAST_ABILITY_2)

		local particle_end = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_antimage/antimage_blink_end.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			illusion
		)
		ParticleManager:SetParticleControl(particle_end, 0, illusion:GetOrigin())
		ParticleManager:SetParticleControlForward(particle_end, 0, direction:Normalized())
		ParticleManager:ReleaseParticleIndex(particle_end)
		EmitSoundOnLocationWithCaster(illusion:GetOrigin(), "Hero_Antimage.Blink_in", illusion)

		Timers:CreateTimer(0.1, function()
			illusion:MoveToPositionAggressive(point)
		end)
	end
end

modifier_antimage_mana_void_custom_illusion = class(mod_hidden)
function modifier_antimage_mana_void_custom_illusion:OnCreated(table)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not self.caster.antimage_illusions then
		self.caster.antimage_illusions = {}
	end

	self.caster.antimage_illusions[self.parent] = true

	self.mana_burn = self.ability.mana_burn / 100
	self.mana_burn_creeps = self.ability.mana_burn_creeps
	self.nomana_max = self.ability.nomana_max
	self.damage = self.ability.ulti_damage / 100

	self.damageTable = { attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self.ulti = self.parent:FindAbilityByName("antimage_mana_void_custom")
	self.ready = false

	if not self.ulti or not self.ulti:IsTrained() then
		return
	end
	self:StartIntervalThink(self.ability.talents.r7_delay)
end

function modifier_antimage_mana_void_custom_illusion:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.ready = true

	self.caster:AddAttackStartEvent_out(self, true)
	self:StartIntervalThink(-1)
end

function modifier_antimage_mana_void_custom_illusion:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.ready == false then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not IsValid(params.target) then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if not params.target:IsAlive() then
		return
	end

	self.parent:CastAbilityOnTarget(params.target, self.ulti, -1)
end

function modifier_antimage_mana_void_custom_illusion:ManaBurn(target)
	if not IsServer() then
		return
	end
	local mana = target:GetMaxMana() <= 0 and self.mana_burn * self.nomana_max or self.mana_burn * target:GetMaxMana()
	mana = target:IsCreep() and self.mana_burn_creeps or mana

	self.damageTable.damage = mana
	self.damageTable.victim = target

	DoDamage(self.damageTable, "modifier_antimage_void_7")

	local real_mana =
		target:Script_ReduceMana(mana, self.caster:BkbAbility(self.ability, self.ability.talents.has_h6 == 1))
	if self.caster.counterspell_ability then
		self.caster.counterspell_ability:ShardMana(real_mana)
	end
end

function modifier_antimage_mana_void_custom_illusion:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.caster.antimage_illusions then
		return
	end
	self.caster.antimage_illusions[self.parent] = nil
end