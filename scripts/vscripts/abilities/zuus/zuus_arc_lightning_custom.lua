--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_zuus_arc_lightning_custom",
	"abilities/zuus/zuus_arc_lightning_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_arc_lightning_tracker",
	"abilities/zuus/zuus_arc_lightning_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_arc_lightning_custom_legendary",
	"abilities/zuus/zuus_arc_lightning_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_zuus_arc_7"
)
LinkLuaModifier(
	"modifier_zuus_arc_lightning_custom_legendary_cast",
	"abilities/zuus/zuus_arc_lightning_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_arc_lightning_custom_slow",
	"abilities/zuus/zuus_arc_lightning_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_zuus_arc_2", "modifier_zuus_arc_4" }
)
LinkLuaModifier(
	"modifier_zuus_arc_lightning_custom_legendary_damage",
	"abilities/zuus/zuus_arc_lightning_custom",
	LUA_MODIFIER_MOTION_NONE
)

zuus_arc_lightning_custom = class({})
zuus_arc_lightning_custom.talents = {}

function zuus_arc_lightning_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/z_w.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_arc_lightning_head.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_arc_lightning.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_shard.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_speed.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/zeus/arcana_chariot/zeus_arcana_blink_end.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_vengeful/vengeful_swap_buff_overhead.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_shield_wrath.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/zeus/zeus_ti8_immortal_arms/zeus_ti8_immortal_arc.vpcf", context)
	PrecacheResource("particle", "particles/zeus/arc_legendary_active.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
		context
	)
	PrecacheResource("particle", "particles/zeus/arc_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_lightning_bolt.vpcf", context)
end

function zuus_arc_lightning_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_damage = 0,
			q1_damage_legendary = 0,
			q1_attack = 0,

			has_q2 = 0,
			q2_move = 0,
			q2_slow = 0,
			q2_duration = caster:GetTalentValue("modifier_zuus_arc_2", "duration", true),
			q2_max = caster:GetTalentValue("modifier_zuus_arc_2", "max", true),

			has_q3 = 0,
			q3_cd = 0,
			q3_chance = 0,
			q3_delay = caster:GetTalentValue("modifier_zuus_arc_3", "delay", true),

			has_q4 = 0,
			q4_duration = caster:GetTalentValue("modifier_zuus_arc_4", "duration", true),
			q4_damage_reduce = caster:GetTalentValue("modifier_zuus_arc_4", "damage_reduce", true),
			q4_cast = caster:GetTalentValue("modifier_zuus_arc_4", "cast", true),
			q4_heal = caster:GetTalentValue("modifier_zuus_arc_4", "heal", true) / 100,
			q4_max = caster:GetTalentValue("modifier_zuus_arc_4", "max", true),

			has_q7 = 0,
			q7_max = caster:GetTalentValue("modifier_zuus_arc_7", "max", true),
			q7_damage = caster:GetTalentValue("modifier_zuus_arc_7", "damage", true),
			q7_active_damage = caster:GetTalentValue("modifier_zuus_arc_7", "active_damage", true) / 100,
			q7_cd = caster:GetTalentValue("modifier_zuus_arc_7", "cd", true),
			q7_duration = caster:GetTalentValue("modifier_zuus_arc_7", "duration", true),
			q7_interval = caster:GetTalentValue("modifier_zuus_arc_7", "interval", true),
			q7_charge = caster:GetTalentValue("modifier_zuus_arc_7", "charge", true),
			q7_radius = caster:GetTalentValue("modifier_zuus_arc_7", "radius", true),
			q7_mana = caster:GetTalentValue("modifier_zuus_arc_7", "mana", true) / 100,
		}
	end

	if caster:HasTalent("modifier_zuus_arc_1") then
		self.talents.has_q1 = 1
		self.talents.q1_damage = caster:GetTalentValue("modifier_zuus_arc_1", "damage") / 100
		self.talents.q1_damage_legendary = caster:GetTalentValue("modifier_zuus_arc_1", "damage_legendary")
		self.talents.q1_attack = caster:GetTalentValue("modifier_zuus_arc_1", "attack")
	end

	if caster:HasTalent("modifier_zuus_arc_2") then
		self.talents.has_q2 = 1
		self.talents.q2_move = caster:GetTalentValue("modifier_zuus_arc_2", "move")
		self.talents.q2_slow = caster:GetTalentValue("modifier_zuus_arc_2", "slow")
	end

	if caster:HasTalent("modifier_zuus_arc_3") then
		self.talents.has_q3 = 1
		self.talents.q3_cd = caster:GetTalentValue("modifier_zuus_arc_3", "cd")
		self.talents.q3_chance = caster:GetTalentValue("modifier_zuus_arc_3", "chance")
		caster:AddProc(self.tracker, { group = "modifier_zuus_arc_3", extra = false, land = true })
	end

	if caster:HasTalent("modifier_zuus_arc_4") then
		self.talents.has_q4 = 1
		caster:AddLifesteal(self.tracker, { name = "modifier_zuus_arc_4", type = 2, value = self.talents.q4_heal })
	end

	if caster:HasTalent("modifier_zuus_arc_7") then
		self.talents.has_q7 = 1
	end
