--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_pangolier_lucky_shot_custom_tracker",
	"abilities/pangolier/pangolier_lucky_shot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_lucky_shot_custom_disarm",
	"abilities/pangolier/pangolier_lucky_shot_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_pangolier_lucky_shot_custom_dash",
	"abilities/pangolier/pangolier_lucky_shot_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_pangolier_lucky_shot_custom_legendary",
	"abilities/pangolier/pangolier_lucky_shot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_lucky_shot_custom_legendary_speed",
	"abilities/pangolier/pangolier_lucky_shot_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_lucky_7"
)
LinkLuaModifier(
	"modifier_pangolier_lucky_shot_custom_legendary_caster",
	"abilities/pangolier/pangolier_lucky_shot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_lucky_shot_custom_armor",
	"abilities/pangolier/pangolier_lucky_shot_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_lucky_3"
)
LinkLuaModifier(
	"modifier_pangolier_lucky_shot_custom_armor_effect",
	"abilities/pangolier/pangolier_lucky_shot_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_pangolier_lucky_3" }
)

pangolier_lucky_shot_custom = class({})
pangolier_lucky_shot_custom.talents = {}

function pangolier_lucky_shot_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_luckyshot_disarm_cast.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_pangolier/pangolier_luckyshot_disarm_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_swashbuckler_dash.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_swashbuckler.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_heartpiercer_delay.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/pangolier_heartpiercer_v_front_models.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/pangolier_heartpiercer_v_right_models.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/pangolier_heartpiercer_v_back_models.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/pangolier_heartpiercer_v_left_models.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/pangolier_heartpiercer_v_front_end.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/pangolier_heartpiercer_v_right_end.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/pangolier_heartpiercer_v_back_end.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/pangolier_heartpiercer_v_left_end.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/troll_warlord/troll_warlord_ti7_axe/troll_ti7_axe_bash_explosion.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact_mechanical.vpcf",
		context
	)
	PrecacheResource("particle", "particles/pangolier/lucky_stack_max.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/lucky_legendary_delay.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_false_promise_heal.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/lucky_cleave.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_heartpiercer_debuff.vpcf", context)
	PrecacheResource("particle", "particles/sven/cleave_speed_ready.vpcf", context)
end

