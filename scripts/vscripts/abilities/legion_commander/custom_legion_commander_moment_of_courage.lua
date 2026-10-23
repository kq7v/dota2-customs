--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_moment_of_courage_custom_tracker",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_crit_attack",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_legendary_defence",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_moment_7"
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_legendary_attack",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_slow",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_damage_reduce",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_moment_2"
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_attack",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_speed",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_moment_1"
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_crit_cd",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_moment_3"
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_crit_anim",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_moment_of_courage_custom_spell",
	"abilities/legion_commander/custom_legion_commander_moment_of_courage",
	LUA_MODIFIER_MOTION_NONE
)

custom_legion_commander_moment_of_courage = class({})
custom_legion_commander_moment_of_courage.talents = {}

function custom_legion_commander_moment_of_courage:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/legion_commander/lc_hit.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/moment_legendary_proc.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/crit_ready.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/sven/sven_ti7_sword/sven_ti7_sword_spell_great_cleave_gods_strength.vpcf",
		context
	)
	PrecacheResource("particle", "particles/legion_commander/lc_attack_buf.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_attack.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/star_emblem_friend_shield.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_egg.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_streaks.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/sange_maim.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_legion_commander/legion_commander_courage_tgt.vpcf",
		context
	)
	PrecacheResource("particle", "particles/bloodseeker/thirst_cleave.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/moment_legendary_shield.vpcf", context)
end

function custom_legion_commander_moment_of_courage:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_range = 0,
			e1_speed = 0,
			e1_duration = caster:GetTalentValue("modifier_legion_moment_1", "duration", true),
			e1_max = caster:GetTalentValue("modifier_legion_moment_1", "max", true),

			has_e2 = 0,
			e2_damage_reduce = 0,
			e2_slow = 0,
			e2_duration = caster:GetTalentValue("modifier_legion_moment_2", "duration", true),

			has_e3 = 0,
			e3_stun = 0,
			e3_crit = 0,
			e3_talent_cd = caster:GetTalentValue("modifier_legion_moment_3", "talent_cd", true),
			e3_heal = caster:GetTalentValue("modifier_legion_moment_3", "heal", true) / 100,
			e3_cd_reduce = caster:GetTalentValue("modifier_legion_moment_3", "cd_reduce", true),

			has_e4 = 0,
			e4_attack = caster:GetTalentValue("modifier_legion_moment_4", "attack", true),

			has_e7 = 0,
			e7_bva = caster:GetTalentValue("modifier_legion_moment_7", "bva", true),
			e7_talent_cd = caster:GetTalentValue("modifier_legion_moment_7", "talent_cd", true),
			e7_heal = caster:GetTalentValue("modifier_legion_moment_7", "heal", true) / 100,
			e7_damage_reduce = caster:GetTalentValue("modifier_legion_moment_7", "damage_reduce", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_legion_moment_1") then
		self.talents.has_e1 = 1
		self.talents.e1_range = caster:GetTalentValue("modifier_legion_moment_1", "range")
		self.talents.e1_speed = caster:GetTalentValue("modifier_legion_moment_1", "speed")
	end

	if caster:HasTalent("modifier_legion_moment_2") then
		self.talents.has_e2 = 1
		self.talents.e2_damage_reduce = caster:GetTalentValue("modifier_legion_moment_2", "damage_reduce")
		self.talents.e2_slow = caster:GetTalentValue("modifier_legion_moment_2", "slow")
	end

	if caster:HasTalent("modifier_legion_moment_3") then
		self.talents.has_e3 = 1
		self.talents.e3_crit = caster:GetTalentValue("modifier_legion_moment_3", "crit")
		self.talents.e3_stun = caster:GetTalentValue("modifier_legion_moment_3", "stun")
		caster:AddAttackStartEvent_out(self.tracker, true)
		caster:AddAttackRecordEvent_out(self.tracker)
		caster:AddLifesteal(self.tracker, {
			name = "modifier_legion_moment_3",
			type = 2,
			text = true,
			proc = "LifestealRecord",
			value = function(params)
				if not params.record then
					return 0
				end
				if params.record ~= self.tracker.record then
					return 0
				end
				if params.attack_damage_flag == "lc_moment" then
					return 0
				end
				return self.talents.e3_heal
			end,
		})
	end

	if caster:HasTalent("modifier_legion_moment_4") then
		self.talents.has_e4 = 1
		caster:AddAttackStartEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_legion_moment_7") then
		self.talents.has_e7 = 1
		caster:AddAttackStartEvent_out(self.tracker, true)
		if IsServer() and name == "modifier_legion_moment_7" then
			self:OnToggle()
		end
	end

	if caster:HasTalent("modifier_legion_duel_7") then
		self.talents.has_r7 = 1
	end
end

function custom_legion_commander_moment_of_courage:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_moment_of_courage_custom_legendary_attack") then
		return "moment_of_curage_attack"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "legion_commander_moment_of_courage", self)