end

function zuus_arc_lightning_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "zuus_arc_lightning", self)
end

function zuus_arc_lightning_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_zuus_arc_lightning_tracker"
end

function zuus_arc_lightning_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q3_cd or 0)
end

function zuus_arc_lightning_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) * (1 + (self.talents.has_q7 == 1 and self.talents.q7_mana or 0))
end

function zuus_arc_lightning_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_q4 == 1 and self.talents.q4_cast or 0)
end

function zuus_arc_lightning_custom:GetBehavior()
	local bonus = 0
	if self.talents.has_q7 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + bonus
end

function zuus_arc_lightning_custom:OnSpellStart(new_target)
	local target = self:GetCursorTarget()

	if new_target then
		target = new_target
	else
		if target:TriggerSpellAbsorb(self) then
			return
		end
	end

	if
		self.caster:GetQuest() == "Zuus.Quest_5"
		and target:IsRealHero()
		and not self.caster:QuestCompleted()
		and (self.caster:GetAbsOrigin() - target:GetAbsOrigin()):Length2D() >= self.caster.quest.number
	then
		self.caster:UpdateQuest(1)
	end

	if self.caster.jump_ability then
		self.caster.jump_ability:LegendaryStack(target:IsRealHero())
	end

	self.caster:EmitSound("Hero_Zuus.ArcLightning.Cast")

	local head_name_part = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_zuus/zuus_arc_lightning_head.vpcf",
		self
	)
	local head_particle = ParticleManager:CreateParticle(head_name_part, PATTACH_ABSORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		head_particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		head_particle,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(head_particle)

	if self.talents.has_q7 == 1 then
		if target:IsHero() then
			self.caster:AddNewModifier(
				self.caster,
				self,
				"modifier_zuus_arc_lightning_custom_legendary",
				{ duration = self.talents.q7_duration }
			)
		end

		if self.caster.jump_ability then
			self.caster.jump_ability:ProcEffects(target)
		end
	end

	if new_target then
		self:DoDamage(target, "modifier_zuus_arc_3")
		return
	end

	if self.caster.wrath_ability then
		self.caster.wrath_ability:CreateCloud(target:GetAbsOrigin())
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_zuus_arc_lightning_custom", { target = target:entindex() })
end

function zuus_arc_lightning_custom:CheckToggle()
	local shield = self.caster:FindModifierByName("modifier_zuus_arc_lightning_custom_legendary")
	if not shield or shield:GetStackCount() == 0 then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetPlayerOwnerID()),
			"CreateIngameErrorMessage",
			{ message = "#dota_hud_error_no_charges" }
		)
		return false
	end
	return true
end

function zuus_arc_lightning_custom:DoDamage(target, damage_ability)
	if self.caster.static_ability then
		self.caster.static_ability:DealDamage(target)
	end

	if self.talents.has_q7 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_zuus_arc_lightning_custom_legendary_damage",
			{ damage_ability = damage_ability }
		)
		self.caster:PerformAttack(target, true, true, true, true, false, false, true)
		self.caster:RemoveModifierByName("modifier_zuus_arc_lightning_custom_legendary_damage")
	else
		local arc_damage = self.arc_damage + self.caster:GetAverageTrueAttackDamage(nil) * self.talents.q1_damage
		DoDamage(
			{
				attacker = self.caster,
				ability = self,
				victim = target,
				damage_type = DAMAGE_TYPE_MAGICAL,
				damage = arc_damage,
			},
			damage_ability
		)
	end

	if self.talents.has_q2 == 1 or self.talents.has_q4 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_zuus_arc_lightning_custom_slow",
			{ duration = self.talents.has_q2 == 1 and self.talents.q2_duration or self.talents.q4_duration }
		)
	end

	target:EmitSound("Hero_Zuus.ArcLightning.Target")
end

function zuus_arc_lightning_custom:ProcAttack(target, is_proc)
	if not IsServer() then
		return
	end
	if self.talents.has_q3 == 0 then
		return
	end
	if not is_proc and not RollPseudoRandomPercentage(self.talents.q3_chance, "modifier_zuus_arc_3", self.caster) then
		return
	end
	self:OnSpellStart(target)
	target:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")
end

modifier_zuus_arc_lightning_custom = class(mod_hidden)
function modifier_zuus_arc_lightning_custom:RemoveOnDeath()
	return false