function pangolier_lucky_shot_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_chance = 0,
			e1_damage = 0,
			e1_damage_type = caster:GetTalentValue("modifier_pangolier_lucky_1", "damage_type", true),
			e1_radius = caster:GetTalentValue("modifier_pangolier_lucky_1", "radius", true),

			e2_range = 0,
			e2_heal = 0,
			e2_bonus = caster:GetTalentValue("modifier_pangolier_lucky_2", "bonus", true),

			has_e3 = 0,
			e3_agi = 0,
			e3_base = 0,
			e3_armor = 0,
			e3_armor_legendary = 0,
			e3_max = caster:GetTalentValue("modifier_pangolier_lucky_3", "max", true),
			e3_duration = caster:GetTalentValue("modifier_pangolier_lucky_3", "duration", true),

			has_e4 = 0,
			e4_cd = caster:GetTalentValue("modifier_pangolier_lucky_4", "cd", true),
			e4_target_range = caster:GetTalentValue("modifier_pangolier_lucky_4", "target_range", true),
			e4_back_range = caster:GetTalentValue("modifier_pangolier_lucky_4", "back_range", true),
			e4_dash_speed = caster:GetTalentValue("modifier_pangolier_lucky_4", "dash_speed", true),
			e4_dash_speed_target = caster:GetTalentValue("modifier_pangolier_lucky_4", "dash_speed_target", true),
			e4_stun = caster:GetTalentValue("modifier_pangolier_lucky_4", "stun", true),
			e4_range = caster:GetTalentValue("modifier_pangolier_lucky_4", "range", true),
			e4_cd_legendary = caster:GetTalentValue("modifier_pangolier_lucky_4", "cd_legendary", true) / 100,
			e4_talent_cd = caster:GetTalentValue("modifier_pangolier_lucky_4", "talent_cd", true),

			has_e7 = 0,

			has_h5 = 0,
			h5_damage_reduce = caster:GetTalentValue("modifier_pangolier_hero_5", "damage_reduce", true),
			h5_silence = caster:GetTalentValue("modifier_pangolier_hero_5", "silence", true),
			h5_talent_cd = caster:GetTalentValue("modifier_pangolier_hero_5", "talent_cd", true),

			has_w7 = 0,

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_pangolier_lucky_1") then
		self.talents.has_e1 = 1
		self.talents.e1_chance = caster:GetTalentValue("modifier_pangolier_lucky_1", "chance")
		self.talents.e1_damage = caster:GetTalentValue("modifier_pangolier_lucky_1", "damage") / 100
	end

	if caster:HasTalent("modifier_pangolier_lucky_2") then
		self.talents.e2_range = caster:GetTalentValue("modifier_pangolier_lucky_2", "range")
		self.talents.e2_heal = caster:GetTalentValue("modifier_pangolier_lucky_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_pangolier_lucky_2",
			type = 2,
			value = function(params)
				if
					(self.talents.has_e7 == 0 and params.attack_damage_flag == "pangolier_q")
					or caster:GetUpgradeStack("modifier_pangolier_lucky_shot_custom_legendary_caster") == 1
				then
					return self.talents.e2_heal * self.talents.e2_bonus
				end
				return self.talents.e2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_pangolier_lucky_3") then
		self.talents.has_e3 = 1
		self.talents.e3_agi = caster:GetTalentValue("modifier_pangolier_lucky_3", "agi") / 100
		self.talents.e3_base = caster:GetTalentValue("modifier_pangolier_lucky_3", "base")
		self.talents.e3_armor = caster:GetTalentValue("modifier_pangolier_lucky_3", "armor") / 100
		self.talents.e3_armor_legendary = caster:GetTalentValue("modifier_pangolier_lucky_3", "armor_legendary") / 100
		if IsServer() then
			caster:AddPercentStat({ agi = self.talents.e3_agi }, self.tracker)
		end
	end

	if caster:HasTalent("modifier_pangolier_lucky_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_pangolier_lucky_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_pangolier_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_pangolier_shield_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_pangolier_rolling_7") then
		self.talents.has_r7 = 1
	end
end

function pangolier_lucky_shot_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_pangolier_lucky_shot_custom_tracker"
end

function pangolier_lucky_shot_custom:GetAbilityTextureName()
	if self.talents.has_w7 == 1 or self.talents.has_r7 == 1 then
		return "pangolier_lucky_shot_disarm"
	end
	return "pangolier_lucky_shot"
end

function pangolier_lucky_shot_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_e4 ~= 1 then
		return
	end
	return (hTarget and self.talents.e4_target_range or (IsServer() and 99999 or self.talents.e4_range))
		- self.caster:GetCastRangeBonus()
end

function pangolier_lucky_shot_custom:GetCooldown(iLevel)
	if self.talents.has_e4 ~= 1 then
		return
	end
	return self.talents.e4_talent_cd
end

function pangolier_lucky_shot_custom:GetBehavior()
	if self.talents.has_e4 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function pangolier_lucky_shot_custom:GetCastAnimation()
	return 0
end

function pangolier_lucky_shot_custom:GetChance()
	return self.chance_pct + self.talents.e1_chance
end

function pangolier_lucky_shot_custom:OnSpellStart()
	self.caster:RemoveModifierByName("modifier_pangolier_rollup_custom")
	self.caster:RemoveModifierByName("modifier_pangolier_gyroshell_custom")

	local target = self:GetCursorTarget()
	local point = self.caster:CastPosition(self:GetCursorPosition())
	if target then
		point = target:GetAbsOrigin()
		target:EmitSound("Pango.Lucky_dash2")
		target:AddNewModifier(self.caster, self, "modifier_stunned", { duration = self.talents.e4_stun })
		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			target
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)
	else
		self.caster:EmitSound("Pango.Lucky_dash2")
	end

	local dir = (point - self.caster:GetAbsOrigin())
	dir.z = 0
	dir = dir:Normalized()

	self.caster:AddNewModifier(self.caster, self, "modifier_pangolier_lucky_shot_custom_dash", {
		target = target and target:entindex() or -1,
		x = dir.x,
		y = dir.y,
		duration = 3,
	})
