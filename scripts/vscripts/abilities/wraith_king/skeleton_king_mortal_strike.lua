--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_custom",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_legendary",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_legendary_stack",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_skeleton_strike_7"
)
LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_stack",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_bkb_cd",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_skeleton_hero_5"
)
LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_proc",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_speed",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_skeleton_strike_1"
)
LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_root",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_skeleton_strike_4"
)
LinkLuaModifier(
	"modifier_skeleton_king_mortal_strike_root_cd",
	"abilities/wraith_king/skeleton_king_mortal_strike.lua",
	LUA_MODIFIER_MOTION_NONE
)

skeleton_king_mortal_strike_custom = class({})
skeleton_king_mortal_strike_custom.talents = {}
skeleton_king_mortal_strike_custom.current_target = nil

function skeleton_king_mortal_strike_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/econ/items/sven/sven_ti7_sword/sven_ti7_sword_spell_great_cleave_gods_strength.vpcf",
		context
	)
	PrecacheResource("particle", "particles/wraith_king/crit_normal.vpcf", context)
	PrecacheResource("particle", "particles/generic/generic_armor_reduction.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_attack_buf.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_beserkers_call.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/wk_crit_buf.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/crit_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/strike_wk_damage.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/sange_maim.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/crit_arcana_v1.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/crit_arcana_v2.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact.vpcf",
		context
	)
	PrecacheResource("particle", "particles/wraith_king/crit_legendary.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_cleave.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/crit_root.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/skeleton_king_weapon_blur_critical.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/ogre_magi/ogre_ti8_immortal_weapon/ogre_ti8_immortal_bloodlust_buff_hands_glow.vpcf",
		context
	)
end

function skeleton_king_mortal_strike_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_speed = 0,
			e1_max = caster:GetTalentValue("modifier_skeleton_strike_1", "max", true),
			e1_radius = caster:GetTalentValue("modifier_skeleton_strike_1", "radius", true),
			e1_duration = caster:GetTalentValue("modifier_skeleton_strike_1", "duration", true),

			e2_range = 0,

			has_e3 = 0,
			e3_chance = 0,
			e3_damage = 0,
			e3_cd = 0,
			e3_damage_type = caster:GetTalentValue("modifier_skeleton_strike_3", "damage_type", true),
			e3_delay = caster:GetTalentValue("modifier_skeleton_strike_3", "delay", true),

			has_e4 = 0,
			e4_root = caster:GetTalentValue("modifier_skeleton_strike_4", "root", true),
			e4_talent_cd = caster:GetTalentValue("modifier_skeleton_strike_4", "talent_cd", true),

			has_e7 = 0,
			e7_damage = caster:GetTalentValue("modifier_skeleton_strike_7", "damage", true) / 100,
			e7_crit = caster:GetTalentValue("modifier_skeleton_strike_7", "crit", true),
			e7_talent_cd = caster:GetTalentValue("modifier_skeleton_strike_7", "talent_cd", true),
			e7_chance = caster:GetTalentValue("modifier_skeleton_strike_7", "chance", true),
			e7_mark_duration = caster:GetTalentValue("modifier_skeleton_strike_7", "mark_duration", true),
			e7_duration = caster:GetTalentValue("modifier_skeleton_strike_7", "duration", true),
			e7_bva = caster:GetTalentValue("modifier_skeleton_strike_7", "bva", true),

			has_h5 = 0,
			h5_heal_legendary = caster:GetTalentValue("modifier_skeleton_hero_5", "heal_legendary", true) / 100,
			h5_talent_cd = caster:GetTalentValue("modifier_skeleton_hero_5", "talent_cd", true),
			h5_bkb = caster:GetTalentValue("modifier_skeleton_hero_5", "bkb", true),
			h5_magic = caster:GetTalentValue("modifier_skeleton_hero_5", "magic", true),
			h5_heal = caster:GetTalentValue("modifier_skeleton_hero_5", "heal", true) / 100,

			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_skeleton_vampiric_7", "duration", true),
		}
	end

	if caster:HasTalent("modifier_skeleton_strike_1") then
		self.talents.has_e1 = 1
		self.talents.e1_speed = caster:GetTalentValue("modifier_skeleton_strike_1", "speed")
	end

	if caster:HasTalent("modifier_skeleton_strike_2") then
		self.talents.e2_range = caster:GetTalentValue("modifier_skeleton_strike_2", "range")
	end

	if caster:HasTalent("modifier_skeleton_strike_3") then
		self.talents.has_e3 = 1
		self.talents.e3_chance = caster:GetTalentValue("modifier_skeleton_strike_3", "chance")
		self.talents.e3_damage = caster:GetTalentValue("modifier_skeleton_strike_3", "damage") / 100
		self.talents.e3_cd = caster:GetTalentValue("modifier_skeleton_strike_3", "cd")
	end

	if caster:HasTalent("modifier_skeleton_strike_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_skeleton_strike_7") then
		self.talents.has_e7 = 1
		if name == "modifier_skeleton_strike_7" then
			self:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_skeleton_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_skeleton_vampiric_7") then
		self.talents.has_w7 = 1
	end