end
function modifier_zuus_arc_lightning_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_zuus_arc_lightning_custom:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.radius
	self.jump_count = self.ability.jump_count
	self.jump_delay = self.ability.jump_delay
	self.current_unit = EntIndexToHScript(params.target)
	self.units_affected = {}
	self.unit_counter = 0

	self.ligth_particle = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_zuus/zuus_arc_lightning.vpcf",
		self
	)

	if not IsValid(self.current_unit) then
		return
	end

	if self.ability.talents.has_q7 == 1 then
		local target = self.current_unit
		Timers:CreateTimer(self.ability.talents.q3_delay, function()
			if IsValid(target) then
				self.ability:ProcAttack(target)
			end
		end)
	end

	self.units_affected[self.current_unit] = 1

	self.ability:DoDamage(self.current_unit)
	self:StartIntervalThink(self.jump_delay)
end

function modifier_zuus_arc_lightning_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.current_unit) then
		self:Destroy()
		return
	end

	self.zapped = false

	for _, enemy in
		pairs(
			self.parent:FindTargets(
				self.radius,
				self.current_unit:GetAbsOrigin(),
				FIND_CLOSEST,
				DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS
			)
		)
	do
		if not self.units_affected[enemy] and enemy ~= self.current_unit and enemy:IsUnit() then
			local lightning_particle =
				ParticleManager:CreateParticle(self.ligth_particle, PATTACH_ABSORIGIN_FOLLOW, self.current_unit)
			ParticleManager:SetParticleControlEnt(
				lightning_particle,
				0,
				self.current_unit,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.current_unit:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				lightning_particle,
				1,
				enemy,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				enemy:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(lightning_particle)
			enemy:EmitSound("Hero_Zuus.ArcLightning.Target")

			self.unit_counter = self.unit_counter + 1
			self.current_unit = enemy
			self.zapped = true

			self.units_affected[self.current_unit] = true
			self.ability:DoDamage(enemy)
			break
		end
	end

	if (self.unit_counter >= self.jump_count and self.jump_count > 0) or not self.zapped then
		self:StartIntervalThink(-1)
		self:Destroy()
	end
end

modifier_zuus_arc_lightning_tracker = class(mod_hidden)
function modifier_zuus_arc_lightning_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.arc_ability = self.ability

	self.ability.arc_damage = self.ability:GetSpecialValueFor("arc_damage")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.jump_count = self.ability:GetSpecialValueFor("jump_count")
	self.ability.jump_delay = self.ability:GetSpecialValueFor("jump_delay")
end

function modifier_zuus_arc_lightning_tracker:OnRefresh()
	self.ability.arc_damage = self.ability:GetSpecialValueFor("arc_damage")
	self.ability.jump_count = self.ability:GetSpecialValueFor("jump_count")
end

function modifier_zuus_arc_lightning_tracker:GetProcChance()
	return self.ability.talents.q3_chance
end

function modifier_zuus_arc_lightning_tracker:AttackProc(params)
	self.ability:ProcAttack(params.target, true)
end

function modifier_zuus_arc_lightning_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_zuus_arc_lightning_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.q2_move
end

function modifier_zuus_arc_lightning_tracker:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.q1_attack
end

modifier_zuus_arc_lightning_custom_legendary = class(mod_hidden)
function modifier_zuus_arc_lightning_custom_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.q7_radius
	self.interval = self.ability.talents.q7_interval
	self.max = self.ability.talents.q7_max
	self.active = false
	self.RemoveForDuel = true

	self.visual_max = 5
	self.particle = self.parent:GenericParticle("particles/zeus/arc_legendary_stack.vpcf", self, true)

	self.max_time = self:GetRemainingTime()

	self:SetStackCount(1)
	self:OnIntervalThink()
	self:StartIntervalThink(0.15)
end

function modifier_zuus_arc_lightning_custom_legendary:OnRefresh()
	if not IsServer() then
		return
	end
	if self.active == true then
		return
	end
	self.max_time = self:GetRemainingTime()

	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_zuus_arc_lightning_custom_legendary:OnStackCountChanged()
	if not IsServer() then
		return
	end
	if not self.particle then
		return
	end

	for i = 1, self.visual_max do
		if i <= math.floor(self:GetStackCount() / (self.max / self.visual_max)) then
			ParticleManager:SetParticleControl(self.particle, i, Vector(1, 0, 0))
		else
			ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
		end
	end
end

function modifier_zuus_arc_lightning_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.active then
		self.parent:EmitSound("Hero_Zuus.ArcLightning.Cast")
		self.parent:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")

		for _, unit in pairs(self.parent:FindTargets(self.radius)) do
			self.ability:DoDamage(unit, "modifier_zuus_arc_7")

			local lightning_particle = ParticleManager:CreateParticle(
				"particles/econ/items/zeus/zeus_ti8_immortal_arms/zeus_ti8_immortal_arc.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				lightning_particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				lightning_particle,
				1,
				unit,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				unit:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(lightning_particle)

			unit:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")
			unit:EmitSound("Item.Maelstrom.Chain_Lightning.Jump")
		end
		for i = 1, 4 do
			local point = self.parent:GetAbsOrigin() + RandomVector(RandomInt(100, self.radius))
			local lightning_particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_zuus/zuus_arc_lightning.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				lightning_particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControl(lightning_particle, 1, point)
			ParticleManager:ReleaseParticleIndex(lightning_particle)
		end

		self:DecrementStackCount()
		if self:GetStackCount() <= 0 then
			self:Destroy()
			return
		else
			self:StartIntervalThink(self.interval)
		end
	else
		self.parent:UpdateUIshort({
			max_time = self.max_time,
			time = self:GetRemainingTime(),
			stack = self:GetStackCount(),
			active = self:GetStackCount() >= self.max and 1 or 0,
			style = "ZeusArc",
		})
	end
end

function modifier_zuus_arc_lightning_custom_legendary:Activate()
	if not IsServer() then
		return
	end
	self.active = true

	self:SetDuration(9999, true)
	self.parent:EmitSound("Zuus.Arc_legendary_start")
	self.parent:EmitSound("Zuus.Arc_legendary_start2")

	local line_position = self.parent:GetAbsOrigin() + self.parent:GetForwardVector() * self.radius * 0.85
	local max = 5

	for i = 1, max do
		local qangle = QAngle(0, 360 / (max - 1) + RandomInt(-25, 25), 0)
		line_position = RotatePosition(self.parent:GetAbsOrigin(), qangle, line_position)

		if i >= max then
			line_position = self.parent:GetAbsOrigin()
		end

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_zuus/zuus_lightning_bolt.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(particle, 0, Vector(line_position.x, line_position.y, 3000))
		ParticleManager:SetParticleControl(particle, 1, Vector(line_position.x, line_position.y, line_position.z))
		ParticleManager:ReleaseParticleIndex(particle)
	end

	self.zuus_nimbus_particle = ParticleManager:CreateParticle(
		"particles/zeus/arc_legendary_active.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 1, Vector(self.radius, 0, 0))
	self:AddParticle(self.zuus_nimbus_particle, false, false, -1, false, false)

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "ZeusArc" })
	self:OnIntervalThink()
end

function modifier_zuus_arc_lightning_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_zuus_arc_lightning_custom_legendary:GetModifierModelScale()
	return self:GetStackCount() * 4
end

function modifier_zuus_arc_lightning_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	if self.active then
		self.parent:EmitSound("Zuus.Arc_legendary_end")
	end

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "ZeusArc" })
end

