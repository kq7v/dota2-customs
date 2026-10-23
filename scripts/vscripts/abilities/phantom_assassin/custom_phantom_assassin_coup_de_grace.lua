--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_focus",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_bleed",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_reduce",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_hero_3"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_legendary",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_crit_7"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_legendary_clone",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_crit_7"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_rage",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_crit_1"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_armor",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_crit_3"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_coup_de_grace_haste",
	"abilities/phantom_assassin/custom_phantom_assassin_coup_de_grace",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_crit_3"
)

custom_phantom_assassin_coup_de_grace = class({})
custom_phantom_assassin_coup_de_grace.talents = {}
custom_phantom_assassin_coup_de_grace.current_target = nil

function custom_phantom_assassin_coup_de_grace:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/sven/sven_ti7_sword/sven_ti7_sword_spell_great_cleave_gods_strength.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact.vpcf",
		context
	)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_hands.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_mark_overhead.vpcf",
		context
	)
	PrecacheResource("particle", "particles/phantom_assassin/magic_crit_mark.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/crit_legendary_timer.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/crit_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blink_illusion_blur.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/pa_cry.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_active_blur.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_active_start.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_phantom_strike_start.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_phantom_strike_end.vpcf",
		context
	)
	PrecacheResource("particle", "particles/phantom_assassin/blink_effect.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blink_effect_red.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/crit_bleed_proc.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sven/sven_spell_great_cleave.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/bush_damage.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/crit_shield_effect.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_legendary.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_hit_blood.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/phantom_assassin/pa_crimson_witness_2021/pa_crimson_witness_blur_start.vpcf",
		context
	)
end

function custom_phantom_assassin_coup_de_grace:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,
			has_w7 = 0,

			has_h3 = 0,
			h3_heal_reduce = 0,
			h3_slow = 0,
			h3_duration = caster:GetTalentValue("modifier_phantom_assassin_hero_3", "duration", true),

			has_h6 = 0,
			h6_cd = caster:GetTalentValue("modifier_phantom_assassin_hero_6", "cd", true),

			has_r1 = 0,
			r1_cleave = 0,
			r1_damage = 0,
			r1_max = caster:GetTalentValue("modifier_phantom_assassin_crit_1", "max", true),
			r1_duration_hero = caster:GetTalentValue("modifier_phantom_assassin_crit_1", "duration_hero", true),
			r1_duration_creeps = caster:GetTalentValue("modifier_phantom_assassin_crit_1", "duration_creeps", true),
			r1_cleave_start = caster:GetTalentValue("modifier_phantom_assassin_crit_1", "cleave_start", true),
			r1_cleave_end = caster:GetTalentValue("modifier_phantom_assassin_crit_1", "cleave_end", true),
			r1_cleave_distance = caster:GetTalentValue("modifier_phantom_assassin_crit_1", "cleave_distance", true),

			r2_range = 0,
			r2_lifesteal = 0,
			r2_multiplier = caster:GetTalentValue("modifier_phantom_assassin_crit_2", "multiplier", true),

			has_r3 = 0,
			r3_armor = 0,
			r3_attack = 0,
			r3_max = caster:GetTalentValue("modifier_phantom_assassin_crit_3", "max", true),
			r3_procs = caster:GetTalentValue("modifier_phantom_assassin_crit_3", "procs", true),
			r3_armor_duration = caster:GetTalentValue("modifier_phantom_assassin_crit_3", "armor_duration", true),
			r3_duration = caster:GetTalentValue("modifier_phantom_assassin_crit_3", "duration", true),

			has_r4 = 0,
			r4_chance = caster:GetTalentValue("modifier_phantom_assassin_crit_4", "chance", true),
			r4_shield = caster:GetTalentValue("modifier_phantom_assassin_crit_4", "shield", true),
			r4_health = caster:GetTalentValue("modifier_phantom_assassin_crit_4", "health", true) / 100,
			r4_move = caster:GetTalentValue("modifier_phantom_assassin_crit_4", "move", true),
			r4_max = caster:GetTalentValue("modifier_phantom_assassin_crit_4", "max", true),
			r4_duration = caster:GetTalentValue("modifier_phantom_assassin_crit_4", "duration", true),

			has_r7 = 0,
			r7_chance = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "chance", true),
			r7_crit = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "crit", true),
			r7_crit_reduce = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "crit_reduce", true) / 100,
		}
	end

	if caster:HasTalent("modifier_phantom_assassin_dagger_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_phantom_assassin_blink_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_phantom_assassin_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_heal_reduce = caster:GetTalentValue("modifier_phantom_assassin_hero_3", "heal_reduce")
		self.talents.h3_slow = caster:GetTalentValue("modifier_phantom_assassin_hero_3", "slow")
	end

	if caster:HasTalent("modifier_phantom_assassin_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_phantom_assassin_crit_1") then
		self.talents.has_r1 = 1
		self.talents.r1_cleave = caster:GetTalentValue("modifier_phantom_assassin_crit_1", "cleave") / 100
		self.talents.r1_damage = caster:GetTalentValue("modifier_phantom_assassin_crit_1", "damage")
	end

	if caster:HasTalent("modifier_phantom_assassin_crit_2") then
		self.talents.r2_range = caster:GetTalentValue("modifier_phantom_assassin_crit_2", "range")
		self.talents.r2_lifesteal = caster:GetTalentValue("modifier_phantom_assassin_crit_2", "lifesteal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_phantom_assassin_crit_2",
			type = 2,
			value = function(params)
				if params.record and self.tracker.records[params.record] then
					return self.talents.r2_lifesteal * self.talents.r2_multiplier, nil, true
				end
				return self.talents.r2_lifesteal
			end,
		})
	end

	if caster:HasTalent("modifier_phantom_assassin_crit_3") then
		self.talents.has_r3 = 1
		self.talents.r3_armor = caster:GetTalentValue("modifier_phantom_assassin_crit_3", "armor")
		self.talents.r3_attack = caster:GetTalentValue("modifier_phantom_assassin_crit_3", "attack")
	end

	if caster:HasTalent("modifier_phantom_assassin_crit_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_phantom_assassin_crit_7") then
		self.talents.has_r7 = 1
		self:UpdateUI()
	end
