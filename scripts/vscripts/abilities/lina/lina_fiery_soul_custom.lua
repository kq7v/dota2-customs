--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_lina_fiery_soul_custom", "abilities/lina/lina_fiery_soul_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_stack",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_crit",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_legendary_stack",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_soul_7"
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_legendary_attacks",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_legendary_cast",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_heal",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_hero_4"
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_heal_cd",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_hero_4"
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_quest",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_armor",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_str",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_soul_4"
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_damage_reduce",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_soul_4"
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_blink",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_lina_fiery_soul_custom_slow",
	"abilities/lina/lina_fiery_soul_custom",
	LUA_MODIFIER_MOTION_NONE
)

lina_fiery_soul_custom = class({})
lina_fiery_soul_custom.talents = {}

function lina_fiery_soul_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/lina/lina_soul.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_fiery_soul.vpcf", context)
	PrecacheResource("particle", "particles/lina/lina_lowhp.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_phoenix/phoenix_icarus_dive_burn_debuff.vpcf", context)
	PrecacheResource("particle", "particles/lina/soul_stack.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/lina/lina_attack_slow.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/fall_2022/phase_boots/phase_boots_fall_2022.vpcf", context)
end

function lina_fiery_soul_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_speed = 0,
			e1_slow = 0,
			e1_duration = caster:GetTalentValue("modifier_lina_soul_1", "duration", true),

			has_e2 = 0,
			e2_armor_reduce = 0,
			e2_armor = 0,
			e2_duration = caster:GetTalentValue("modifier_lina_soul_2", "duration", true),
			e2_max = caster:GetTalentValue("modifier_lina_soul_2", "max", true),

			has_e3 = 0,
			e3_damage = 0,
			e3_crit = 0,
			e3_duration = caster:GetTalentValue("modifier_lina_soul_3", "duration", true),

			has_e4 = 0,
			e4_heal = caster:GetTalentValue("modifier_lina_soul_4", "heal", true) / 100,
			e4_str = caster:GetTalentValue("modifier_lina_soul_4", "str", true),
			e4_duration = caster:GetTalentValue("modifier_lina_soul_4", "duration", true),
			e4_max = caster:GetTalentValue("modifier_lina_soul_4", "max", true),
			e4_damage_reduce = caster:GetTalentValue("modifier_lina_soul_4", "damage_reduce", true),

			has_e7 = 0,
			e7_mana = caster:GetTalentValue("modifier_lina_soul_7", "mana", true),
			e7_stack_duration = caster:GetTalentValue("modifier_lina_soul_7", "stack_duration", true),
			e7_stack = caster:GetTalentValue("modifier_lina_soul_7", "stack", true),
			e7_attacks = caster:GetTalentValue("modifier_lina_soul_7", "attacks", true),
			e7_cast = caster:GetTalentValue("modifier_lina_soul_7", "cast", true),
			e7_min_distance = caster:GetTalentValue("modifier_lina_soul_7", "min_distance", true),
			e7_talent_cd = caster:GetTalentValue("modifier_lina_soul_7", "talent_cd", true),
			e7_duration = caster:GetTalentValue("modifier_lina_soul_7", "duration", true),
			e7_range = caster:GetTalentValue("modifier_lina_soul_7", "range", true),
			e7_damage = caster:GetTalentValue("modifier_lina_soul_7", "damage", true) / 100,
			e7_speed = caster:GetTalentValue("modifier_lina_soul_7", "speed", true) / 100,
			e7_knock_max = caster:GetTalentValue("modifier_lina_soul_7", "knock_max", true),

			has_h4 = 0,
			h4_duration = caster:GetTalentValue("modifier_lina_hero_4", "duration", true),
			h4_status = caster:GetTalentValue("modifier_lina_hero_4", "status", true),
			h4_health_loss = caster:GetTalentValue("modifier_lina_hero_4", "health_loss", true) / 100,
			h4_heal = caster:GetTalentValue("modifier_lina_hero_4", "heal", true) / 100,
			h4_talent_cd = caster:GetTalentValue("modifier_lina_hero_4", "talent_cd", true),

			has_h5 = 0,
			h5_speed = caster:GetTalentValue("modifier_lina_hero_5", "speed", true),
			h5_move = caster:GetTalentValue("modifier_lina_hero_5", "move", true),
			h5_range = caster:GetTalentValue("modifier_lina_hero_5", "range", true),
			h5_cd = caster:GetTalentValue("modifier_lina_hero_5", "cd", true),
			h5_range_legendary = caster:GetTalentValue("modifier_lina_hero_5", "range_legendary", true),
		}
	end

	if caster:HasTalent("modifier_lina_soul_1") then
		self.talents.has_e1 = 1
		self.talents.e1_speed = caster:GetTalentValue("modifier_lina_soul_1", "speed")
		self.talents.e1_slow = caster:GetTalentValue("modifier_lina_soul_1", "slow")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_lina_soul_2") then
		self.talents.has_e2 = 1
		self.talents.e2_armor_reduce = caster:GetTalentValue("modifier_lina_soul_2", "armor_reduce")
		self.talents.e2_armor = caster:GetTalentValue("modifier_lina_soul_2", "armor")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_lina_soul_3") then
		self.talents.has_e3 = 1
		self.talents.e3_damage = caster:GetTalentValue("modifier_lina_soul_3", "damage")
		self.talents.e3_crit = caster:GetTalentValue("modifier_lina_soul_3", "crit")
		caster:AddProc(self.tracker, { land = true })
		caster:AddRecordDestroyEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_lina_soul_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { land = true })
		caster:AddLifesteal(self.tracker, {
			name = "modifier_lina_soul_4",
			type = 2,
			value = function()
				return (1 - caster:GetHealthPercent() / 100) * self.talents.e4_heal
			end,
		})
	end

	if caster:HasTalent("modifier_lina_soul_7") then
		self.talents.has_e7 = 1
		if IsServer() and not self.e7_init then
			self.e7_init = true
			self:SetActivated(false)
			caster:AddSpellEvent(self.tracker, true)
		end
	end

	if caster:HasTalent("modifier_lina_hero_4") then
		self.talents.has_h4 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_lina_hero_5") then
		self.talents.has_h5 = 1
	end
