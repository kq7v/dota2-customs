--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_axe_battle_hunger_custom_buff",
	"abilities/axe/axe_battle_hunger_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_battle_hunger_custom_debuff",
	"abilities/axe/axe_battle_hunger_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_axe_battle_hunger_custom_tracker",
	"abilities/axe/axe_battle_hunger_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_battle_hunger_custom_damage_cd",
	"abilities/axe/axe_battle_hunger_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_battle_hunger_custom_slow_resist",
	"abilities/axe/axe_battle_hunger_custom",
	LUA_MODIFIER_MOTION_NONE
)

axe_battle_hunger_custom = class({})
axe_battle_hunger_custom.talents = {}
axe_battle_hunger_custom.active_mod = nil

function axe_battle_hunger_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_doom_bringer/doom_infernal_blade_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_axe/axe_battle_hunger.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf", context)
	PrecacheResource("particle", "particles/axe/hunger_legendary_radius.vpcf", context)
	PrecacheResource("particle", "particles/centaur/edge_pull_cast.vpcf", context)
end

function axe_battle_hunger_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_damage = 0,
			w1_spell = 0,

			has_w2 = 0,
			w2_damage_reduce = 0,
			w2_slow = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_base = 0,
			w3_heal = 0,
			w3_chance = caster:GetTalentValue("modifier_axe_hunger_3", "chance", true),
			w3_talent_cd = caster:GetTalentValue("modifier_axe_hunger_3", "talent_cd", true),
			w3_damage_type = caster:GetTalentValue("modifier_axe_hunger_3", "damage_type", true),

			has_w4 = 0,
			w4_cd = caster:GetTalentValue("modifier_axe_hunger_4", "cd", true),
			w4_knock_duration = caster:GetTalentValue("modifier_axe_hunger_4", "knock_duration", true),
			w4_distance = caster:GetTalentValue("modifier_axe_hunger_4", "distance", true),
			w4_range = caster:GetTalentValue("modifier_axe_hunger_4", "range", true),
			w4_silence = caster:GetTalentValue("modifier_axe_hunger_4", "silence", true),

			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_axe_hunger_7", "duration", true),
			w7_radius = caster:GetTalentValue("modifier_axe_hunger_7", "radius", true),
			w7_damage = caster:GetTalentValue("modifier_axe_hunger_7", "damage", true),
			w7_max = caster:GetTalentValue("modifier_axe_hunger_7", "max", true),

			has_h2 = 0,
			h2_status = 0,
			h2_move = 0,
			h2_bonus = caster:GetTalentValue("modifier_axe_hero_2", "bonus", true),

			has_e4 = 0,
			e4_radius = caster:GetTalentValue("modifier_axe_helix_4", "radius", true),
			e4_slow_resist = caster:GetTalentValue("modifier_axe_helix_4", "slow_resist", true),
		}
	end

	if caster:HasTalent("modifier_axe_hunger_1") then
		self.talents.has_w1 = 1
		self.talents.w1_damage = caster:GetTalentValue("modifier_axe_hunger_1", "damage")
		self.talents.w1_spell = caster:GetTalentValue("modifier_axe_hunger_1", "spell")
	end

	if caster:HasTalent("modifier_axe_hunger_2") then
		self.talents.has_w2 = 1
		self.talents.w2_damage_reduce = caster:GetTalentValue("modifier_axe_hunger_2", "damage_reduce")
		self.talents.w2_slow = caster:GetTalentValue("modifier_axe_hunger_2", "slow")
	end

	if caster:HasTalent("modifier_axe_hunger_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_axe_hunger_3", "damage") / 100
		self.talents.w3_base = caster:GetTalentValue("modifier_axe_hunger_3", "base")
		self.talents.w3_heal = caster:GetTalentValue("modifier_axe_hunger_3", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_axe_hunger_3", type = 1, value = self.talents.w3_heal })
		caster:AddDamageEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_axe_hunger_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_axe_hunger_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_axe_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_status = caster:GetTalentValue("modifier_axe_hero_2", "status")
		self.talents.h2_move = caster:GetTalentValue("modifier_axe_hero_2", "move")
	end

	if caster:HasTalent("modifier_axe_helix_4") then
		self.talents.has_e4 = 1
	end
end

function axe_battle_hunger_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_axe_battle_hunger_custom_tracker"
end

function axe_battle_hunger_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "axe_battle_hunger", self)
end

function axe_battle_hunger_custom:GetAOERadius()
	return self.aoe_radius or 0
end

function axe_battle_hunger_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	if target:TriggerSpellAbsorb(self) then
		return
	end

	local duration = self.talents.has_w7 == 1 and self.talents.w7_duration or (self.duration + 0.1)

	self.active_mod =
		target:AddNewModifier(self.caster, self, "modifier_axe_battle_hunger_custom_debuff", { duration = duration })
	target:EmitSound("Hero_Axe.Battle_Hunger")
end

