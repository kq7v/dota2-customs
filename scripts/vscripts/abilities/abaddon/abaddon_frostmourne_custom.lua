--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_abaddon_frostmourne_custom",
	"abilities/abaddon/abaddon_frostmourne_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_frostmourne_custom_count",
	"abilities/abaddon/abaddon_frostmourne_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_frostmourne_custom_curse",
	"abilities/abaddon/abaddon_frostmourne_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_abaddon_frostmourne_custom_buff",
	"abilities/abaddon/abaddon_frostmourne_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_frostmourne_custom_legendary",
	"abilities/abaddon/abaddon_frostmourne_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_abaddon_curse_7" }
)
LinkLuaModifier(
	"modifier_abaddon_frostmourne_custom_legendary_stats",
	"abilities/abaddon/abaddon_frostmourne_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_curse_7"
)
LinkLuaModifier(
	"modifier_abaddon_frostmourne_custom_illusion",
	"abilities/abaddon/abaddon_frostmourne_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_frostmourne_custom_silence_cd",
	"abilities/abaddon/abaddon_frostmourne_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_abaddon_curse_3", "modifier_abaddon_curse_4" }
)

abaddon_frostmourne_custom = class({})
abaddon_frostmourne_custom.talents = {}

function abaddon_frostmourne_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/abaddon/curse_legendary.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/curse_proc.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/curse_cleave.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/curse_legendary_active_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_curse_counter_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_frost_slow.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_frost.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_curse_frostmourne_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_abaddon_frostmourne.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_silence.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_frost_buff.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/curse_legendary_active.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/curse_legendary_active_circle.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/curse_legendary_active_head.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/shield_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_dark_seer_illusion.vpcf", context)
end

function abaddon_frostmourne_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_speed = 0,
			e1_damage = 0,
			e1_max = caster:GetTalentValue("modifier_abaddon_curse_1", "max", true),

			has_e2 = 0,
			e2_range = 0,
			e2_cleave = 0,

			has_e3 = 0,
			e3_stats = 0,
			e3_damage = 0,
			e3_attacks = caster:GetTalentValue("modifier_abaddon_curse_3", "attacks", true),
			e3_talent_cd = caster:GetTalentValue("modifier_abaddon_curse_3", "talent_cd", true),

			has_e4 = 0,
			e4_attacks = caster:GetTalentValue("modifier_abaddon_curse_4", "attacks", true),
			e4_silence = caster:GetTalentValue("modifier_abaddon_curse_4", "silence", true),
			e4_talent_cd = caster:GetTalentValue("modifier_abaddon_curse_4", "talent_cd", true),
			e4_duration = caster:GetTalentValue("modifier_abaddon_curse_4", "duration", true),

			has_e7 = 0,
			e7_duration_creeps = caster:GetTalentValue("modifier_abaddon_curse_7", "duration_creeps", true),
			e7_duration = caster:GetTalentValue("modifier_abaddon_curse_7", "duration", true),
			e7_stack_duration = caster:GetTalentValue("modifier_abaddon_curse_7", "stack_duration", true),
			e7_bonus = caster:GetTalentValue("modifier_abaddon_curse_7", "bonus", true),
			e7_stats = caster:GetTalentValue("modifier_abaddon_curse_7", "stats", true),
			e7_talent_cd = caster:GetTalentValue("modifier_abaddon_curse_7", "talent_cd", true),

			h1_slow = 0,

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_abaddon_curse_1") then
		self.talents.has_e1 = 1
		self.talents.e1_speed = caster:GetTalentValue("modifier_abaddon_curse_1", "speed")
		self.talents.e1_damage = caster:GetTalentValue("modifier_abaddon_curse_1", "damage")
	end

	if caster:HasTalent("modifier_abaddon_curse_2") then
		self.talents.has_e2 = 1
		self.talents.e2_range = caster:GetTalentValue("modifier_abaddon_curse_2", "range")
		self.talents.e2_cleave = caster:GetTalentValue("modifier_abaddon_curse_2", "cleave") / 100
	end

	if caster:HasTalent("modifier_abaddon_curse_3") then
		self.talents.has_e3 = 1
		self.talents.e3_stats = caster:GetTalentValue("modifier_abaddon_curse_3", "stats") / 100
		self.talents.e3_damage = caster:GetTalentValue("modifier_abaddon_curse_3", "damage")
		if IsServer() then
			caster:AddPercentStat(
				{ agi = self.talents.e3_stats, str = self.talents.e3_stats, int = self.talents.e3_stats },
				self.tracker
			)
		end
	end

	if caster:HasTalent("modifier_abaddon_curse_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_abaddon_curse_7") then
		self.talents.has_e7 = 1
		if IsServer() and not self.e7_init then
			self.e7_init = true
			self.tracker:StartIntervalThink(0.2)
		end
	end

	if caster:HasTalent("modifier_abaddon_hero_1") then
		self.talents.h1_slow = caster:GetTalentValue("modifier_abaddon_hero_1", "slow")
	end

	if caster:HasTalent("modifier_abaddon_aphotic_7") then
		self.talents.has_w7 = 1
	end