end

function custom_phantom_assassin_coup_de_grace:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(
		self.caster,
		self:IsMagic() and "grace_magic" or "phantom_assassin_coup_de_grace",
		self
	)
end

function custom_phantom_assassin_coup_de_grace:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_phantom_assassin_phantom_coup_de_grace"
end

function custom_phantom_assassin_coup_de_grace:GetCooldown(iLevel)
	if self.talents.has_h6 == 1 then
		return self.talents.h6_cd
	end
	return self.BaseClass.GetCooldown(self, iLevel)
end

function custom_phantom_assassin_coup_de_grace:IsMagic()
	return self.talents.has_q7 == 1 or self.talents.has_w7 == 1
end

function custom_phantom_assassin_coup_de_grace:OnSpellStart()
	if not self.caster.hunt_ability then
		return
	end

	self.caster.hunt_ability:StartHunt()
end

function custom_phantom_assassin_coup_de_grace:UpdateUI()
	if not IsServer() then
		return
	end
	if self.talents.has_r7 ~= 1 then
		return
	end

	local stack = 0

	if IsValid(self.current_target) then
		local mark =
			self.current_target:FindModifierByName("modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit")

		if mark then
			stack = mark:GetStackCount()
		end
	end

	self.caster:UpdateUIlong({ stack = stack, override_stack = stack, style = "PhantomCrit" })
end

function custom_phantom_assassin_coup_de_grace:GetCritBonus()
	local reduce = self.talents.has_r7 == 1 and self.talents.r7_crit_reduce or 0
	return (self.crit_bonus + (self.caster.hunt_ability and self.caster.hunt_ability:GetContractDamage() or 0))
		* (1 + reduce)
end

function custom_phantom_assassin_coup_de_grace:GetBleedDamage()
	return self.damage_magic
		+ (self.caster.hunt_ability and self.caster.hunt_ability:GetContractDamage(true) or 0) / 100
end

function custom_phantom_assassin_coup_de_grace:GetFocusDamage(target)
	local crit = self:GetCritBonus()
	local damage = crit
	local stacks = 0

	if self.talents.has_r7 == 1 and target then
		local mark = target:FindModifierByName("modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit")

		if mark then
			stacks = mark:GetStackCount()
			damage = crit * (1 + stacks * self.talents.r7_crit / 100)
		end
	end

	return damage
end