modifier_axe_battle_hunger_custom_debuff = class(mod_visible)
function modifier_axe_battle_hunger_custom_debuff:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.slow + self.ability.talents.w2_slow
	self.damage = self.ability.damage_per_second + self.ability.talents.w1_damage
	self.aoe_radius = self.ability.aoe_radius

	self.stone_angle = 85
	self.silence_count = self.ability.talents.w4_cd

	self.active_slow = 0

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:AddDeathEvent(self, true)
	self.caster:AddNewModifier(self.caster, self.ability, "modifier_axe_battle_hunger_custom_buff", {})

	self.ability:EndCd()
	self.damageTable =
		{ attacker = self.caster, damage_type = DAMAGE_TYPE_PURE, ability = self.ability, damage = self.damage }

	local particle = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_axe/axe_battle_hunger.vpcf",
		self.ability
	)
	self.parent:GenericParticle(particle, self, true)

	self.interval = 0.2
	self.interval_count = 1

	self:SetHasCustomTransmitterData(true)

	self:StartIntervalThink(self.interval)
	self:OnIntervalThink(true)
end

function modifier_axe_battle_hunger_custom_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.mod) then
		self.mod:Destroy()
	end

	if self.ability.talents.has_w7 == 1 then
		self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "AxeHunger" })
	end

	self.caster:RemoveModifierByName("modifier_axe_battle_hunger_custom_buff")
	self.ability:StartCd()
	self.ability.active_mod = nil
end

function modifier_axe_battle_hunger_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_axe_battle_hunger_custom_debuff:AddCustomTransmitterData()
	return {
		active_slow = self.active_slow,
	}
end

function modifier_axe_battle_hunger_custom_debuff:HandleCustomTransmitterData(data)
	self.active_slow = data.active_slow
end

function modifier_axe_battle_hunger_custom_debuff:GetModifierIncomingDamage_Percentage(params)
	if IsClient() then
		return self.ability.talents.w7_damage * self:GetStackCount()
	end
	if not params.inflictor then
		return
	end
	if not params.attacker then
		return
	end
	if params.attacker:FindOwner() ~= self.caster then
		return
	end

	return self.ability.talents.w7_damage * self:GetStackCount()
end

function modifier_axe_battle_hunger_custom_debuff:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.w2_damage_reduce
end

function modifier_axe_battle_hunger_custom_debuff:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.w2_damage_reduce
end

function modifier_axe_battle_hunger_custom_debuff:DeathEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 1 then
		return
	end
	if params.attacker ~= self.parent then
		return
	end
	self:Destroy()
end

function modifier_axe_battle_hunger_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	if self.active_slow == 0 then
		return
	end
	return self.slow
end

function modifier_axe_battle_hunger_custom_debuff:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	local vec = (self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin())

	if self.caster:GetQuest() == "Axe.Quest_6" and self.parent:IsRealHero() and not self.caster:QuestCompleted() then
		self.caster:UpdateQuest(self.interval)
	end

	if self.caster:IsAlive() then
		if self.ability.talents.has_w7 == 1 and vec:Length2D() <= self.ability.talents.w7_radius then
			self:SetDuration(self.ability.talents.w7_duration, true)
		end

		if self.ability.talents.has_e4 == 1 then
			if vec:Length2D() <= self.ability.talents.e4_radius then
				if not IsValid(self.mod) then
					self.mod = self.caster:AddNewModifier(
						self.caster,
						self.ability,
						"modifier_axe_battle_hunger_custom_slow_resist",
						{}
					)
				end
			elseif IsValid(self.mod) then
				self.mod:Destroy()
				self.mod = nil
			end
		end
	end

	if self.ability.talents.has_w7 == 1 then
		self.caster:UpdateUIshort({
			max_time = self.ability.talents.w7_duration,
			time = self:GetRemainingTime(),
			stack = "+" .. self:GetStackCount() * self.ability.talents.w7_damage .. "%",
			style = "AxeHunger",
		})
	end

	local vector = vec:Normalized()
	local center_angle = VectorToAngles(vector).y
	local facing_angle = VectorToAngles(self.parent:GetForwardVector()).y

	local facing = (math.abs(AngleDiff(center_angle, facing_angle)) > self.stone_angle) and 1 or 0
	if self.active_slow ~= facing then
		self.active_slow = facing
		self:SendBuffRefreshToClients()
	end

	self.interval_count = self.interval_count + self.interval
	if self.interval_count <= 1 - FrameTime() then
		return
	end

	self.interval_count = 0

	if self.ability.talents.has_w4 == 1 then
		self.silence_count = self.silence_count + 1
		if self.silence_count >= self.ability.talents.w4_cd then
			self.silence_count = 0
			self.parent:EmitSound("Sf.Raze_Silence")
			self.parent:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_generic_silence",
				{ duration = (1 - self.parent:GetStatusResistance()) * self.ability.talents.w4_silence }
			)

			if first or vec:Length2D() <= self.ability.talents.w4_range then
				self.parent:EmitSound("Axe.Hunger_pull")
				self.caster:PullTarget(
					self.parent,
					self.ability,
					self.ability.talents.w4_knock_duration,
					false,
					false,
					false,
					self.ability.talents.w4_distance
				)

				local chain_effect = ParticleManager:CreateParticle(
					"particles/centaur/edge_pull_cast.vpcf",
					PATTACH_CUSTOMORIGIN_FOLLOW,
					self.parent
				)
				ParticleManager:SetParticleControlEnt(
					chain_effect,
					1,
					self.caster,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.caster:GetOrigin(),
					true
				)
				ParticleManager:SetParticleControlEnt(
					chain_effect,
					3,
					self.parent,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.parent:GetOrigin(),
					true
				)
				ParticleManager:ReleaseParticleIndex(chain_effect)
			end
		end
	end

	if self.ability.talents.has_w7 == 1 and self:GetStackCount() < self.ability.talents.w7_max and not first then
		self:IncrementStackCount()
	end

	for _, target in pairs(self.caster:FindTargets(self.aoe_radius, self.parent:GetAbsOrigin())) do
		self.damageTable.victim = target
		DoDamage(self.damageTable)
	end