end

function skeleton_king_mortal_strike_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "skeleton_king_mortal_strike", self)
end

function skeleton_king_mortal_strike_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_skeleton_king_mortal_strike_custom"
end

function skeleton_king_mortal_strike_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function skeleton_king_mortal_strike_custom:GetCooldown(iLevel)
	if self.talents.has_e7 == 1 then
		return self.talents.e7_talent_cd
	end
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.e3_cd or 0)
end

function skeleton_king_mortal_strike_custom:OnAbilityPhaseStart()
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_IDLE_RARE, 3)
end

function skeleton_king_mortal_strike_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_IDLE_RARE)
end

function skeleton_king_mortal_strike_custom:OnSpellStart()
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_skeleton_king_mortal_strike_legendary",
		{ duration = self.talents.e7_duration }
	)
end

function skeleton_king_mortal_strike_custom:UpdateUI()
	if not IsServer() then
		return
	end

	local target = self.current_target
	local stack = 0

	if IsValid(target) then
		local mod = target:FindModifierByName("modifier_skeleton_king_mortal_strike_legendary_stack")
		if mod then
			stack = mod:GetStackCount()
		end
	end

	self.caster:UpdateUIlong({ override_stack = stack, no_min = 1, style = "WraithCrit" })
end

modifier_skeleton_king_mortal_strike_custom = class(mod_hidden)
function modifier_skeleton_king_mortal_strike_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.bva = self.parent:GetBaseAttackTime(false)

	self.ability.crit_mult = self.ability:GetSpecialValueFor("crit_mult")
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100

	self.records = {}
	self.parent:AddRecordDestroyEvent(self, true)
	self.parent:AddAttackRecordEvent_out(self)
end

function modifier_skeleton_king_mortal_strike_custom:OnRefresh()
	self.ability.crit_mult = self.ability:GetSpecialValueFor("crit_mult")
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100
end

function modifier_skeleton_king_mortal_strike_custom:RecordDestroyEvent(params)
	self.records[params.record] = nil
end

function modifier_skeleton_king_mortal_strike_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_skeleton_king_mortal_strike_custom:CheckState()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if not IsValid(self.parent) then
		return
	end
	if not self.parent:HasModifier("modifier_skeleton_king_mortal_strike_proc") then
		return
	end
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_skeleton_king_mortal_strike_custom:GetModifierBaseAttackTimeConstant()
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if not self.bva then
		return
	end
	return self.bva + self.ability.talents.e7_bva
end

function modifier_skeleton_king_mortal_strike_custom:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_magic
end

function modifier_skeleton_king_mortal_strike_custom:GetModifierAttackRangeBonus()
	return self.ability.talents.e2_range
end