end

function pangolier_lucky_shot_custom:ProcPassive(target, proc)
	if not IsServer() then
		return
	end
	if self.caster:PassivesDisabled() then
		return
	end
	if not self:IsTrained() then
		return
	end

	if not proc then
		if
			not RollPseudoRandomPercentage(
				self:GetChance(),
				"modifier_pangolier_lucky_shot_custom_tracker",
				self.caster
			)
		then
			return
		end
	end

	self.caster:LogProc("pangolier_lucky_shot_custom", proc and 1 or 0, target)

	if target:IsRealHero() and self.caster:GetQuest() == "Pangolier.Quest_7" then
		self.caster:UpdateQuest(1)
	end

	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, self.talents.has_h5 == 1),
		"modifier_pangolier_lucky_shot_custom_disarm",
		{ duration = self.duration * (1 - target:GetStatusResistance()) }
	)
	target:EmitSound("Hero_Pangolier.LuckyShot.Proc")

	if self.talents.has_e7 == 0 then
		self:ApplyArmor(target)
	end

	if self.talents.has_h5 == 1 and target:CheckCd("pangolier_h5", self.talents.h5_talent_cd) then
		target:EmitSound("Sf.Raze_Silence")
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_generic_silence",
			{ duration = (1 - target:GetStatusResistance()) * self.talents.h5_silence }
		)
		self.caster:LogProc("modifier_pangolier_hero_5", nil, target)
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_luckyshot_disarm_cast.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
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

	local targets = { target }
	local damageTable = {
		ability = self,
		attacker = self.caster,
		damage_type = DAMAGE_TYPE_PHYSICAL,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
	}

	if self.talents.has_e1 == 1 then
		targets = self.caster:FindTargets(self.talents.e1_radius, target:GetAbsOrigin())

		local particle =
			ParticleManager:CreateParticle("particles/pangolier/lucky_cleave.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle)
	end

	for _, aoe_target in pairs(targets) do
		local damage = 0
		local damage_ability
		if target == aoe_target and target:IsCreep() then
			damage = damage + self.damage
		end
		if self.talents.has_e1 == 1 then
			damage = damage + self.caster:GetAgility() * self.talents.e1_damage
			damage_ability = "modifier_pangolier_lucky_1"
		end

		if damage > 0 then
			damageTable.victim = aoe_target
			damageTable.damage = damage
			DoDamage(damageTable, damage_ability)
			aoe_target:SendNumber(4, damage)
		end
	end
end

function pangolier_lucky_shot_custom:ApplyArmor(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 == 0 then
		return
	end
	if target:IsCreep() then
		return
	end

	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, true),
		"modifier_pangolier_lucky_shot_custom_armor",
		{ duration = self.talents.e3_duration }
	)
end

modifier_pangolier_lucky_shot_custom_tracker = class(mod_hidden)
function modifier_pangolier_lucky_shot_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.lucky_ability = self.ability
	self.parent.lucky_ability_legendary = self.parent:FindAbilityByName("pangolier_heartpiercer_custom")
	if self.parent.lucky_ability_legendary then
		self.parent.lucky_ability_legendary:UpdateTalents()
	end

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.attack_slow = self.ability:GetSpecialValueFor("attack_slow")
	self.ability.armor = self.ability:GetSpecialValueFor("armor")
	self.ability.magic = self.ability:GetSpecialValueFor("magic")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.chance_pct = self.ability:GetSpecialValueFor("chance_pct")

	self.proc = self.parent:AddProc(self, { current = true, extra = true })
	self.parent:AddProc(self, { name = "hit", land = true })
	self.parent:AddAttackRecordEvent_out(self)