end

modifier_axe_battle_hunger_custom_buff = class(mod_hidden)
function modifier_axe_battle_hunger_custom_buff:RemoveOnDeath()
	return false
end
function modifier_axe_battle_hunger_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	if self.ability.talents.has_h2 == 1 then
		self.parent:GenericParticle("particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf", self)
	end

	if self.ability.talents.has_w7 == 1 then
		self.radius_visual = ParticleManager:CreateParticleForPlayer(
			"particles/axe/hunger_legendary_radius.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent,
			self.parent:GetPlayerOwner()
		)
		ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(self.radius_visual, 1, Vector(self.ability.talents.w7_radius, 0, 0))
		self:AddParticle(self.radius_visual, false, false, -1, false, false)
	end
end

function modifier_axe_battle_hunger_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_axe_battle_hunger_custom_buff:GetModifierStatusResistanceStacking()
	return self.ability.talents.h2_status
end

modifier_axe_battle_hunger_custom_tracker = class(mod_hidden)
function modifier_axe_battle_hunger_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.damage_per_second = self.ability:GetSpecialValueFor("damage_per_second")
	self.ability.aoe_radius = self.ability:GetSpecialValueFor("aoe_radius")

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
end

function modifier_axe_battle_hunger_custom_tracker:OnRefresh(table)
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.damage_per_second = self.ability:GetSpecialValueFor("damage_per_second")
end

function modifier_axe_battle_hunger_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.ability.active_mod) then
		if not self.ability:IsActivated() then
			self.ability:StartCd()
		end
		self.parent:RemoveModifierByName("modifier_axe_battle_hunger_custom_buff")
	end
end

function modifier_axe_battle_hunger_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	local unit = params.unit
	if not unit:HasModifier("modifier_axe_battle_hunger_custom_debuff") then
		return
	end
	if params.attacker ~= self.parent then
		return
	end
	if ReflectedDamage(params) then
		return
	end
	if self.ability.talents.has_w3 == 0 then
		return
	end
	if unit:HasModifier("modifier_axe_battle_hunger_custom_damage_cd") then
		return
	end
	if not RollPseudoRandomPercentage(self.ability.talents.w3_chance, 6123, self.parent) then
		return
	end

	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_axe_battle_hunger_custom_damage_cd",
		{ duration = self.ability.talents.w3_talent_cd }
	)
	unit:GenericParticle("particles/units/heroes/hero_doom_bringer/doom_infernal_blade_impact.vpcf")
	unit:EmitSound("Axe.Hunger_damage")

	local damage = self.ability.talents.w3_base + self.ability.talents.w3_damage * self.parent:GetMaxHealth()
	local damageTable = {
		attacker = self.parent,
		ability = self.ability,
		victim = unit,
		damage = damage,
		damage_type = self.ability.talents.w3_damage_type,
	}
	local real_damage = DoDamage(damageTable, "modifier_axe_hunger_3")
	unit:SendNumber(6, real_damage)
end

function modifier_axe_battle_hunger_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_axe_battle_hunger_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.w1_spell
end

function modifier_axe_battle_hunger_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
		* (self.parent:HasModifier("modifier_axe_battle_hunger_custom_buff") and self.ability.talents.h2_bonus or 1)
end

modifier_axe_battle_hunger_custom_damage_cd = class(mod_hidden)

modifier_axe_battle_hunger_custom_slow_resist = class(mod_hidden)
function modifier_axe_battle_hunger_custom_slow_resist:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_axe_battle_hunger_custom_slow_resist:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_axe_battle_hunger_custom_slow_resist:GetModifierSlowResistance_Stacking()
	return self.ability.talents.e4_slow_resist
end