function modifier_skeleton_king_mortal_strike_custom:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	self.parent:RemoveModifierByName("modifier_skeleton_king_mortal_strike_proc")

	if not self.parent:HasModifier("modifier_skeleton_king_mortal_strike_legendary") then
		if self.parent:PassivesDisabled() and self.ability.talents.has_e4 == 0 then
			return
		end
		if self.ability.talents.has_e7 == 1 then
			if not RollPseudoRandomPercentage(self:GetCritChance(), 1298, self.parent) then
				return
			end
		else
			if not self.ability:IsFullyCastable() then
				return
			end
		end
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_skeleton_king_mortal_strike_proc", {})
end

function modifier_skeleton_king_mortal_strike_custom:GetCritChance()
	if self.ability.talents.has_e7 == 0 then
		return 0
	end
	if self.parent:HasModifier("modifier_skeleton_king_mortal_strike_legendary") then
		return 100
	end
	if self.parent:PassivesDisabled() and self.ability.talents.has_e4 == 0 then
		return 0
	end
	return self.ability.talents.e7_chance + self.ability.talents.e3_chance
end

function modifier_skeleton_king_mortal_strike_custom:GetCritDamage()
	return self.ability.crit_mult * (self.ability.talents.has_e7 == 1 and (1 + self.ability.talents.e7_damage) or 1)
end

function modifier_skeleton_king_mortal_strike_custom:GetAccuracyChance()
	if self.ability.talents.has_e4 == 0 then
		return 0
	end
	return self:GetCritChance()
end

function modifier_skeleton_king_mortal_strike_custom:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if not self.parent:HasModifier("modifier_skeleton_king_mortal_strike_proc") then
		return
	end

	local type = self.parent:HasModifier("modifier_skeleton_king_mortal_strike_legendary") and 2 or 1
	self.records[params.record] = type
	self.parent:RemoveModifierByName("modifier_skeleton_king_mortal_strike_proc")

	self.parent:RemoveGesture(ACT_DOTA_IDLE_RARE)
	self.parent:RemoveGesture(ACT_DOTA_ATTACK_EVENT)
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT, self.parent:GetAttackSpeed(true))

	local damage = self:GetCritDamage()
	if type == 2 and params.target:HasModifier("modifier_skeleton_king_mortal_strike_legendary_stack") then
		local mod = params.target:FindModifierByName("modifier_skeleton_king_mortal_strike_legendary_stack")
		damage = mod:GetStackCount() * self.ability.talents.e7_crit
	end

	return damage
end