end

function modifier_pangolier_lucky_shot_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.attack_slow = self.ability:GetSpecialValueFor("attack_slow")
	self.ability.armor = self.ability:GetSpecialValueFor("armor")
	self.ability.magic = self.ability:GetSpecialValueFor("magic")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_pangolier_lucky_shot_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability:GetChance()
end

function modifier_pangolier_lucky_shot_custom_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not self.proc then
		return
	end
	if not self.proc.armed then
		return
	end

	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT, self.parent:GetAttackSpeed(true))
end

function modifier_pangolier_lucky_shot_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local target = params.target
	local mod = target:FindModifierByName("modifier_pangolier_lucky_shot_custom_armor_effect")

	if mod then
		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			target
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)
		target:EmitSound("Pango.Lucky_legendary_proc_attack")
	end

	if not params.procs[self].default then
		return
	end
	self.ability:ProcPassive(target, true)
end

function modifier_pangolier_lucky_shot_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_pangolier_lucky_shot_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.e2_range
end

modifier_pangolier_lucky_shot_custom_disarm = class(mod_visible)
function modifier_pangolier_lucky_shot_custom_disarm:IsPurgable()
	return true
end
function modifier_pangolier_lucky_shot_custom_disarm:GetTexture()
	return "pangolier_lucky_shot"
end
function modifier_pangolier_lucky_shot_custom_disarm:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.lucky_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.armor = self.ability.armor
	self.magic = self.ability.magic
	self.speed = self.ability.attack_slow

	if not IsServer() then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_pangolier_lucky_shot_custom_disarm:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.particle then
		if
			self.parent:HasModifier("modifier_pangolier_lucky_shot_custom_legendary")
			or self.parent:HasModifier("modifier_pangolier_lucky_shot_custom_armor_effect")
		then
			ParticleManager:DestroyParticle(self.particle, false)
			ParticleManager:ReleaseParticleIndex(self.particle)
			self.particle = nil
		end
	else
		if
			not self.parent:HasModifier("modifier_pangolier_lucky_shot_custom_legendary")
			and not self.parent:HasModifier("modifier_pangolier_lucky_shot_custom_armor_effect")
		then
			self.particle = self.parent:GenericParticle(
				"particles/units/heroes/hero_pangolier/pangolier_luckyshot_disarm_debuff.vpcf",
				self,
				true
			)
		end
	end
end

function modifier_pangolier_lucky_shot_custom_disarm:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_pangolier_lucky_shot_custom_disarm:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

function modifier_pangolier_lucky_shot_custom_disarm:GetModifierPhysicalArmorBonus()
	if self.ability.talents.has_w7 == 1 or self.ability.talents.has_r7 == 1 then
		return
	end
	return self.armor
end

function modifier_pangolier_lucky_shot_custom_disarm:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_w7 == 0 and self.ability.talents.has_r7 == 0 then
		return
	end
	return self.magic
end

function modifier_pangolier_lucky_shot_custom_disarm:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_damage_reduce
end

function modifier_pangolier_lucky_shot_custom_disarm:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_damage_reduce
end

modifier_pangolier_lucky_shot_custom_dash = class(mod_hidden)
function modifier_pangolier_lucky_shot_custom_dash:GetEffectName()
	return "particles/units/heroes/hero_pangolier/pangolier_swashbuckler_dash.vpcf"