end

function custom_legion_commander_moment_of_courage:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_moment_of_courage_custom_tracker"
end

function custom_legion_commander_moment_of_courage:ResetToggleOnRespawn()
	return false
end

function custom_legion_commander_moment_of_courage:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
			+ DOTA_ABILITY_BEHAVIOR_TOGGLE
			+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function custom_legion_commander_moment_of_courage:OnToggle()
	if self:GetToggleState() then
		self.caster:AddNewModifier(self.caster, self, "modifier_moment_of_courage_custom_legendary_attack", {})
		self.caster:RemoveModifierByName("modifier_moment_of_courage_custom_legendary_defence")
	else
		self.caster:AddNewModifier(self.caster, self, "modifier_moment_of_courage_custom_legendary_defence", {})
		self.caster:RemoveModifierByName("modifier_moment_of_courage_custom_legendary_attack")
	end

	self:StartCooldown(self.talents.e7_talent_cd)
end

modifier_moment_of_courage_custom_tracker = class(mod_hidden)
function modifier_moment_of_courage_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.moment_ability = self.ability

	self.ability.trigger_attacks = self.ability:GetSpecialValueFor("trigger_attacks")
	self.ability.hp_leech_percent = self.ability:GetSpecialValueFor("hp_leech_percent") / 100
	self.ability.cleave = self.ability:GetSpecialValueFor("cleave") / 100
	self.record = nil

	self.parent:AddAttackRecordEvent_inc(self)
	self.parent:AddProc(self, { damage = true })
	self.parent:AddLifesteal(self, {
		type = 2,
		text = true,
		proc = "LifestealQuest",
		value = function(params)
			if params.attack_damage_flag ~= "lc_moment" then
				return 0
			end
			return self.ability.hp_leech_percent
		end,
	})
	self:RefreshStack()
end

function modifier_moment_of_courage_custom_tracker:OnRefresh()
	self.ability.trigger_attacks = self.ability:GetSpecialValueFor("trigger_attacks")
	self.ability.hp_leech_percent = self.ability:GetSpecialValueFor("hp_leech_percent") / 100
	self:RefreshStack()
end

function modifier_moment_of_courage_custom_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e3 == 0 then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	self.parent:RemoveModifierByName("modifier_moment_of_courage_custom_crit_attack")
	self.parent:RemoveModifierByName("modifier_moment_of_courage_custom_crit_anim")

	if not params.target:IsUnit() then
		return
	end
	if self.parent:HasModifier("modifier_moment_of_courage_custom_crit_cd") then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_moment_of_courage_custom_crit_attack", {})
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_moment_of_courage_custom_crit_anim", {})
	self.parent:EmitSound("Lc.Odds_ChargeHit")
end

function modifier_moment_of_courage_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	if self.record == params.record then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_moment_of_courage_custom_crit_cd", {})
		self.parent:RemoveModifierByName("modifier_moment_of_courage_custom_crit_anim")
	end

	local mod = self.parent:FindModifierByName("modifier_moment_of_courage_custom_spell")
	if mod and not mod.ended then
		mod.ended = true
		self:ProcAttack(params.target, true)
		mod:Destroy()
		return
	end

	if self.parent:HasModifier("modifier_moment_of_courage_custom_legendary_attack") then
		self:AddStack(params.target)
	end
end

function modifier_moment_of_courage_custom_tracker:AttackRecordEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_moment_of_courage_custom_legendary_attack") then
		return
	end
	if self.parent ~= params.target then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end

	self:AddStack()
end

function modifier_moment_of_courage_custom_tracker:AddStack(new_target)
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_moment_of_courage_custom_spell") then
		return
	end
	if self.parent:PassivesDisabled() and self.ability.talents.has_e4 == 0 then
		return
	end

	if self.ability.talents.has_e7 == 1 then
		if self.parent:HasCd("lc_moment", self.ability:GetCooldown(self.ability:GetLevel())) then
			return
		end
	else
		if not self.ability:IsFullyCastable() then
			return
		end
	end

	self:DecrementStackCount()
	local target = new_target
	if not target then
		target = self.parent:GetAttackTarget()
	end

	if self:GetStackCount() <= 0 and target then
		self:ProcAttack(target, new_target)
		self:RefreshStack()

		if self.ability.talents.has_e7 == 0 then
			self.ability:StartCd()
		else
			self.parent:CheckCd("lc_moment", self.ability:GetCooldown(self.ability:GetLevel()))
		end
	end