function custom_phantom_assassin_coup_de_grace:GetFocusChance(attacker, chance)
	chance = (chance or self.crit_chance) + (self.talents.has_r4 == 1 and self.talents.r4_chance or 0)
	local index = 1223

	if self.caster == attacker and self.talents.has_r7 == 1 then
		local legendary = self.caster:FindModifierByName("modifier_phantom_assassin_phantom_coup_de_grace_legendary")

		if legendary then
			chance = legendary:GetStackCount() > 0 and chance * self.talents.r7_chance or 0
			index = 1225
		end
	end

	return chance, index
end

function custom_phantom_assassin_coup_de_grace:RollFocus(attacker, chance)
	if not IsServer() then
		return
	end
	if attacker:PassivesDisabled() then
		return
	end
	if attacker:HasModifier("modifier_phantom_assassin_phantom_coup_de_grace_focus") then
		return
	end

	local focus_chance, index = self:GetFocusChance(attacker, chance)
	if focus_chance <= 0 then
		return
	end

	local roll = RollPseudoRandomPercentage(focus_chance, index, attacker)

	if not roll then
		return
	end

	attacker:AddNewModifier(
		attacker,
		self,
		"modifier_phantom_assassin_phantom_coup_de_grace_focus",
		{ duration = self.focus_duration }
	)
end

function custom_phantom_assassin_coup_de_grace:TakeFocus(unit)
	if not IsServer() then
		return
	end

	local mod = (unit or self.caster):FindModifierByName("modifier_phantom_assassin_phantom_coup_de_grace_focus")
	if not mod then
		return
	end

	mod:Destroy()
	return 1
end

function custom_phantom_assassin_coup_de_grace:UseFocus(attacker, is_ability, target)
	if not IsServer() then
		return
	end

	local crit = self:IsMagic() and self:TakeFocus(attacker)

	if crit then
		self:ProcSelf(attacker, target)
	else
		self:RollFocus(attacker, is_ability and self.ability_crit_chance)
	end

	return crit
end

function custom_phantom_assassin_coup_de_grace:ProcFocus(attacker, target)
	if not IsServer() then
		return
	end

	local crit_effect = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact.vpcf",
		self
	)
	local vec = (target:GetAbsOrigin() - attacker:GetAbsOrigin()):Normalized()

	local coup_pfx = ParticleManager:CreateParticle(crit_effect, PATTACH_ABSORIGIN_FOLLOW, target)
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

	target:EmitSound(wearables_system:GetSoundReplacement(self.caster, "Hero_PhantomAssassin.CoupDeGrace", self))

	if self.talents.has_r3 == 1 then
		attacker:AddNewModifier(
			self.caster,
			self,
			"modifier_phantom_assassin_phantom_coup_de_grace_haste",
			{ duration = self.talents.r3_duration }
		)
	end

	if self.talents.has_h3 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_phantom_assassin_phantom_coup_de_grace_reduce",
			{ duration = self.talents.h3_duration * (1 - target:GetStatusResistance()) }
		)
	end

	if self.caster ~= attacker then
		return
	end

	if self.caster.blur_ability then
		self.caster.blur_ability:ProcSplash(target, "focus")
	end

	if self.talents.has_r3 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_phantom_assassin_phantom_coup_de_grace_armor",
			{ stacks = self.talents.r3_procs, duration = self.talents.r3_armor_duration }
		)
	end

	local legendary = self.talents.has_r7 == 1
		and self.caster:FindModifierByName("modifier_phantom_assassin_phantom_coup_de_grace_legendary")

	if legendary then
		if legendary:GetStackCount() > 0 then
			legendary:DecrementStackCount()
			legendary:UpdateUI()
		end

		legendary.targets[target] = (legendary.targets[target] or 0) + 1
		self.caster:LogProc("modifier_phantom_assassin_crit_7", self:GetFocusDamage(target), target)
	end
end