function modifier_skeleton_king_mortal_strike_custom:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	local target = params.target

	local effect = self.records[params.record]
			and "particles/econ/items/sven/sven_ti7_sword/sven_ti7_sword_spell_great_cleave_gods_strength.vpcf"
		or "particles/bloodseeker/thirst_cleave.vpcf"
	DoCleaveAttack(self.parent, target, self.ability, params.damage * self.ability.cleave_damage, 150, 360, 650, effect)

	if not self.records[params.record] then
		return
	end

	if self.ability.talents.has_e3 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_skeleton_king_mortal_strike_stack",
			{ stack = self.ability.talents.e3_damage * params.original_damage, duration = self.ability.talents.e3_delay }
		)
	end

	if self.ability.talents.has_e1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_skeleton_king_mortal_strike_speed",
			{ duration = self.ability.talents.e1_duration }
		)
	end

	if IsValid(self.parent.bone_ability) then
		self.parent.bone_ability:ProcArmor(target, true)
		if self.ability.talents.has_w7 == 1 then
			self.parent.bone_ability:CreateSkeleton(target:GetAbsOrigin(), self.ability.talents.w7_duration, true, true)
		end
	end

	if target:IsRealHero() and self.parent:GetQuest() == "Wraith.Quest_7" and not self.parent:QuestCompleted() then
		self.parent:UpdateQuest(1)
	end

	if self.ability.talents.has_e4 == 1 and not target:HasModifier("modifier_skeleton_king_mortal_strike_root_cd") then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_skeleton_king_mortal_strike_root_cd",
			{ duration = self.ability.talents.e4_talent_cd }
		)
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_skeleton_king_mortal_strike_root",
			{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.e4_root }
		)
	end

	if self.ability.talents.has_h5 == 1 then
		local heal = self.ability.talents.has_e7 == 1 and self.ability.talents.h5_heal_legendary
			or self.ability.talents.h5_heal
		self.parent:GenericHeal(heal * self.parent:GetMaxHealth(), self.ability, false, nil, "modifier_skeleton_hero_5")

		if not self.parent:HasModifier("modifier_skeleton_king_mortal_strike_bkb_cd") and target:IsHero() then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_generic_debuff_immune",
				{ effect = 2, duration = self.ability.talents.h5_bkb }
			)
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_skeleton_king_mortal_strike_bkb_cd",
				{ duration = self.ability.talents.h5_talent_cd }
			)
			self.parent:EmitSound("DOTA_Item.MinotaurHorn.Cast")
		end
	end

	if self.records[params.record] == 2 then
		self.parent:RemoveModifierByName("modifier_skeleton_king_mortal_strike_legendary")
		target:RemoveModifierByName("modifier_skeleton_king_mortal_strike_legendary_stack")

		local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		local coup_pfx = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			coup_pfx,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControl(coup_pfx, 1, target:GetOrigin())
		ParticleManager:SetParticleControlForward(coup_pfx, 1, -vec)
		ParticleManager:ReleaseParticleIndex(coup_pfx)

		params.target:EmitSound("WK.crit_hit")
		params.target:EmitSound("WK.crit_hit2")
	else
		if self.ability.talents.has_e7 == 1 then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_skeleton_king_mortal_strike_legendary_stack",
				{ duration = self.ability.talents.e7_mark_duration }
			)
		else
			self.ability:UseResources(false, false, false, true)
		end
	end

	self.parent:EmitSound(wearables_system:GetSoundReplacement(self.parent, "Hero_SkeletonKing.CriticalStrike", self))
	local part =
		wearables_system:GetParticleReplacementAbility(self.parent, "particles/wraith_king/crit_normal.vpcf", self)
	local part_blur = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_skeletonking/skeleton_king_weapon_blur_critical.vpcf",
		self
	)
	if part_blur ~= "particles/units/heroes/hero_skeletonking/skeleton_king_weapon_blur_critical.vpcf" then
		self.parent:GenericParticle(part_blur)
	end

	self.parent:GenericParticle(part)
end

modifier_skeleton_king_mortal_strike_legendary = class(mod_visible)
function modifier_skeleton_king_mortal_strike_legendary:GetEffectName()
	return "particles/legion_commander/lc_attack_buf.vpcf"
end
function modifier_skeleton_king_mortal_strike_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_beserkers_call.vpcf"
end
function modifier_skeleton_king_mortal_strike_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_skeleton_king_mortal_strike_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability:EndCd()

	self.parent:EmitSound("WK.crit_buf")

	self.parent:GenericParticle("particles/wraith_king/crit_legendary.vpcf", self, true)
	self.parent:GenericParticle("particles/wraith_king/wk_crit_buf.vpcf", self, true, { 1 })
end

function modifier_skeleton_king_mortal_strike_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_skeleton_king_mortal_strike_legendary:GetModifierModelScale()
	return 20
end

function modifier_skeleton_king_mortal_strike_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

modifier_skeleton_king_mortal_strike_legendary_stack = class(mod_visible)
function modifier_skeleton_king_mortal_strike_legendary_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.effect_cast = self.parent:GenericParticle("particles/wraith_king/crit_legendary_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_skeleton_king_mortal_strike_legendary_stack:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	self.ability.current_target = self.parent
	self.ability:UpdateUI()

	local number_1 = self:GetStackCount()
	local double = math.floor(number_1 / 10)
	local number_2 = number_1 - double * 10

	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(double, number_1, number_2))
end

function modifier_skeleton_king_mortal_strike_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.ability then
		return
	end
	if not self.ability.current_target then
		return
	end
	if self.ability.current_target ~= self.parent then
		return
	end

	self.ability.current_target = nil
	self.ability:UpdateUI()