end

function modifier_moment_of_courage_custom_tracker:RefreshStack()
	if not IsServer() then
		return
	end
	self:SetStackCount(
		self.ability.trigger_attacks + (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_attack or 0)
	)
end

function modifier_moment_of_courage_custom_tracker:ProcAttack(target, is_attack)
	if not IsServer() then
		return
	end

	local dir = (target:GetOrigin() - self.parent:GetOrigin()):Normalized()
	local part = "particles/legion_commander/lc_hit.vpcf"
	if is_attack then
		part = "particles/legion_commander/moment_legendary_proc.vpcf"
	else
		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_legion_commander/legion_commander_courage_tgt.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(particle, 1, dir)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	local is_arcana = 0
	local hero_base = self.parent:GetItemWearableHandle("hero_base")
	if hero_base and hero_base.item_id_original == "5810" then
		is_arcana = 1
	end

	if not self.parent:HasModifier("modifier_moment_of_courage_custom_crit_anim") then
		self.parent:RemoveGesture(ACT_DOTA_ATTACK)
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 2)
		local particle = ParticleManager:CreateParticle(part, PATTACH_ABSORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(particle, 1, dir)
		ParticleManager:SetParticleControl(particle, 2, Vector(1, 1, 1))
		ParticleManager:SetParticleControl(particle, 3, Vector(is_arcana, 0, 0))
		ParticleManager:SetParticleControlForward(particle, 5, dir)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	self.parent:EmitSound("Hero_LegionCommander.Courage")

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_moment_of_courage_custom_attack", {})
	self.parent:PerformAttack(target, true, true, true, true, false, false, false, { damage = "lc_moment" })
	self.parent:RemoveModifierByName("modifier_moment_of_courage_custom_attack")

	if self.ability.talents.has_e2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_moment_of_courage_custom_damage_reduce",
			{ duration = self.ability.talents.e2_duration }
		)
	end

	if self.ability.talents.has_e1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_moment_of_courage_custom_speed",
			{ duration = self.ability.talents.e1_duration }
		)
	end

	local mod = self.parent:FindModifierByName("modifier_moment_of_courage_custom_crit_cd")
	if mod then
		mod:ReduceCd(self.ability.talents.e3_cd_reduce)
	end

	if self.ability.talents.has_r7 == 0 and IsValid(self.parent.duel_ability) then
		self.parent.duel_ability:ApplyArmor(target)
	end
end

function modifier_moment_of_courage_custom_tracker:GetProcChance()
	return 100
end

function modifier_moment_of_courage_custom_tracker:DamageProc(params, name)
	local target = params.target
	local cleave_effect

	if self.record and self.record == params.record then
		target:AddNewModifier(
			self.parent,
			self.parent:BkbAbility(self.ability, true),
			"modifier_bashed",
			{ duration = self.ability.talents.e3_stun }
		)
		target:EmitSound("Lc.Moment_bash")
		cleave_effect = "particles/econ/items/sven/sven_ti7_sword/sven_ti7_sword_spell_great_cleave_gods_strength.vpcf"
	end

	if params.attack_damage_flag and params.attack_damage_flag == "lc_moment" then
		cleave_effect = "particles/bloodseeker/thirst_cleave.vpcf"
	end

	if cleave_effect then
		DoCleaveAttack(
			self.parent,
			target,
			self.ability,
			params.original_damage * self.ability.cleave,
			150,
			360,
			650,
			cleave_effect
		)
	end

	if self.ability.talents.has_e2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_moment_of_courage_custom_slow",
			{ duration = self.ability.talents.e2_duration }
		)
	end

	if self.parent:HasModifier("modifier_moment_of_courage_custom_legendary_defence") then
		self.parent:GenericHeal(
			self.ability.talents.e7_heal * self.parent:GetMaxHealth(),
			self.ability,
			true,
			"",
			"modifier_legion_moment_7"
		)
	end
end

function modifier_moment_of_courage_custom_tracker:LifestealQuest(params, heal, target, real_heal)
	if self.parent:GetQuest() ~= "Legion.Quest_7" then
		return
	end
	if self.parent:QuestCompleted() then
		return
	end
	if not params.unit:IsRealHero() then
		return
	end
	if real_heal <= 0 then
		return
	end
	self.parent:UpdateQuest(real_heal)
end

function modifier_moment_of_courage_custom_tracker:LifestealRecord(params, heal, target, real_heal)
	self.record = nil
	self:LifestealQuest(params, heal, target, real_heal)
end

function modifier_moment_of_courage_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_moment_of_courage_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.e1_range
end

function modifier_moment_of_courage_custom_tracker:GetCritDamage()
	return self.ability.talents.e3_crit