function custom_phantom_assassin_coup_de_grace:ProcSelf(attacker, target)
	if not IsServer() then
		return
	end
	if self.caster ~= attacker then
		return
	end

	if self.talents.has_r1 == 1 then
		local duration = target and target:IsRealHero() and self.talents.r1_duration_hero
			or self.talents.r1_duration_creeps
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_phantom_assassin_phantom_coup_de_grace_rage",
			{ duration = duration }
		)
	end

	if self.talents.has_r4 == 1 then
		local shield = self.talents.r4_shield + self.caster:GetMaxHealth() * self.talents.r4_health

		if IsValid(self.shield_mod) then
			self.shield_mod:SetDuration(self.talents.r4_duration, true)
			self.shield_mod:AddShield(shield, shield * self.talents.r4_max)
		else
			self.shield_mod = self.caster:AddNewModifier(self.caster, self, "modifier_generic_shield", {
				duration = self.talents.r4_duration,
				max_shield = shield * self.talents.r4_max,
				shield_talent = "modifier_phantom_assassin_crit_4",
				move_speed = self.talents.r4_move,
			})

			if self.shield_mod then
				self.shield_mod:AddShield(shield)

				self.parent:GenericParticle(
					"particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf",
					self.shield_mod
				)

				local shield_pfx = ParticleManager:CreateParticle(
					"particles/phantom_assassin/crit_shield_effect.vpcf",
					PATTACH_CUSTOMORIGIN_FOLLOW,
					self.caster
				)
				ParticleManager:SetParticleControlEnt(
					shield_pfx,
					0,
					self.caster,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.caster:GetAbsOrigin(),
					true
				)
				self.shield_mod:AddParticle(shield_pfx, false, false, -1, false, false)
			end
		end
	end
end

function custom_phantom_assassin_coup_de_grace:ApplyBleed(attacker, target, damage)
	if not IsServer() then
		return
	end
	if not self:IsMagic() then
		return
	end

	self:ProcFocus(attacker, target)

	local coup_pfx = ParticleManager:CreateParticle(
		"particles/generic_gameplay/generic_hit_blood.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
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
	ParticleManager:SetParticleControl(coup_pfx, 1, Vector(3, 0, 0))
	ParticleManager:ReleaseParticleIndex(coup_pfx)

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_phantom_assassin_phantom_coup_de_grace_bleed",
		{ damage = damage * self:GetBleedDamage() }
	)
end

modifier_phantom_assassin_phantom_coup_de_grace = class(mod_hidden)
function modifier_phantom_assassin_phantom_coup_de_grace:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.records = {}
	self.ability:UpdateTalents()

	self.legendary_ability = self.parent:FindAbilityByName("custom_phantom_assassin_coup_de_grace_legendary")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end

	self.ability.crit_chance = self.ability:GetSpecialValueFor("crit_chance")
	self.ability.ability_crit_chance = self.ability:GetSpecialValueFor("ability_crit_chance")
	self.ability.focus_duration = self.ability:GetSpecialValueFor("focus_duration")
	self.ability.crit_bonus = self.ability:GetSpecialValueFor("crit_bonus")
	self.ability.bleed_duration = self.ability:GetSpecialValueFor("bleed_duration")
	self.ability.bleed_interval = self.ability:GetSpecialValueFor("bleed_interval")
	self.ability.damage_magic = self.ability:GetSpecialValueFor("damage_magic") / 100

	self.parent.crit_ability = self.ability

	if self.parent:IsRealHero() then
		self.parent:AddProc(self, { illusion = true, land = true })
		self.parent:AddRecordDestroyEvent(self, true)
	end
end

function modifier_phantom_assassin_phantom_coup_de_grace:OnRefresh()
	self.ability.crit_bonus = self.ability:GetSpecialValueFor("crit_bonus")
	self.ability.damage_magic = self.ability:GetSpecialValueFor("damage_magic") / 100
end

function modifier_phantom_assassin_phantom_coup_de_grace:GetCritChance()
	if not self.parent:IsRealHero() then
		return 0
	end
	if self.parent:PassivesDisabled() then
		return 0
	end
	return self.ability:GetFocusChance(self.parent)
end

function modifier_phantom_assassin_phantom_coup_de_grace:GetCritDamage()
	return self.ability:GetCritBonus()
end

function modifier_phantom_assassin_phantom_coup_de_grace:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_phantom_assassin_phantom_coup_de_grace:GetModifierAttackRangeBonus()
	return self.ability.talents.r2_range or 0
end

function modifier_phantom_assassin_phantom_coup_de_grace:RecordDestroyEvent(params)
	self.records[params.record] = nil
end

function modifier_phantom_assassin_phantom_coup_de_grace:GetProcChance()
	return 100
end