modifier_zuus_arc_lightning_custom_legendary_cast = class(mod_hidden)
function modifier_zuus_arc_lightning_custom_legendary_cast:RemoveOnDeath()
	return false
end
function modifier_zuus_arc_lightning_custom_legendary_cast:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	local shield = self.parent:FindModifierByName("modifier_zuus_arc_lightning_custom_legendary")
	if shield then
		shield:Activate()
		self.ability:EndCd(0)
		self.ability:StartCooldown(self.ability.talents.q7_cd)
	end

	self.ability:ToggleAutoCast()
	self:Destroy()
end

modifier_zuus_arc_lightning_custom_slow = class(mod_visible)
function modifier_zuus_arc_lightning_custom_slow:GetTexture()
	return "buffs/zeus/arc_4"
end
function modifier_zuus_arc_lightning_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.max = self.ability.talents.has_q2 == 1 and self.ability.talents.q2_max or self.ability.talents.q4_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_zuus_arc_lightning_custom_slow:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf", self)
	end
end

function modifier_zuus_arc_lightning_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_zuus_arc_lightning_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self:GetStackCount() * self.ability.talents.q2_slow
end

function modifier_zuus_arc_lightning_custom_slow:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self:GetStackCount() * self.ability.talents.q4_damage_reduce
end

function modifier_zuus_arc_lightning_custom_slow:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self:GetStackCount() * self.ability.talents.q4_damage_reduce
end

modifier_zuus_arc_lightning_custom_legendary_damage = class(mod_hidden)
function modifier_zuus_arc_lightning_custom_legendary_damage:OnCreated(params)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()

	if params.damage_ability then
		self.damage_ability = params.damage_ability
	end

	self.damage = self.ability.talents.q7_damage + self.ability.talents.q1_damage_legendary
	if self.damage_ability == "modifier_zuus_arc_7" then
		self.damage = self.damage * self.ability.talents.q7_active_damage
	end
	self.damage = self.damage - 100
end

function modifier_zuus_arc_lightning_custom_legendary_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_zuus_arc_lightning_custom_legendary_damage:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end