end

function abaddon_frostmourne_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "abaddon_frostmourne", self)
end

function abaddon_frostmourne_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_abaddon_frostmourne_custom"
end

function abaddon_frostmourne_custom:GetCooldown(iLevel)
	if self.talents.has_e7 == 1 then
		return self.talents.e7_talent_cd
	end
	return 0
end

function abaddon_frostmourne_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function abaddon_frostmourne_custom:GetAbilityTargetFlags()
	if self.talents.has_e4 == 1 then
		return DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
	end
	return DOTA_UNIT_TARGET_FLAG_NONE
end

function abaddon_frostmourne_custom:OnSpellStart()
	self.caster:GenericParticle("particles/abaddon/curse_legendary.vpcf")
	self.caster:EmitSound("Abaddon.Curse_legendary1")
	self.caster:EmitSound("Abaddon.Curse_legendary2")
	self.caster:EmitSound("Abaddon.Curse_legendary3")

	self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_4)
	local stack = 0
	local mod = self.caster:FindModifierByName("modifier_abaddon_frostmourne_custom_legendary_stats")
	if mod then
		stack = mod:GetStackCount()
		mod:Destroy()
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_abaddon_frostmourne_custom_legendary",
		{ duration = self.talents.e7_duration, stack = stack }
	)
end

function abaddon_frostmourne_custom:ProcIllusion(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 == 0 then
		return
	end

	target:EmitSound("Hero_Abaddon.Curse.Proc")

	local duration = self.talents.e3_talent_cd
	local damage = self.talents.e3_damage - 100

	local illusions = CreateIllusions(
		self.caster,
		self.caster,
		{ duration = duration, outgoing_damage = damage, incoming_damage = 0 },
		1,
		0,
		false,
		true
	)
	for _, illusion in pairs(illusions) do
		for _, mod in pairs(self.caster:FindAllModifiers()) do
			if mod.StackOnIllusion == true then
				illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount(), mod)
			end
		end
		illusion.owner = self.caster
		FindClearSpaceForUnit(illusion, target:GetAbsOrigin() + RandomVector(200), false)
		illusion:AddNewModifier(
			self.caster,
			self,
			"modifier_abaddon_frostmourne_custom_illusion",
			{ target = target:entindex() }
		)
	end
end

modifier_abaddon_frostmourne_custom = class(mod_hidden)
function modifier_abaddon_frostmourne_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.avernus_ability = self.ability

	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
	self.ability.curse_slow = self.ability:GetSpecialValueFor("curse_slow")
	self.ability.curse_attack_speed = self.ability:GetSpecialValueFor("curse_attack_speed")
	self.ability.curse_dps = self.ability:GetSpecialValueFor("curse_dps")
	self.ability.curse_interval = self.ability:GetSpecialValueFor("curse_interval")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.parent:AddProc(self, { land = true, illusion = true })