function modifier_phantom_assassin_phantom_coup_de_grace:AttackProc(params, name)
	local attacker = params.attacker
	local real_attacker = attacker

	if real_attacker.owner and real_attacker:IsIllusion() then
		real_attacker = attacker.owner
	end

	if self.parent ~= real_attacker then
		return
	end

	if self.ability.talents.has_r1 == 1 then
		DoCleaveAttack(
			attacker,
			params.target,
			self.ability,
			params.damage * self.ability.talents.r1_cleave,
			self.ability.talents.r1_cleave_start,
			self.ability.talents.r1_cleave_end,
			self.ability.talents.r1_cleave_distance,
			"particles/units/heroes/hero_sven/sven_spell_great_cleave.vpcf"
		)
	end

	local focus = attacker:FindModifierByName("modifier_phantom_assassin_phantom_coup_de_grace_focus")

	if focus and focus.records[params.record] then
		self.ability:TakeFocus(attacker)
		self.ability:ProcFocus(attacker, params.target)
		self.ability:ProcSelf(attacker, params.target)
		return
	end

	if self.ability.talents.has_r3 == 1 and self.parent == attacker then
		params.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_coup_de_grace_armor",
			{ duration = self.ability.talents.r3_armor_duration }
		)
	end

	if params.no_attack_cooldown and params.attack_flag ~= "pa_e3" then
		return
	end

	self.ability:RollFocus(attacker)
end

modifier_phantom_assassin_phantom_coup_de_grace_focus = class(mod_visible)
function modifier_phantom_assassin_phantom_coup_de_grace_focus:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	local particle = "particles/units/heroes/hero_phantom_assassin/phantom_assassin_mark_overhead.vpcf"

	if self.ability:IsMagic() then
		particle = "particles/phantom_assassin/magic_crit_mark.vpcf"
	end

	self.records = {}

	self.parent:CheckOwner():AddAttackStartEvent_out(self, false)
	self.parent:AddAttackFailEvent_out(self, true)

	self.parent:GenericParticle(particle, self, true)
	self:StartIntervalThink(0.2)
end

function modifier_phantom_assassin_phantom_coup_de_grace_focus:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end

	if
		not self.ability
		or not self.ability:GetIntrinsicModifierName()
		or not self.parent:HasModifier(self.ability:GetIntrinsicModifierName())
	then
		self:Destroy()
	end
end

function modifier_phantom_assassin_phantom_coup_de_grace_focus:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if self.used_record then
		return
	end
	if self.proced ~= params.record then
		return
	end

	self.used_record = params.record
	self.records[params.record] = true

	if self.parent == self.ability.caster then
		self.ability.tracker.records[params.record] = true
	end
end

function modifier_phantom_assassin_phantom_coup_de_grace_focus:AttackFailEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if self.used_record ~= params.record then
		return
	end

	self.records[params.record] = nil
	self.used_record = nil
	self.proced = nil
end

function modifier_phantom_assassin_phantom_coup_de_grace_focus:GetCritDamage()
	return self.ability:GetFocusDamage()
end

function modifier_phantom_assassin_phantom_coup_de_grace_focus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_phantom_assassin_phantom_coup_de_grace_focus:GetModifierAttackRangeBonus()
	return self.ability.talents.r2_range or 0
end

function modifier_phantom_assassin_phantom_coup_de_grace_focus:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability:IsMagic() then
		return
	end
	if self.used_record then
		return
	end
	if self.parent.pa_q then
		return
	end
	if self.parent.pa_e3 then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	self.proced = params.record
	return self.ability:GetFocusDamage(params.target)
end

modifier_phantom_assassin_phantom_coup_de_grace_armor = class(mod_visible)
function modifier_phantom_assassin_phantom_coup_de_grace_armor:GetTexture()
	return "buffs/phantom_assassin/grace_3"
end
function modifier_phantom_assassin_phantom_coup_de_grace_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self:OnRefresh(table)
end

function modifier_phantom_assassin_phantom_coup_de_grace_armor:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.ability.talents.r3_max then
		return
	end

	self:SetStackCount(math.min(self:GetStackCount() + (table.stacks or 1), self.ability.talents.r3_max))

	if self:GetStackCount() < self.ability.talents.r3_max then
		return
	end

	self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
	self.parent:EmitSound("Pa.Strike_resist")
end

function modifier_phantom_assassin_phantom_coup_de_grace_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_phantom_assassin_phantom_coup_de_grace_armor:GetModifierPhysicalArmorBonus()
	return (self.ability.talents.r3_armor / self.ability.talents.r3_max) * self:GetStackCount()