end
function modifier_pangolier_lucky_shot_custom_dash:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.parent:GenericParticle("particles/items_fx/force_staff.vpcf", self)
	self.parent:EmitSound("Pango.Lucky_dash")

	self.dir = Vector(kv.x, kv.y, 0):Normalized()

	self.back_range = self.ability.talents.e4_back_range
	self.dash_range = self.ability.talents.e4_range
	self.point = self.parent:GetAbsOrigin() + self.dash_range * self.dir
	self.speed = self.ability.talents.e4_dash_speed

	self.bkb_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_debuff_immune", {})

	self.target = nil
	if kv.target ~= -1 then
		self.is_target = true
		self.target = EntIndexToHScript(kv.target)
		self.point = self.target:GetAbsOrigin() + self.dir * self.back_range
		self.parent:FacePoint(self.parent:GetAbsOrigin() - self.parent:GetForwardVector() * 10)
		self.speed = self.ability.talents.e4_dash_speed_target
	else
		self.parent:FacePoint(self.point)
	end

	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_1)

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_pangolier_lucky_shot_custom_dash:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end

	if self.is_target then
		if not IsValid(self.target) or not self.target:IsAlive() then
			self:Destroy()
			return
		end
		self.point = self.target:GetAbsOrigin() + self.dir * self.back_range
	end

	local pos = me:GetAbsOrigin()
	local dir = (self.point - pos)

	if dir:Length2D() > 2000 then
		self:Destroy()
		return
	end

	dir = dir:Normalized()
	dir.z = 0

	local pos = me:GetAbsOrigin() + dir * self.speed * dt
	me:SetAbsOrigin(GetGroundPosition(pos, me))

	if (self.point - pos):Length2D() < self.speed * dt then
		self:Destroy()
		return
	end
end

function modifier_pangolier_lucky_shot_custom_dash:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_pangolier_lucky_shot_custom_dash:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_pangolier_lucky_shot_custom_dash:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_pangolier_lucky_shot_custom_dash:GetOverrideAnimation()
	return ACT_DOTA_CAST_ABILITY_1
end

function modifier_pangolier_lucky_shot_custom_dash:GetModifierDisableTurning()
	return 1
end

function modifier_pangolier_lucky_shot_custom_dash:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.bkb_mod) then
		self.bkb_mod:Destroy()
	end

	self.parent:InterruptMotionControllers(true)

	self.parent:FacePoint(IsValid(self.target) and self.target:GetAbsOrigin() or nil)
	ResolveNPCPositions(self.parent:GetAbsOrigin(), 128)
	self.parent:FadeGesture(ACT_DOTA_CAST_ABILITY_1)
end

modifier_pangolier_lucky_shot_custom_armor = class(mod_visible)
function modifier_pangolier_lucky_shot_custom_armor:GetTexture()
	return "buffs/pangolier/lucky_3"
end
function modifier_pangolier_lucky_shot_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.lucky_ability

	if not self.ability then
		self:Destroy()
		return
	end

	if not IsServer() then
		return
	end

	self.max = self.ability.talents.e3_max
	self.armor = self.ability.talents.e3_base

	if self.ability.talents.has_e7 == 1 then
		self.armor = self.armor + self.parent:GetArmor(self) * self.ability.talents.e3_armor_legendary
	else
		self.armor = self.armor + self.parent:GetArmor(self) * self.ability.talents.e3_armor
	end

	self.armor = self.armor / self.max

	self:SetHasCustomTransmitterData(true)
	self:OnRefresh()
	self:SendBuffRefreshToClients()
end

function modifier_pangolier_lucky_shot_custom_armor:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:AddNewModifier(self.caster, self.ability, "modifier_pangolier_lucky_shot_custom_armor_effect", {})
	end
end

function modifier_pangolier_lucky_shot_custom_armor:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_pangolier_lucky_shot_custom_armor_effect")
end

function modifier_pangolier_lucky_shot_custom_armor:AddCustomTransmitterData()
	return {
		armor = self.armor,
	}
end

function modifier_pangolier_lucky_shot_custom_armor:HandleCustomTransmitterData(data)
	self.armor = data.armor
end