end

function lina_fiery_soul_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "lina_fiery_soul", self)
end

function lina_fiery_soul_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_lina_fiery_soul_custom"
end

function lina_fiery_soul_custom:GetBehavior()
	if self.talents.has_h5 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + (self.talents.has_e7 == 0 and DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES or 0)
	end
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function lina_fiery_soul_custom:GetCooldown(iLevel)
	if self.talents.has_e7 == 1 then
		return self.talents.e7_talent_cd
	elseif self.talents.has_h5 == 1 then
		return self.talents.h5_cd
	end
	return 0
end

function lina_fiery_soul_custom:GetManaCost(iLevel)
	if self.talents.has_e7 == 1 or self.talents.has_h5 == 1 then
		return self.talents.e7_mana
	end
	return 0
end

function lina_fiery_soul_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_h5 == 1 then
		return IsClient()
				and ((self.talents.has_e7 == 1 and self.talents.h5_range_legendary or self.talents.h5_range) - self.caster:GetCastRangeBonus())
			or 99999
	end
	if self.talents.has_e7 == 1 then
		return self.talents.e7_range - self.caster:GetCastRangeBonus()
	end
	return 0
end

function lina_fiery_soul_custom:OnSpellStart()
	self.caster:RemoveModifierByName("modifier_lina_fiery_soul_custom_legendary_cast")

	if self.talents.has_h5 == 1 and self.caster:CanBlink() then
		local point = self:GetCursorPosition()
		local dir = (point - self.caster:GetAbsOrigin()):Normalized()
		if point == self.caster:GetAbsOrigin() then
			dir = self.caster:GetForwardVector()
		end
		dir.z = 0
		local max_range = self.talents.has_e7 == 1 and self.talents.h5_range_legendary or self.talents.h5_range
		point = self.caster:GetAbsOrigin() + dir * max_range
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_lina_fiery_soul_custom_blink",
			{ duration = max_range / self.talents.h5_speed, x = point.x, y = point.y }
		)
		return
	end

	self:LegendaryProc()