end

modifier_phantom_assassin_phantom_coup_de_grace_haste = class(mod_hidden)
function modifier_phantom_assassin_phantom_coup_de_grace_haste:OnCreated()
	self.ability = self:GetAbility()
end

function modifier_phantom_assassin_phantom_coup_de_grace_haste:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_phantom_assassin_phantom_coup_de_grace_haste:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.r3_attack
end

modifier_phantom_assassin_phantom_coup_de_grace_rage = class(mod_visible)
function modifier_phantom_assassin_phantom_coup_de_grace_rage:GetTexture()
	return "buffs/phantom_assassin/grace_1"
end
function modifier_phantom_assassin_phantom_coup_de_grace_rage:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_phantom_assassin_phantom_coup_de_grace_rage:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.ability.talents.r1_max then
		return
	end

	self:IncrementStackCount()
end

function modifier_phantom_assassin_phantom_coup_de_grace_rage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_phantom_assassin_phantom_coup_de_grace_rage:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.r1_damage * self:GetStackCount()
end

modifier_phantom_assassin_phantom_coup_de_grace_reduce = class(mod_hidden)
function modifier_phantom_assassin_phantom_coup_de_grace_reduce:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
end

function modifier_phantom_assassin_phantom_coup_de_grace_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_phantom_assassin_phantom_coup_de_grace_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.h3_heal_reduce
end

function modifier_phantom_assassin_phantom_coup_de_grace_reduce:GetModifierHealChange()
	return self.ability.talents.h3_heal_reduce
end

function modifier_phantom_assassin_phantom_coup_de_grace_reduce:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.h3_slow
end

modifier_phantom_assassin_phantom_coup_de_grace_bleed = class(mod_visible)
function modifier_phantom_assassin_phantom_coup_de_grace_bleed:GetTexture()
	return "phantom_assassin_coup_de_grace"
end
function modifier_phantom_assassin_phantom_coup_de_grace_bleed:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.ticks = math.floor(self.ability.bleed_duration / self.ability.bleed_interval)
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)

	self.RemoveForDuel = true
	self:AddStack(table.damage)
	self:SetStackCount(math.floor(self.total_damage))
	self:StartIntervalThink(self.ability.bleed_interval)
end

function modifier_phantom_assassin_phantom_coup_de_grace_bleed:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack(table.damage)
end

function modifier_phantom_assassin_phantom_coup_de_grace_bleed:AddStack(damage)
	if not IsServer() then
		return
	end
	self.parent:SendNumber(112, damage)

	self.total_damage = self.total_damage + damage
	self.tick = self.total_damage / self.ticks
	self.count = self.ticks
	self.damageTable.damage = self.tick
end

function modifier_phantom_assassin_phantom_coup_de_grace_bleed:OnIntervalThink()
	if not IsServer() then
		return
	end

	DoDamage(self.damageTable)

	local effect = ParticleManager:CreateParticle(
		"particles/phantom_assassin/crit_bleed_proc.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1

	if self.count <= 0 then
		self:Destroy()
		return
	end

	self:SetStackCount(math.floor(self.total_damage))
end

modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit = class(mod_visible)
function modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit:GetTexture()
	return "phantom_assassin_coup_de_grace"
end
function modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.effect_cast = self.parent:GenericParticle("particles/phantom_assassin/crit_legendary_stack.vpcf", self, true)
	self:OnRefresh(table)
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(self:GetStackCount() + table.stacks)

	self.ability.current_target = self.parent
	self.ability:UpdateUI()

	local number = self:GetStackCount()
	local double = math.floor(number / 10)

	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(double, number, number - double * 10))
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit:OnDestroy()
	if not IsServer() then
		return
	end
	if self.ability.current_target ~= self.parent then
		return
	end

	self.ability.current_target = nil
	self.ability:UpdateUI()
end

custom_phantom_assassin_coup_de_grace_legendary = class({})
custom_phantom_assassin_coup_de_grace_legendary.talents = {}