function modifier_pangolier_lucky_shot_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_pangolier_lucky_shot_custom_armor:GetModifierPhysicalArmorBonus()
	if not self.armor then
		return
	end
	return self.armor * self:GetStackCount()
end

modifier_pangolier_lucky_shot_custom_armor_effect = class(mod_hidden)
function modifier_pangolier_lucky_shot_custom_armor_effect:GetStatusEffectName()
	return "particles/status_fx/status_effect_rupture.vpcf"
end
function modifier_pangolier_lucky_shot_custom_armor_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_pangolier_lucky_shot_custom_armor_effect:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if self.ability.talents.has_e7 == 0 then
		self.parent:EmitSound("Pango.Lucky_legendary_proc")
		self.parent:EmitSound("Pango.Lucky_dash2")

		local dir = (self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		dir.z = 0

		local coup_pfx = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact_mechanical.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			coup_pfx,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControl(coup_pfx, 1, self.parent:GetOrigin())
		ParticleManager:SetParticleControlForward(coup_pfx, 1, dir)
		ParticleManager:ReleaseParticleIndex(coup_pfx)
	end

	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
	self.parent:GenericParticle("particles/units/heroes/hero_pangolier/pangolier_heartpiercer_debuff.vpcf", self, true)
	self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
end

pangolier_heartpiercer_custom = class({})
pangolier_heartpiercer_custom.talents = {}

function pangolier_heartpiercer_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e7 = 0,
			e7_speed = caster:GetTalentValue("modifier_pangolier_lucky_7", "speed", true),
			e7_max = caster:GetTalentValue("modifier_pangolier_lucky_7", "max", true),
			e7_stun = caster:GetTalentValue("modifier_pangolier_lucky_7", "stun", true),
			e7_effect_duration = caster:GetTalentValue("modifier_pangolier_lucky_7", "effect_duration", true),
			e7_duration = caster:GetTalentValue("modifier_pangolier_lucky_7", "duration", true),
			e7_damage = caster:GetTalentValue("modifier_pangolier_lucky_7", "damage", true),
			e7_talent_cd = caster:GetTalentValue("modifier_pangolier_lucky_7", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_pangolier_lucky_7") then
		self.talents.has_e7 = 1
	end
end

function pangolier_heartpiercer_custom:GetCooldown()
	return self.talents.e7_talent_cd or 0
end

function pangolier_heartpiercer_custom:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
end

function pangolier_heartpiercer_custom:OnAbilityPhaseStart()
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT, 1.3)
	self.caster:EmitSound("Hero_Pangolier.PreAttack")
	return self.talents.has_e7 == 1
end

function pangolier_heartpiercer_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_ATTACK_EVENT)
end

function pangolier_heartpiercer_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	self.caster:EmitSound("Hero_Pangolier.PreAttack")

	local dir = (target:GetAbsOrigin() - self.caster:GetAbsOrigin())

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_swashbuckler.vpcf",
		PATTACH_POINT_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControl(effect_cast, 1, dir:Normalized() * dir:Length2D())
	ParticleManager:SetParticleControl(effect_cast, 3, dir:Normalized() * dir:Length2D())

	Timers:CreateTimer(0.2, function()
		if effect_cast then
			ParticleManager:DestroyParticle(effect_cast, false)
			ParticleManager:ReleaseParticleIndex(effect_cast)
		end
	end)

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_pangolier/pangolier_luckyshot_disarm_cast.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
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

	target:EmitSound("Pango.Lucky_legendary")
	target:EmitSound("Pango.Lucky_legendary2")

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_pangolier_lucky_shot_custom_legendary_caster",
		{ duration = self.talents.e7_effect_duration }
	)
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_pangolier_lucky_shot_custom_legendary",
		{ duration = self.talents.e7_effect_duration }
	)
end