end

function lina_fiery_soul_custom:LegendaryProc()
	if self.talents.has_e7 == 0 then
		return
	end

	self.caster:EmitSound("Lina.Soul_Active")

	local range = self.talents.e7_range

	local particle = ParticleManager:CreateParticle("particles/lina/lina_soul.vpcf", PATTACH_POINT, self.caster)
	ParticleManager:SetParticleControl(particle, 1, Vector(range * 0.8, 0, 0))
	ParticleManager:SetParticleControl(particle, 3, self.caster:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	local hit_hero = false

	for _, enemy in pairs(self.caster:FindTargets(range)) do
		if enemy:IsRealHero() then
			hit_hero = true
		end

		local enemyAbs = enemy:GetAbsOrigin()
		local center = self.caster:GetAbsOrigin()
		local direction = enemyAbs - center
		direction.z = 0
		direction = direction:Normalized()

		if enemyAbs == center then
			direction = enemy:GetForwardVector()
		end

		local point = center + self.talents.e7_knock_max * direction
		local length = (point - enemyAbs):Length2D()

		local knockbackProperties = {
			center_x = center.x,
			center_y = center.y,
			center_z = center.z,
			duration = self.talents.e7_duration,
			knockback_duration = self.talents.e7_duration,
			knockback_distance = math.max(length, self.talents.e7_min_distance),
			knockback_height = 0,
			should_stun = 0,
		}
		enemy:AddNewModifier(self.caster, self, "modifier_knockback", knockbackProperties)

		if self.caster:GetQuest() == "Lina.Quest_7" and enemy:IsRealHero() and not self.caster:QuestCompleted() then
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_lina_fiery_soul_custom_quest",
				{ duration = self.caster.quest.number }
			)
		end

		enemy:AddNewModifier(self.caster, self, "modifier_lina_fiery_soul_custom_legendary_attacks", {})
		enemy:EmitSound("Lina.Soul_Active_target")
	end

	if not hit_hero then
		return
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_lina_fiery_soul_custom_stack",
		{ is_legendary = 1, duration = self.fiery_soul_stack_duration }
	)
end

function lina_fiery_soul_custom:ApplyCrit(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 == 0 then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_lina_fiery_soul_custom_crit",
		{ duration = self.talents.e3_duration }
	)
end

modifier_lina_fiery_soul_custom = class(mod_hidden)
function modifier_lina_fiery_soul_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.fiery_ability = self.ability

	self.ability.fiery_soul_attack_speed_bonus = self.ability:GetSpecialValueFor("fiery_soul_attack_speed_bonus")
	self.ability.fiery_soul_move_speed_bonus = self.ability:GetSpecialValueFor("fiery_soul_move_speed_bonus")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")
	self.ability.fiery_soul_max_stacks = self.ability:GetSpecialValueFor("fiery_soul_max_stacks")
	self.ability.fiery_soul_stack_duration = self.ability:GetSpecialValueFor("fiery_soul_stack_duration")

	self.records = {}
	self.active_mods = {}
	self.current_think = false
end

function modifier_lina_fiery_soul_custom:OnRefresh()
	self.ability.fiery_soul_attack_speed_bonus = self.ability:GetSpecialValueFor("fiery_soul_attack_speed_bonus")
	self.ability.fiery_soul_move_speed_bonus = self.ability:GetSpecialValueFor("fiery_soul_move_speed_bonus")
end