end

function modifier_moment_of_courage_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if not self.parent:HasModifier("modifier_moment_of_courage_custom_crit_attack") then
		return
	end
	self.parent:RemoveModifierByName("modifier_moment_of_courage_custom_crit_attack")
	self.record = params.record
	return self.ability.talents.e3_crit
end

modifier_moment_of_courage_custom_attack = class(mod_hidden)

modifier_moment_of_courage_custom_crit_cd = class(mod_cd)
function modifier_moment_of_courage_custom_crit_cd:GetTexture()
	return "buffs/legion_commander/moment_3"
end
function modifier_moment_of_courage_custom_crit_cd:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self:SetStackCount(self.ability.talents.e3_talent_cd)
	self:StartIntervalThink(1)
end

function modifier_moment_of_courage_custom_crit_cd:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:ReduceCd(1)
end

function modifier_moment_of_courage_custom_crit_cd:ReduceCd(amount)
	if not IsServer() then
		return
	end

	self:SetStackCount(self:GetStackCount() - amount)

	if self:GetStackCount() <= 0 then
		self.parent:EmitSound("Lc.Courage_crit")
		self.parent:GenericParticle("particles/legion_commander/crit_ready.vpcf")
		self:Destroy()
		return
	end
end

modifier_moment_of_courage_custom_crit_attack = class(mod_hidden)
function modifier_moment_of_courage_custom_crit_attack:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

modifier_moment_of_courage_custom_crit_anim = class(mod_hidden)
function modifier_moment_of_courage_custom_crit_anim:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_moment_of_courage_custom_crit_anim:GetActivityTranslationModifiers()
	return "duel_kill"
end

modifier_moment_of_courage_custom_legendary_attack = class(mod_hidden)
function modifier_moment_of_courage_custom_legendary_attack:RemoveOnDeath()
	return false
end
function modifier_moment_of_courage_custom_legendary_attack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.parent:GetBaseAttackTime(false)

	if not IsServer() then
		return
	end

	self.parent:GenericParticle("particles/legion_commander/lc_attack_buf.vpcf", self)
	self.parent:GenericParticle("particles/legion_commander/lc_attack.vpcf", self, true)
	self.parent:EmitSound("Lc.Moment_Attack")
end

function modifier_moment_of_courage_custom_legendary_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_moment_of_courage_custom_legendary_attack:GetModifierBaseAttackTimeConstant()
	if not self.bva then
		return
	end
	return self.bva + self.ability.talents.e7_bva
end

modifier_moment_of_courage_custom_legendary_defence = class(mod_hidden)
function modifier_moment_of_courage_custom_legendary_defence:RemoveOnDeath()
	return false
end
function modifier_moment_of_courage_custom_legendary_defence:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Lc.Moment_Defence")
	local hit_effect = ParticleManager:CreateParticle(
		"particles/legion_commander/moment_legendary_shield.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(hit_effect, false, false, -1, false, false)
end

function modifier_moment_of_courage_custom_legendary_defence:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_moment_of_courage_custom_legendary_defence:GetModifierIncomingDamage_Percentage()
	return self.ability.talents.e7_damage_reduce
end

function modifier_moment_of_courage_custom_legendary_defence:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.e7_damage_reduce
end

function modifier_moment_of_courage_custom_legendary_defence:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.e7_damage_reduce
end

modifier_moment_of_courage_custom_damage_reduce = class(mod_visible)
function modifier_moment_of_courage_custom_damage_reduce:IsPurgable()
	return true
end
function modifier_moment_of_courage_custom_damage_reduce:GetTexture()
	return "buffs/legion_commander/moment_2"
end
function modifier_moment_of_courage_custom_damage_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_moment_of_courage_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_moment_of_courage_custom_damage_reduce:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.e2_damage_reduce
end

function modifier_moment_of_courage_custom_damage_reduce:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.e2_damage_reduce
end

modifier_moment_of_courage_custom_slow = class(mod_hidden)
function modifier_moment_of_courage_custom_slow:IsPurgable()
	return true
end
function modifier_moment_of_courage_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
	self.parent:EmitSound("DOTA_Item.Maim")
end

function modifier_moment_of_courage_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_moment_of_courage_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.e2_slow
end

modifier_moment_of_courage_custom_speed = class(mod_visible)
function modifier_moment_of_courage_custom_speed:GetTexture()
	return "buffs/legion_commander/moment_1"
end
function modifier_moment_of_courage_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e1_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_moment_of_courage_custom_speed:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_moment_of_courage_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_moment_of_courage_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.e1_speed * self:GetStackCount()
end

modifier_moment_of_courage_custom_spell = class(mod_hidden)