end

function modifier_abaddon_frostmourne_custom:OnRefresh()
	self.ability.curse_slow = self.ability:GetSpecialValueFor("curse_slow")
	self.ability.curse_attack_speed = self.ability:GetSpecialValueFor("curse_attack_speed")
	self.ability.curse_dps = self.ability:GetSpecialValueFor("curse_dps")
end

function modifier_abaddon_frostmourne_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_abaddon_frostmourne_custom:GetModifierAttackRangeBonus()
	return self.ability.talents.e2_range
end

function modifier_abaddon_frostmourne_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end

	local stack = 0
	local max_timer = 1
	local timer = 0
	local phase = 0

	local mod = self.parent:FindModifierByName("modifier_abaddon_frostmourne_custom_legendary_stats")
	local active_mod = self.parent:FindModifierByName("modifier_abaddon_frostmourne_custom_legendary")

	if mod then
		timer = mod:GetRemainingTime()
		max_timer = mod.max_timer
		stack = mod:GetStackCount()
	end

	if active_mod then
		phase = 1
		timer = active_mod:GetRemainingTime()
		max_timer = self.ability.talents.e7_duration
		stack = active_mod:GetStackCount()
	end

	self.parent:UpdateUIlong({
		override_stack = stack,
		max = max_timer,
		stack = timer,
		style = "AbaddonCurse",
		no_min = true,
		active = phase,
	})
end

function modifier_abaddon_frostmourne_custom:GetProcChance()
	return 100
end

function modifier_abaddon_frostmourne_custom:AttackProc(params, name)
	local attacker = params.attacker
	local target = params.target

	if attacker:GetTeamNumber() ~= self.parent:GetTeamNumber() then
		return
	end

	if
		(self.parent == attacker or (attacker.owner and attacker:IsIllusion() and attacker.owner == self.parent))
		and not attacker:PassivesDisabled()
	then
		target:AddNewModifier(
			self.parent,
			self.parent:BkbAbility(self.ability, self.ability.talents.has_e4 == 1),
			"modifier_abaddon_frostmourne_custom_curse",
			{ attacker = attacker:entindex(), duration = self.ability.slow_duration }
		)
	end

	if self.parent ~= attacker then
		return
	end

	if self.ability.talents.has_e2 == 1 then
		DoCleaveAttack(
			self.parent,
			target,
			self.ability,
			self.ability.talents.e2_cleave * params.damage,
			150,
			360,
			650,
			"particles/abaddon/curse_cleave.vpcf"
		)
	end

	if
		(self.ability.talents.has_e4 == 1 or self.ability.talents.has_e3 == 1)
		and not self.parent:HasModifier("modifier_abaddon_frostmourne_custom_silence_cd")
	then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_abaddon_frostmourne_custom_count",
			{ duration = self.ability.talents.e4_duration }
		)
	end

	if self.parent:HasModifier("modifier_abaddon_frostmourne_custom_legendary") then
		local effect_cast = ParticleManager:CreateParticle(
			"particles/abaddon/curse_legendary_active_attack.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(effect_cast, 1, self.parent:GetOrigin() + Vector(0, 0, 64))
		ParticleManager:SetParticleControlForward(
			effect_cast,
			3,
			(target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		)
		ParticleManager:ReleaseParticleIndex(effect_cast)
		target:EmitSound("Abaddon.Curse_legendary_attack")
	elseif self.ability.talents.has_e7 == 1 then
		local duration = self.ability.talents.e7_stack_duration
		if target:IsCreep() then
			duration = self.ability.talents.e7_duration_creeps
		end
		local stack_duration = duration
		local mod = self.parent:FindModifierByName("modifier_abaddon_frostmourne_custom_legendary_stats")
		if mod then
			duration = math.max(duration, mod:GetRemainingTime())
		end
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_abaddon_frostmourne_custom_legendary_stats",
			{ duration = duration, stack_duration = stack_duration }
		)
	end
end

modifier_abaddon_frostmourne_custom_curse = class(mod_visible)
function modifier_abaddon_frostmourne_custom_curse:IsPurgable()
	return true
end
function modifier_abaddon_frostmourne_custom_curse:GetTexture()
	return "abaddon_frostmourne"
end
function modifier_abaddon_frostmourne_custom_curse:GetEffectName()
	return "particles/units/heroes/hero_abaddon/abaddon_curse_frostmourne_debuff.vpcf"
end
function modifier_abaddon_frostmourne_custom_curse:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_abaddon_frostmourne_custom_curse:GetStatusEffectName()
	return "particles/status_fx/status_effect_abaddon_frostmourne.vpcf"
end
function modifier_abaddon_frostmourne_custom_curse:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_abaddon_frostmourne_custom_curse:OnCreated(params)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self.caster.avernus_ability

	self.slow = self.ability.curse_slow + self.ability.talents.h1_slow
	self.interval = self.ability.curse_interval
	self.damage = self.ability.curse_dps
	self.buff_duration = self.ability.slow_duration
	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	if not IsServer() then
		return
	end
	local attacker = EntIndexToHScript(params.attacker)
	attacker:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_abaddon_frostmourne_custom_buff",
		{ duration = self.buff_duration, stack = self:GetStackCount() }
	)
	self.parent:AddAttackEvent_inc(self, true)

	self.parent:EmitSound("Hero_Abaddon.Curse.Proc")
	self:StartIntervalThink(self.interval - FrameTime())