function modifier_lina_fiery_soul_custom:UpdateMod(mod, remove)
	if not IsServer() then
		return
	end

	if remove then
		self.active_mods[mod] = nil
	else
		self.active_mods[mod] = true
	end

	local has_mod = false
	for check_mod, _ in pairs(self.active_mods) do
		if IsValid(check_mod) then
			has_mod = true
		else
			self.active_mods[check_mod] = nil
		end
	end

	if has_mod then
		if not self.current_think then
			self.current_think = true
			self:OnIntervalThink()
			self:StartIntervalThink(self.ability.interval)
		end
	else
		self.current_think = false
		self:StartIntervalThink(-1)
	end
end

function modifier_lina_fiery_soul_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_lina_fiery_soul_custom_stack",
		{ duration = self.ability.fiery_soul_stack_duration }
	)
end

function modifier_lina_fiery_soul_custom:GetProcChance()
	return 100
end

function modifier_lina_fiery_soul_custom:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_e2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_lina_fiery_soul_custom_armor",
			{ duration = self.ability.talents.e2_duration }
		)
	end

	if self.ability.talents.has_e1 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_lina_fiery_soul_custom_slow",
			{ duration = self.ability.talents.e1_duration }
		)
	end

	if self.ability.talents.has_e4 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_lina_fiery_soul_custom_damage_reduce",
			{ duration = self.ability.talents.e4_duration }
		)
		if target:IsRealHero() then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_lina_fiery_soul_custom_str",
				{ duration = self.ability.talents.e4_duration }
			)
		end
	end

	if self.records[params.record] then
		target:EmitSound("DOTA_Item.Daedelus.Crit")
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
	end
end

function modifier_lina_fiery_soul_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if self.ability == params.ability then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_lina_fiery_soul_custom_legendary_cast",
		{ duration = self.ability.talents.e7_cast }
	)
end

function modifier_lina_fiery_soul_custom:GetMinHealth()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:HasModifier("modifier_lina_fiery_soul_custom_heal_cd") then
		return
	end
	return 1
end

function modifier_lina_fiery_soul_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h4 == 0 then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if self.parent:GetHealth() > 10 then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_lina_fiery_soul_custom_heal_cd") then
		return
	end

	self.parent:SetHealth(self.parent:GetMaxHealth() * self.ability.talents.h4_heal)
	self.parent:Purge(false, true, false, false, false)

	local particle = ParticleManager:CreateParticle("particles/lina/lina_lowhp.vpcf", PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:EmitSound("Lina.Soul_lowhp")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_lina_fiery_soul_custom_heal_cd",
		{ duration = self.ability.talents.h4_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_lina_fiery_soul_custom_heal",
		{ duration = self.ability.talents.h4_duration }
	)
end

function modifier_lina_fiery_soul_custom:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	self.records[params.record] = nil
end

function modifier_lina_fiery_soul_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MIN_HEALTH,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_lina_fiery_soul_custom:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.e3_damage
end

function modifier_lina_fiery_soul_custom:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_status
end

function modifier_lina_fiery_soul_custom:GetCritDamage()
	return self.ability.talents.e3_crit
end

function modifier_lina_fiery_soul_custom:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e3 == 0 then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end
	if not target:HasModifier("modifier_lina_fiery_soul_custom_crit") then
		return
	end

	self.records[params.record] = true
	return self:GetCritDamage()
end

modifier_lina_fiery_soul_custom_stack = class(mod_visible)
function modifier_lina_fiery_soul_custom_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self.max = self.ability.fiery_soul_max_stacks
	self.stack = 0

	if not IsServer() then
		return
	end
	self.particle = self.parent:GenericParticle("particles/units/heroes/hero_lina/lina_fiery_soul.vpcf", self)
	self:OnRefresh(table)
end

function modifier_lina_fiery_soul_custom_stack:UpdateStack()
	if not IsServer() then
		return
	end
	self:SetStackCount(
		self.stack
			+ self.parent:GetUpgradeStack("modifier_lina_fiery_soul_custom_legendary_stack")
				* self.ability.talents.e7_stack
	)

	if not self.particle then
		return
	end
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self:GetStackCount(), 0, 0))
end