function custom_phantom_assassin_coup_de_grace_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r7 = 0,
			r7_duration = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "duration", true),
			r7_range = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "range", true),
			r7_status = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "status", true),
			r7_procs = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "procs", true),
			r7_mark_duration = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "mark_duration", true),
			r7_talent_cd = caster:GetTalentValue("modifier_phantom_assassin_crit_7", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_phantom_assassin_crit_7") then
		self.talents.has_r7 = 1
	end
end

function custom_phantom_assassin_coup_de_grace_legendary:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_phantom_assassin_phantom_coup_de_grace_legendary") then
		return "stop_icons/phantom_assassin_immaterial"
	end

	return "grace_legendary"
end

function custom_phantom_assassin_coup_de_grace_legendary:GetBehavior()
	if self.caster:HasModifier("modifier_phantom_assassin_phantom_coup_de_grace_legendary") then
		return DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_NO_TARGET
	end

	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
end

function custom_phantom_assassin_coup_de_grace_legendary:GetCastRange(vLocation, hTarget)
	if self.talents.has_r7 ~= 1 then
		return 0
	end
	if IsServer() then
		return 99999
	end
	return self.talents.r7_range
end

function custom_phantom_assassin_coup_de_grace_legendary:GetCastPoint()
	if self.caster:HasModifier("modifier_phantom_assassin_phantom_coup_de_grace_legendary") then
		return 0
	end

	return self.BaseClass.GetCastPoint(self)
end

function custom_phantom_assassin_coup_de_grace_legendary:GetCooldown()
	return self.talents.has_r7 == 1 and self.talents.r7_talent_cd or 0
end

function custom_phantom_assassin_coup_de_grace_legendary:IsArcana()
	return self.caster.blink_ability and self.caster.blink_ability:IsArcana()
end

function custom_phantom_assassin_coup_de_grace_legendary:OnAbilityPhaseStart()
	if self.caster:HasModifier("modifier_phantom_assassin_phantom_coup_de_grace_legendary") then
		return true
	end

	if self:IsArcana() then
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_2)
	else
		self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT, 1.3)
	end
	return true
end

function custom_phantom_assassin_coup_de_grace_legendary:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(self:IsArcana() and ACT_DOTA_CAST_ABILITY_2 or ACT_DOTA_ATTACK_EVENT)
end

function custom_phantom_assassin_coup_de_grace_legendary:OnSpellStart()
	if not IsServer() then
		return
	end

	local mod = self.caster:FindModifierByName("modifier_phantom_assassin_phantom_coup_de_grace_legendary")

	if mod then
		mod:Destroy()
		return
	end

	local start_abs = self.caster:GetAbsOrigin()
	local point = self:GetCursorPosition()
	local dir = point - start_abs
	local range = self.talents.r7_range + self.caster:GetCastRangeBonus()

	if dir:Length2D() > range then
		point = start_abs + dir:Normalized() * range
	end

	self:Blink(GetGroundPosition(point, nil))

	if self:IsArcana() then
		self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 2)
	end

	if self.caster.blink_ability then
		self.caster:AddNewModifier(
			self.caster,
			self.caster.blink_ability,
			"modifier_phantom_assassin_phantom_strike_buff",
			{ duration = self.talents.r7_duration }
		)
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_phantom_assassin_phantom_coup_de_grace_legendary",
		{ duration = self.talents.r7_duration, x = start_abs.x, y = start_abs.y }
	)
	self:EndCd(0.3)
end