end

modifier_skeleton_king_mortal_strike_stack = class(mod_hidden)
function modifier_skeleton_king_mortal_strike_stack:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_skeleton_king_mortal_strike_stack:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.damage = table.stack
end

function modifier_skeleton_king_mortal_strike_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	self.parent:GenericParticle("particles/wraith_king/strike_wk_damage.vpcf")
	self.parent:EmitSound("WK.Strike_damage")

	DoDamage(
		{
			victim = self.parent,
			attacker = self.caster,
			damage = self.damage,
			damage_type = self.ability.talents.e3_damage_type,
			ability = self.ability,
		},
		"modifier_skeleton_strike_3"
	)
end

modifier_skeleton_king_mortal_strike_bkb_cd = class(mod_cd)
function modifier_skeleton_king_mortal_strike_bkb_cd:GetTexture()
	return "buffs/wraith_king/hero_5"
end

modifier_skeleton_king_mortal_strike_proc = class(mod_hidden)

modifier_skeleton_king_mortal_strike_speed = class(mod_visible)
function modifier_skeleton_king_mortal_strike_speed:GetTexture()
	return "buffs/wraith_king/strike_1"
end
function modifier_skeleton_king_mortal_strike_speed:IsAura()
	return IsServer() and self.parent == self.caster
end
function modifier_skeleton_king_mortal_strike_speed:GetAuraRadius()
	return self.radius
end
function modifier_skeleton_king_mortal_strike_speed:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_skeleton_king_mortal_strike_speed:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC
end
function modifier_skeleton_king_mortal_strike_speed:GetModifierAura()
	return "modifier_skeleton_king_mortal_strike_speed"
end
function modifier_skeleton_king_mortal_strike_speed:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e1_speed
	self.max = self.ability.talents.e1_max
	self.radius = self.ability.talents.e1_radius
	self.is_caster = self.parent == self.caster

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	if not self.is_caster then
		self:OnIntervalThink()
		self:StartIntervalThink(0.5)
		return
	end

	self:OnRefresh()
end

function modifier_skeleton_king_mortal_strike_speed:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.caster:GetUpgradeStack(self:GetName()) < self.max then
		return
	end
	self.parent:GenericParticle(
		"particles/econ/items/ogre_magi/ogre_ti8_immortal_weapon/ogre_ti8_immortal_bloodlust_buff_hands_glow.vpcf",
		self
	)
	self:StartIntervalThink(-1)
end

function modifier_skeleton_king_mortal_strike_speed:OnRefresh()
	if not IsServer() then
		return
	end
	if not self.is_caster then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle(
			"particles/econ/items/ogre_magi/ogre_ti8_immortal_weapon/ogre_ti8_immortal_bloodlust_buff_hands_glow.vpcf",
			self
		)
		self.parent:EmitSound("WK.Skelet_buff")
	end
end

function modifier_skeleton_king_mortal_strike_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_skeleton_king_mortal_strike_speed:GetModifierAttackSpeedBonus_Constant()
	return (self.is_caster and self:GetStackCount() or self.caster:GetUpgradeStack(self:GetName())) * self.speed
end

function modifier_skeleton_king_mortal_strike_speed:GetAuraEntityReject(hEntity)
	return not hEntity.is_wk_skelet
end

modifier_skeleton_king_mortal_strike_root = class(mod_hidden)
function modifier_skeleton_king_mortal_strike_root:IsPurgable()
	return true
end
function modifier_skeleton_king_mortal_strike_root:OnCreated()
	self.parent = self:GetParent()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("WK.Crit_root")
	self.parent:GenericParticle("particles/wraith_king/crit_root.vpcf", self)
end

function modifier_skeleton_king_mortal_strike_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_skeleton_king_mortal_strike_root_cd = class(mod_hidden)
function modifier_skeleton_king_mortal_strike_root_cd:OnCreated()
	self.RemoveForDuel = true
end