function modifier_lina_fiery_soul_custom_stack:OnRefresh(table)
	if not IsServer() then
		return
	end

	if table.is_legendary == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_lina_fiery_soul_custom_legendary_stack",
			{ duration = self.ability.talents.e7_stack_duration }
		)
	elseif self.stack < self.max then
		self.stack = self.stack + 1
	end
	self:UpdateStack()
end

function modifier_lina_fiery_soul_custom_stack:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_lina_fiery_soul_custom_legendary_stack")
end

function modifier_lina_fiery_soul_custom_stack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_lina_fiery_soul_custom_stack:GetModifierPhysicalArmorBonus()
	return math.min(self.ability.talents.e2_max, self:GetStackCount()) * self.ability.talents.e2_armor
end

function modifier_lina_fiery_soul_custom_stack:GetModifierAttackSpeedBonus_Constant()
	return self:GetStackCount()
		* (self.ability.fiery_soul_attack_speed_bonus + self.ability.talents.e1_speed)
		* (self.ability.talents.has_e7 == 1 and (1 + self.ability.talents.e7_speed) or 1)
end

function modifier_lina_fiery_soul_custom_stack:GetModifierPreAttack_BonusDamage()
	if self.ability.talents.has_e7 == 0 then
		return
	end
	return self:GetStackCount()
		* (self.ability.fiery_soul_attack_speed_bonus + self.ability.talents.e1_speed)
		* self.ability.talents.e7_damage
end

function modifier_lina_fiery_soul_custom_stack:GetModifierMoveSpeedBonus_Percentage()
	return self:GetStackCount()
		* (
			self.ability.fiery_soul_move_speed_bonus
			+ (self.ability.talents.has_h5 == 1 and self.ability.talents.h5_move or 0)
		)
end

modifier_lina_fiery_soul_custom_legendary_stack = class(mod_hidden)
function modifier_lina_fiery_soul_custom_legendary_stack:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self:OnRefresh()
end

function modifier_lina_fiery_soul_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
end

function modifier_lina_fiery_soul_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_lina_fiery_soul_custom_stack")
	if mod then
		mod:UpdateStack()
	end
end

modifier_lina_fiery_soul_custom_heal = class(mod_visible)
function modifier_lina_fiery_soul_custom_heal:IsDebuff()
	return true
end
function modifier_lina_fiery_soul_custom_heal:GetEffectName()
	return "particles/units/heroes/hero_phoenix/phoenix_icarus_dive_burn_debuff.vpcf"
end
function modifier_lina_fiery_soul_custom_heal:GetTexture()
	return "buffs/lina/hero_4"
end
function modifier_lina_fiery_soul_custom_heal:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self.interval = 1
	self.max = self.ability.talents.h4_duration
	self.reduce = (self.ability.talents.h4_health_loss / self.max) * self.interval

	self.count = 0
	self:StartIntervalThink(self.interval)
end

function modifier_lina_fiery_soul_custom_heal:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.count = self.count + 1
	self.parent:EmitSound("Lina.Soul_lowhp_burn")
	self.parent:SetHealth(math.max(1, self.parent:GetHealth() - self.parent:GetMaxHealth() * self.reduce))

	if self.count >= self.max then
		self:Destroy()
		return
	end
end

modifier_lina_fiery_soul_custom_heal_cd = class(mod_cd)
function modifier_lina_fiery_soul_custom_heal_cd:GetTexture()
	return "buffs/lina/hero_4"
end

modifier_lina_fiery_soul_custom_legendary_cast = class(mod_hidden)
function modifier_lina_fiery_soul_custom_legendary_cast:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability:SetActivated(true)
end

function modifier_lina_fiery_soul_custom_legendary_cast:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:SetActivated(false)
end