end

function modifier_abaddon_frostmourne_custom_curse:AttackEvent_inc(params)
	if not IsServer() then
		return
	end
	if params.target ~= self.parent then
		return
	end
	if params.attacker:GetTeamNumber() ~= self.caster:GetTeamNumber() then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end

	if
		params.attacker == self.caster
		and self.ability.talents.has_e1 == 1
		and self:GetStackCount() < self.ability.talents.e1_max
	then
		self:IncrementStackCount()
	end

	params.attacker:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_abaddon_frostmourne_custom_buff",
		{ duration = self.buff_duration, stack = self:GetStackCount() }
	)
end

function modifier_abaddon_frostmourne_custom_curse:OnIntervalThink()
	if not IsServer() then
		return
	end

	local damage = self.damage
	if self:GetStackCount() > 0 and self.ability.talents.has_e1 == 1 then
		damage = self.ability.talents.e1_damage * self:GetStackCount() + damage
	end
	damage = damage * self.interval

	if
		self.caster:GetQuest() == "Abaddon.Quest_7"
		and not self.caster:QuestCompleted()
		and self.parent:IsRealHero()
	then
		self.caster:UpdateQuest(self.interval)
	end

	self.damageTable.damage = damage
	DoDamage(self.damageTable)
end

function modifier_abaddon_frostmourne_custom_curse:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_abaddon_frostmourne_custom_curse:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_abaddon_frostmourne_custom_buff = class(mod_visible)
function modifier_abaddon_frostmourne_custom_buff:GetEffectName()
	return "particles/units/heroes/hero_abaddon/abaddon_frost_buff.vpcf"
end
function modifier_abaddon_frostmourne_custom_buff:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_abaddon_frostmourne_custom_buff:OnCreated(table)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.curse_attack_speed
	if not IsServer() then
		return
	end
	self:SetStackCount(table.stack)
end

function modifier_abaddon_frostmourne_custom_buff:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(table.stack)
end

function modifier_abaddon_frostmourne_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_abaddon_frostmourne_custom_buff:GetModifierAttackSpeedBonus_Constant()
	return self.speed + self:GetStackCount() * self.ability.talents.e1_speed
end