function custom_phantom_assassin_coup_de_grace_legendary:Blink(point)
	local particle_end = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_phantom_strike_end.vpcf",
		self
	)
	local start_abs = self.caster:GetAbsOrigin()

	self.caster:Teleport(
		point,
		true,
		"particles/econ/items/phantom_assassin/pa_crimson_witness_2021/pa_crimson_witness_blur_start.vpcf",
		particle_end,
		"Hero_PhantomAssassin.Strike.Start"
	)

	EmitSoundOnLocationWithCaster(start_abs, "Hero_PhantomAssassin.Strike.End", self.caster)

	local trail =
		ParticleManager:CreateParticle("particles/phantom_assassin/blink_effect_red.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(trail, 0, start_abs)
	ParticleManager:SetParticleControl(trail, 1, point)
	ParticleManager:ReleaseParticleIndex(trail)
end

function custom_phantom_assassin_coup_de_grace_legendary:CreateTalent()
	local dagger = self.caster:FindAbilityByName("custom_phantom_assassin_stifling_dagger_legendary")

	self.caster:SwapAbilities(
		self:GetName(),
		"custom_phantom_assassin_stifling_dagger_legendary",
		true,
		IsValid(dagger) and not dagger:IsHidden() or false
	)
	self:SetLevel(1)
	self:UpdateTalents()
end

modifier_phantom_assassin_phantom_coup_de_grace_legendary = class(mod_hidden)
function modifier_phantom_assassin_phantom_coup_de_grace_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_gods_strength.vpcf"
end
function modifier_phantom_assassin_phantom_coup_de_grace_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_phantom_assassin_phantom_coup_de_grace_legendary:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.targets = {}
	self.point = GetGroundPosition(Vector(params.x, params.y, 0), nil)

	self:SetStackCount(self.ability.talents.r7_procs)

	local illusions = CreateIllusions(
		self.parent,
		self.parent,
		{ outgoing_damage = -100, incoming_damage = -100, duration = self:GetDuration() + 1 },
		1,
		0,
		false,
		false
	)

	for _, illusion in pairs(illusions) do
		illusion.owner = self.parent
		illusion:SetOwner(nil)
		illusion:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_phantom_assassin_phantom_coup_de_grace_legendary_clone",
			{ duration = self:GetDuration() }
		)
		FindClearSpaceForUnit(illusion, self.point, true)

		self.clone = illusion
	end

	self.parent:EmitSound("Phantom_Assassin.SuperCrit")
	self.parent:GenericParticle("particles/phantom_assassin/pa_cry.vpcf")

	self.parent:GenericParticle(
		"particles/econ/items/phantom_assassin/pa_crimson_witness_2021/pa_crimson_witness_blur_start.vpcf"
	)
	self.legendary_particle =
		ParticleManager:CreateParticle("particles/bloodseeker/thirst_legendary.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.legendary_particle, false, false, -1, false, false)

	self:UpdateUI()
	self:StartIntervalThink(0.1)
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary:UpdateUI()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({
		max_time = self.ability.talents.r7_duration,
		time = self:GetRemainingTime(),
		stack = self:GetStackCount(),
		active = self:GetStackCount() > 0 and 1 or 0,
		priority = 3,
		style = "PhantomVendetta",
	})
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary:OnIntervalThink()
	self:UpdateUI()
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary:GetModifierStatusResistanceStacking()
	return self.ability.talents.r7_status or 0
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary:GetModifierModelScale()
	return 15
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 3, style = "PhantomVendetta" })
	self.ability:StartCd()

	if IsValid(self.clone) then
		self.clone:ForceKill(false)
	end

	if not self.parent:IsAlive() then
		return
	end

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Phantom_Assassin.SuperCrit_end", self.parent)
	self.ability:Blink(self.point)

	for target, stacks in pairs(self.targets) do
		if IsValid(target) and target:IsAlive() then
			target:AddNewModifier(
				self.parent,
				self.parent.crit_ability,
				"modifier_phantom_assassin_phantom_coup_de_grace_legendary_crit",
				{ duration = self.ability.talents.r7_mark_duration, stacks = stacks }
			)
		end
	end
end

modifier_phantom_assassin_phantom_coup_de_grace_legendary_clone = class(mod_hidden)
function modifier_phantom_assassin_phantom_coup_de_grace_legendary_clone:GetStatusEffectName()
	return "particles/status_fx/status_effect_phantom_assassin_active_blur.vpcf"
end
function modifier_phantom_assassin_phantom_coup_de_grace_legendary_clone:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_phantom_assassin_phantom_coup_de_grace_legendary_clone:OnCreated()
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.parent:GenericParticle("particles/phantom_assassin/blink_illusion_blur.vpcf", self)
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT, 1.4)

	self:StartIntervalThink(0.1)
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary_clone:OnIntervalThink()
	if not IsServer() then
		return
	end

	local remaining = self:GetRemainingTime()
	local seconds = math.ceil(remaining)
	local isHalf = (seconds - remaining) >= 0.5

	if isHalf then
		seconds = seconds - 1
	end

	if self.half == isHalf then
		return
	end

	self.half = isHalf
	local mid = 1

	if isHalf then
		mid = 8
	end

	local len = 2

	if seconds < 1 then
		len = 1

		if not isHalf then
			return
		end
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/phantom_assassin/crit_legendary_timer.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(1, seconds, mid))
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(len, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function modifier_phantom_assassin_phantom_coup_de_grace_legendary_clone:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end