modifier_lina_fiery_soul_custom_legendary_attacks = class(mod_hidden)
function modifier_lina_fiery_soul_custom_legendary_attacks:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_lina_fiery_soul_custom_legendary_attacks:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.interval = 0.15
	if not IsServer() then
		return
	end
	self.count = self.ability.talents.e7_attacks
	self:StartIntervalThink(self.interval)
end

function modifier_lina_fiery_soul_custom_legendary_attacks:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, true, { damage = "lina_e7" })

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
	end
end

modifier_lina_fiery_soul_custom_armor = class(mod_hidden)
function modifier_lina_fiery_soul_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.talents.e2_armor_reduce
end

function modifier_lina_fiery_soul_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_lina_fiery_soul_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_lina_fiery_soul_custom_crit = class(mod_hidden)

modifier_lina_fiery_soul_custom_damage_reduce = class(mod_visible)
function modifier_lina_fiery_soul_custom_damage_reduce:GetTexture()
	return "buffs/lina/soul_4"
end
function modifier_lina_fiery_soul_custom_damage_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e4_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_lina_fiery_soul_custom_damage_reduce:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_lina_fiery_soul_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_lina_fiery_soul_custom_damage_reduce:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.e4_damage_reduce * self:GetStackCount()
end

function modifier_lina_fiery_soul_custom_damage_reduce:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.e4_damage_reduce * self:GetStackCount()
end

modifier_lina_fiery_soul_custom_str = class(mod_visible)
function modifier_lina_fiery_soul_custom_str:GetTexture()
	return "buffs/lina/soul_4"
end
function modifier_lina_fiery_soul_custom_str:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e4_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_lina_fiery_soul_custom_str:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_lina_fiery_soul_custom_str:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_lina_fiery_soul_custom_str:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_lina_fiery_soul_custom_str:GetModifierBonusStats_Strength()
	return self.ability.talents.e4_str * self:GetStackCount()
end

modifier_lina_fiery_soul_custom_quest = class(mod_hidden)

modifier_lina_fiery_soul_custom_blink = class(mod_hidden)
function modifier_lina_fiery_soul_custom_blink:GetStatusEffectName()
	return "particles/status_fx/status_effect_lina_flame_cloak.vpcf"
end
function modifier_lina_fiery_soul_custom_blink:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_lina_fiery_soul_custom_blink:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_3, 1)

	self.parent:EmitSound("Lina.Soul_charge")
	self.parent:GenericParticle("particles/econ/events/fall_2022/phase_boots/phase_boots_fall_2022.vpcf", self)
	self.point = GetGroundPosition(Vector(params.x, params.y, 0), nil)

	self.dir = (self.point - self.parent:GetAbsOrigin())
	self.dir.z = 0

	self.parent:FacePoint(self.point)

	self.distance = self.dir:Length2D() / self:GetDuration()

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_lina_fiery_soul_custom_blink:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:LegendaryProc()

	self.parent:InterruptMotionControllers(true)
	self.parent:FacePoint()

	ResolveNPCPositions(self.parent:GetAbsOrigin(), 128)
end

function modifier_lina_fiery_soul_custom_blink:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_lina_fiery_soul_custom_blink:GetModifierDisableTurning()
	return 1
end

function modifier_lina_fiery_soul_custom_blink:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	local pos = self.parent:GetAbsOrigin()
	GridNav:DestroyTreesAroundPoint(pos, 80, false)
	self.parent:SetAbsOrigin(GetGroundPosition(pos + self.dir:Normalized() * self.distance * dt, self.parent))
end

function modifier_lina_fiery_soul_custom_blink:OnHorizontalMotionInterrupted()
	self:Destroy()
end

modifier_lina_fiery_soul_custom_slow = class(mod_hidden)
function modifier_lina_fiery_soul_custom_slow:IsPurgable()
	return true
end
function modifier_lina_fiery_soul_custom_slow:GetEffectName()
	return "particles/lina/lina_attack_slow.vpcf"
end
function modifier_lina_fiery_soul_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.e1_slow
end

function modifier_lina_fiery_soul_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_lina_fiery_soul_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end