modifier_pangolier_lucky_shot_custom_legendary = class(mod_visible)
function modifier_pangolier_lucky_shot_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_life_stealer_open_wounds.vpcf"
end
function modifier_pangolier_lucky_shot_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_pangolier_lucky_shot_custom_legendary:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:AddAttackStartEvent_inc(self)

	self.parent:GenericParticle("particles/pangolier/lucky_legendary_delay.vpcf", self, true)

	self.proced = false
	self.sides = {}
	self.facing_direction = self.parent:GetAnglesAsVector().y

	self.parent:EmitSound("Pango.Lucky_legendary_lp")
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)

	local hit_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	self.particles_sides = {}
	self.particles_sides[1] =
		self.parent:GenericParticle("particles/pangolier/pangolier_heartpiercer_v_front_models.vpcf", self)
	self.particles_sides[2] =
		self.parent:GenericParticle("particles/pangolier/pangolier_heartpiercer_v_right_models.vpcf", self)
	self.particles_sides[3] =
		self.parent:GenericParticle("particles/pangolier/pangolier_heartpiercer_v_back_models.vpcf", self)
	self.particles_sides[4] =
		self.parent:GenericParticle("particles/pangolier/pangolier_heartpiercer_v_left_models.vpcf", self)

	self.end_effects = {
		[1] = "particles/pangolier/pangolier_heartpiercer_v_front_end.vpcf",
		[2] = "particles/pangolier/pangolier_heartpiercer_v_right_end.vpcf",
		[3] = "particles/pangolier/pangolier_heartpiercer_v_back_end.vpcf",
		[4] = "particles/pangolier/pangolier_heartpiercer_v_left_end.vpcf",
	}

	for i = 1, 4 do
		ParticleManager:SetParticleControl(self.particles_sides[i], 1, Vector(self:GetRemainingTime(), 0, 0))
	end

	self.forward = self.parent:GetForwardVector()
	self.interval = 0.1
	self:StartIntervalThink(self.interval)
end

function modifier_pangolier_lucky_shot_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 300, self.interval * 2, false)
end

function modifier_pangolier_lucky_shot_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Pango.Lucky_legendary_lp")

	local mod = self.caster:FindModifierByName("modifier_pangolier_lucky_shot_custom_legendary_caster")
	if not mod then
		return
	end

	if self.active then
		mod:Activate()
	else
		mod:Destroy()
	end
end

function modifier_pangolier_lucky_shot_custom_legendary:AttackStartEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.target then
		return
	end
	if self.caster ~= params.attacker then
		return
	end

	local attacker_vector = (self.caster:GetOrigin() - self.parent:GetOrigin())
	local attacker_direction = VectorToAngles(attacker_vector).y
	local angle_diff = AngleDiff(self.facing_direction, attacker_direction)

	local side = 0
	if angle_diff < 45 and angle_diff > -45 then
		side = 1
	elseif angle_diff >= 45 and angle_diff <= 135 then
		side = 2
	elseif angle_diff > 135 or (angle_diff >= -180 and angle_diff < -135) then
		side = 3
	elseif angle_diff >= -135 and angle_diff <= -45 then
		side = 4
	end

	if side == 0 then
		return
	end
	local mod = self.caster:FindModifierByName("modifier_pangolier_lucky_shot_custom_legendary_caster")

	if not self.sides[side] then
		self.sides[side] = true

		if self.particles_sides[side] then
			local end_part = self.end_effects[side]
			local hit_effect = ParticleManager:CreateParticle(end_part, PATTACH_ABSORIGIN_FOLLOW, self.parent)
			ParticleManager:SetParticleControlForward(hit_effect, 1, self.forward)
			ParticleManager:ReleaseParticleIndex(hit_effect)

			ParticleManager:DestroyParticle(self.particles_sides[side], false)
			ParticleManager:ReleaseParticleIndex(self.particles_sides[side])
			self.particles_sides[side] = nil
		end

		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)
		self.parent:EmitSound("Pango.Lucky_legendary_hit")

		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_pangolier_lucky_shot_custom_legendary_speed",
			{ duration = self.ability.talents.e7_duration }
		)

		if IsValid(self.caster.lucky_ability) then
			self.caster.lucky_ability:ApplyArmor(self.parent)
		end
		if mod then
			mod.stack = mod.stack - 1
		end
	end

	local count = 0
	for i = 1, 4 do
		if self.sides[i] then
			count = count + 1
		end
	end

	if count < 4 then
		return
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/econ/items/troll_warlord/troll_warlord_ti7_axe/troll_ti7_axe_bash_explosion.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, self.caster:GetOrigin())
	ParticleManager:ReleaseParticleIndex(effect_cast)

	local dir = (self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
	dir.z = 0

	local coup_pfx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact_mechanical.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		coup_pfx,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControl(coup_pfx, 1, self.parent:GetOrigin())
	ParticleManager:SetParticleControlForward(coup_pfx, 1, dir)
	ParticleManager:ReleaseParticleIndex(coup_pfx)

	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_bashed",
		{ duration = (1 - self.parent:GetStatusResistance()) * self.ability.talents.e7_stun }
	)
	self.caster:LogProc("modifier_pangolier_lucky_7", self:GetElapsedTime(), self.parent)

	self.parent:EmitSound("Pango.Lucky_legendary_proc")
	self.parent:EmitSound("Pango.Lucky_dash2")
	self.parent:EmitSound("Hero_Pangolier.LuckyShot.Proc")

	self.active = true
	self:Destroy()