modifier_abaddon_frostmourne_custom_count = class(mod_hidden)
function modifier_abaddon_frostmourne_custom_count:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_abaddon_frostmourne_custom_count:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self.ability.talents.has_w7 == 0 then
		if not self.particle then
			self.particle = self.parent:GenericParticle("particles/abaddon/shield_legendary_stack.vpcf", self, true)
		end

		local number_1 = self:GetStackCount()
		local double = math.floor(number_1 / 10)
		local number_2 = number_1 - double * 10

		ParticleManager:SetParticleControl(self.particle, 1, Vector(double, number_1, number_2))
	end

	local attacks = self.ability.talents.has_e4 == 1 and self.ability.talents.e4_attacks
		or self.ability.talents.e3_attacks
	if self:GetStackCount() < attacks then
		return
	end

	if self.ability.talents.has_e3 == 1 then
		self.ability:ProcIllusion(self.parent)
	end

	if self.ability.talents.has_e4 == 1 then
		self.parent:EmitSound("Abaddon.Curse_silence")
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_generic_silence",
			{ duration = self.ability.talents.e4_silence * (1 - self.parent:GetStatusResistance()) }
		)
	end

	local cd = self.ability.talents.has_e4 == 1 and self.ability.talents.e4_talent_cd
		or self.ability.talents.e3_talent_cd
	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_abaddon_frostmourne_custom_silence_cd",
		{ duration = cd }
	)
	self:Destroy()
end