end

modifier_pangolier_lucky_shot_custom_legendary_caster = class(mod_hidden)
function modifier_pangolier_lucky_shot_custom_legendary_caster:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_pangolier_lucky_shot_custom_legendary_speed")
	self.ability:EndCd()

	self.stack = self.ability.talents.e7_max
	self.max_time = self:GetRemainingTime()

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_pangolier_lucky_shot_custom_legendary_caster:OnIntervalThink()
	if not IsServer() then
		return
	end
	local stack = self.stack
	local zero = 0

	if self:GetStackCount() == 1 then
		stack = self:GetRemainingTime()
		zero = 1
	end
	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = stack,
		use_zero = zero,
		active = self:GetStackCount() == 1,
		priority = 2,
		style = "PangolierLucky",
	})
end

function modifier_pangolier_lucky_shot_custom_legendary_caster:Activate()
	if not IsServer() then
		return
	end
	if self:GetStackCount() == 1 then
		return
	end

	self:SetStackCount(1)

	self.max_time = self.ability.talents.e7_duration
	self:SetDuration(self.max_time, true)

	self.parent:EmitSound("Pango.Lucky_stack")
	self.parent:GenericParticle("particles/pangolier/lucky_stack_max.vpcf", self)
	self.parent:GenericParticle("particles/legion_commander/lc_odd_proc_.vpcf")
	self.parent:GenericParticle("particles/sven/cleave_speed_ready.vpcf", self, true)
end

function modifier_pangolier_lucky_shot_custom_legendary_caster:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "PangolierLucky" })
	self.ability:StartCd()
end

function modifier_pangolier_lucky_shot_custom_legendary_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_pangolier_lucky_shot_custom_legendary_caster:GetModifierBaseAttack_BonusDamage()
	if self:GetStackCount() == 0 then
		return
	end
	if not IsValid(self.parent) then
		return
	end
	return self.parent:GetAgility() * self.ability.talents.e7_damage
end

function modifier_pangolier_lucky_shot_custom_legendary_caster:GetModifierModelScale()
	if self:GetStackCount() == 0 then
		return
	end
	return 20
end

modifier_pangolier_lucky_shot_custom_legendary_speed = class(mod_visible)
function modifier_pangolier_lucky_shot_custom_legendary_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e7_max
	self.speed = self.ability.talents.e7_speed
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_pangolier_lucky_shot_custom_legendary_speed:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_pangolier_lucky_shot_custom_legendary_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_pangolier_lucky_shot_custom_legendary_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed * self:GetStackCount()
end