modifier_abaddon_frostmourne_custom_legendary = class(mod_hidden)
function modifier_abaddon_frostmourne_custom_legendary:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.RemoveForDuel = true

	self.stats = self.ability.talents.e7_stats
	if not IsServer() then
		return
	end
	self.ability:EndCd()
	self:SetStackCount(table.stack * self.ability.talents.e7_bonus)

	self.pfx = ParticleManager:CreateParticle(
		"particles/abaddon/curse_legendary_active.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.pfx,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.pfx,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.pfx,
		4,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.pfx, false, false, -1, false, false)

	self.pfx2 = ParticleManager:CreateParticle(
		"particles/abaddon/curse_legendary_active_circle.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.pfx2, 3, self.parent:GetOrigin())
	self:AddParticle(self.pfx2, false, false, -1, false, false)
	self.parent:CalculateStatBonus(true)
end

function modifier_abaddon_frostmourne_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:CalculateStatBonus(true)
end

function modifier_abaddon_frostmourne_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_abaddon_frostmourne_custom_legendary:GetModifierModelScale()
	return 25
end

function modifier_abaddon_frostmourne_custom_legendary:GetModifierBonusStats_Agility()
	return self.stats * self:GetStackCount()
end

function modifier_abaddon_frostmourne_custom_legendary:GetModifierBonusStats_Strength()
	return self.stats * self:GetStackCount()
end

function modifier_abaddon_frostmourne_custom_legendary:GetModifierBonusStats_Intellect()
	return self.stats * self:GetStackCount()
end

modifier_abaddon_frostmourne_custom_legendary_stats = class(mod_hidden)
function modifier_abaddon_frostmourne_custom_legendary_stats:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.stats = self.ability.talents.e7_stats
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh(table)
end

function modifier_abaddon_frostmourne_custom_legendary_stats:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.max_timer = self:GetRemainingTime()

	Timers:CreateTimer(table.stack_duration, function()
		if self and not self:IsNull() then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_abaddon_frostmourne_custom_legendary_stats:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_abaddon_frostmourne_custom_legendary_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_abaddon_frostmourne_custom_legendary_stats:GetModifierBonusStats_Agility()
	return self.stats * self:GetStackCount()
end

function modifier_abaddon_frostmourne_custom_legendary_stats:GetModifierBonusStats_Strength()
	return self.stats * self:GetStackCount()
end

function modifier_abaddon_frostmourne_custom_legendary_stats:GetModifierBonusStats_Intellect()
	return self.stats * self:GetStackCount()
end

modifier_abaddon_frostmourne_custom_illusion = class(mod_hidden)
function modifier_abaddon_frostmourne_custom_illusion:GetStatusEffectName()
	return "particles/status_fx/status_effect_dark_seer_illusion.vpcf"
end
function modifier_abaddon_frostmourne_custom_illusion:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_abaddon_frostmourne_custom_illusion:GetEffectName()
	return "particles/units/heroes/hero_abaddon/abaddon_curse_frostmourne_debuff.vpcf"
end
function modifier_abaddon_frostmourne_custom_illusion:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_abaddon_frostmourne_custom_illusion:OnCreated(params)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.stats = self.ability.talents.e7_stats

	if not IsServer() then
		return
	end
	self.parent:AddPercentStat(
		{ agi = self.ability.talents.e3_stats, str = self.ability.talents.e3_stats, int = self.ability.talents.e3_stats },
		self
	)

	self.target = EntIndexToHScript(params.target)
	self:OnIntervalThink()
	self:StartIntervalThink(0.2)
end

function modifier_abaddon_frostmourne_custom_illusion:OnIntervalThink()
	if not IsServer() then
		return
	end
	local mod = self.caster:FindModifierByName("modifier_abaddon_frostmourne_custom_legendary_stats")
	local active_mod = self.caster:FindModifierByName("modifier_abaddon_frostmourne_custom_legendary")

	local stack = 0
	if mod then
		stack = mod:GetStackCount()
	end

	if active_mod then
		stack = active_mod:GetStackCount()
		if not self.pfx2 then
			self.effect = ParticleManager:CreateParticle(
				"particles/abaddon/curse_legendary_active_head.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				self.effect,
				4,
				self.parent,
				PATTACH_OVERHEAD_FOLLOW,
				nil,
				self.parent:GetAbsOrigin(),
				true
			)
			self:AddParticle(self.effect, false, false, -1, false, false)

			self.pfx2 = ParticleManager:CreateParticle(
				"particles/abaddon/curse_legendary_active_circle.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControl(self.pfx2, 3, self.parent:GetOrigin())
			self:AddParticle(self.pfx2, false, false, -1, false, false)
		end
	end

	if not active_mod and self.pfx2 then
		ParticleManager:DestroyParticle(self.effect, false)
		ParticleManager:ReleaseParticleIndex(self.effect)

		ParticleManager:DestroyParticle(self.pfx2, false)
		ParticleManager:ReleaseParticleIndex(self.pfx2)
		self.pfx2 = nil
	end

	if IsValid(self.target) and self.target:IsAlive() then
		if self.parent:GetForceAttackTarget() == nil then
			self.parent:SetForceAttackTarget(self.target)
		end
	else
		if self.parent:GetForceAttackTarget() then
			self.parent:SetForceAttackTarget(nil)
			self.parent:MoveToPositionAggressive(self.parent:GetAbsOrigin())
		end
	end

	if stack == self:GetStackCount() then
		return
	end
	self:SetStackCount(stack)
end

function modifier_abaddon_frostmourne_custom_illusion:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:Kill(nil, nil)
end

function modifier_abaddon_frostmourne_custom_illusion:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end

function modifier_abaddon_frostmourne_custom_illusion:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_abaddon_frostmourne_custom_illusion:GetModifierAttackRangeBonus()
	return self.ability.talents.e2_range
end

function modifier_abaddon_frostmourne_custom_illusion:GetModifierMoveSpeed_Absolute()
	return 550
end

function modifier_abaddon_frostmourne_custom_illusion:GetModifierModelScale()
	return 20
end

function modifier_abaddon_frostmourne_custom_illusion:GetModifierBonusStats_Agility()
	return self.stats * self:GetStackCount()
end

function modifier_abaddon_frostmourne_custom_illusion:GetModifierBonusStats_Strength()
	return self.stats * self:GetStackCount()
end

function modifier_abaddon_frostmourne_custom_illusion:GetModifierBonusStats_Intellect()
	return self.stats * self:GetStackCount()
end

modifier_abaddon_frostmourne_custom_silence_cd = class(mod_cd)
function modifier_abaddon_frostmourne_custom_silence_cd:GetTexture()
	return "buffs/abaddon/curse_4"
end