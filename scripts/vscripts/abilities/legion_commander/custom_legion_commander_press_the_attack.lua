--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_press_the_attack_custom_buff",
	"abilities/legion_commander/custom_legion_commander_press_the_attack",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_press_the_attack_custom_root",
	"abilities/legion_commander/custom_legion_commander_press_the_attack",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_press_4"
)
LinkLuaModifier(
	"modifier_press_the_attack_custom_legendary",
	"abilities/legion_commander/custom_legion_commander_press_the_attack",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_press_the_attack_custom_burn_effect",
	"abilities/legion_commander/custom_legion_commander_press_the_attack",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_press_the_attack_custom_tracker",
	"abilities/legion_commander/custom_legion_commander_press_the_attack",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_press_the_attack_custom_proc_damage",
	"abilities/legion_commander/custom_legion_commander_press_the_attack",
	LUA_MODIFIER_MOTION_NONE
)

custom_legion_commander_press_the_attack = class({})
custom_legion_commander_press_the_attack.talents = {}

function custom_legion_commander_press_the_attack:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_legion_commander/legion_commander_press_halo.vpcf",
		context
	)
	PrecacheResource("particle", "particles/legion_commander/lc_wave.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/fall_2022/radiance/radiance_owner_fall2022.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_legion_commander/legion_commander_press.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_legion_commander/legion_commander_press_owner.vpcf",
		context
	)
	PrecacheResource("particle", "particles/legion_commander/lc_root.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/press_legendary_buff.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_press_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_dispel_magic.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/fall_2022/radiance_target_fall2022.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/press_legendary_radius.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_legion_commander/legion_commander_press_the_attack_aoe.vpcf",
		context
	)
	PrecacheResource("particle", "particles/legion_commander/press_legendary_aoe.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_invoker/invoker_chaos_meteor_burn_debuff.vpcf", context)
	PrecacheResource("particle", "particles/items7_fx/misrule_focus.vpcf", context)
end

function custom_legion_commander_press_the_attack:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_damage = 0,
			w1_magic = 0,

			w2_duration = 0,
			w2_heal = 0,
			w2_duration_legendary = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_heal = 0,
			w3_duration = caster:GetTalentValue("modifier_legion_press_3", "duration", true),
			w3_talent_cd = caster:GetTalentValue("modifier_legion_press_3", "talent_cd", true),

			has_w4 = 0,
			w4_cd = caster:GetTalentValue("modifier_legion_press_4", "cd", true),
			w4_root = caster:GetTalentValue("modifier_legion_press_4", "root", true),
			w4_pull_distance = caster:GetTalentValue("modifier_legion_press_4", "pull_distance", true),
			w4_root_cd = caster:GetTalentValue("modifier_legion_press_4", "root_cd", true),
			w4_pull_duration = caster:GetTalentValue("modifier_legion_press_4", "pull_duration", true),
			w4_radius = caster:GetTalentValue("modifier_legion_press_4", "radius", true),

			has_w7 = 0,
			w7_max = caster:GetTalentValue("modifier_legion_press_7", "max", true),
			w7_duration = caster:GetTalentValue("modifier_legion_press_7", "duration", true),
			w7_linger_duration = caster:GetTalentValue("modifier_legion_press_7", "linger_duration", true),
			w7_damage = caster:GetTalentValue("modifier_legion_press_7", "damage", true),

			has_h5 = 0,
			h5_cd = caster:GetTalentValue("modifier_legion_hero_5", "cd", true),
			h5_bkb = caster:GetTalentValue("modifier_legion_hero_5", "bkb", true),

			has_q2 = 0,
			q2_radius_press = 0,

			has_q4 = 0,
			q4_cd_items_legendary = caster:GetTalentValue("modifier_legion_odds_4", "cd_items_legendary", true),
			q4_cd_items = caster:GetTalentValue("modifier_legion_odds_4", "cd_items", true),

			has_q7 = 0,
		}
	end

	if caster:HasTalent("modifier_legion_press_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_legion_press_1", "damage") / 100
		self.talents.w1_magic = caster:GetTalentValue("modifier_legion_press_1", "magic")
	end

	if caster:HasTalent("modifier_legion_press_2") then
		self.talents.w2_duration = caster:GetTalentValue("modifier_legion_press_2", "duration")
		self.talents.w2_heal = caster:GetTalentValue("modifier_legion_press_2", "heal") / 100
		self.talents.w2_duration_legendary = caster:GetTalentValue("modifier_legion_press_2", "duration_legendary")
	end

	if caster:HasTalent("modifier_legion_press_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_legion_press_3", "damage") / 100
		self.talents.w3_heal = caster:GetTalentValue("modifier_legion_press_3", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_legion_press_3", type = 1, value = self.talents.w3_heal })
	end

	if caster:HasTalent("modifier_legion_press_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_legion_press_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_legion_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_legion_odds_2") then
		self.talents.has_q2 = 1
		self.talents.q2_radius_press = caster:GetTalentValue("modifier_legion_odds_2", "radius_press")
	end

	if caster:HasTalent("modifier_legion_odds_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_legion_odds_7") then
		self.talents.has_q7 = 1
	end
end

function custom_legion_commander_press_the_attack:GetAbilityTextureName()
	if
		self.talents.has_w7 == 1
		and self.parent:HasModifier("modifier_press_the_attack_custom_buff")
		and not self.parent:HasModifier("modifier_press_the_attack_custom_legendary")
	then
		return "legion_commander_outfight_them"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "legion_commander_press_the_attack", self)
end

function custom_legion_commander_press_the_attack:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_press_the_attack_custom_tracker"
end

function custom_legion_commander_press_the_attack:GetBehavior()
	local bonus = 0
	if
		self.talents.has_w7 == 1
		and self.parent:HasModifier("modifier_press_the_attack_custom_buff")
		and not self.parent:HasModifier("modifier_press_the_attack_custom_legendary")
	then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
	end
	if self.talents.has_h5 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + bonus
end

function custom_legion_commander_press_the_attack:GetManaCost(level)
	if
		self.talents.has_w7 == 1
		and self.parent:HasModifier("modifier_press_the_attack_custom_buff")
		and not self.parent:HasModifier("modifier_press_the_attack_custom_legendary")
	then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function custom_legion_commander_press_the_attack:GetRadius()
	return (self.radius or 0) + (self.talents.has_q2 == 1 and self.talents.q2_radius_press or 0)
end

function custom_legion_commander_press_the_attack:GetCastRange(vLocation, hTarget)
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function custom_legion_commander_press_the_attack:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.has_w4 == 1 and self.talents.w4_cd or 0)
end

function custom_legion_commander_press_the_attack:GetDamage()
	local damage = (self.damage + self.caster:GetMaxHealth() * self.talents.w1_damage)
	local mod = self.caster:FindModifierByName("modifier_press_the_attack_custom_buff")
	if mod and mod.active then
		damage = damage * (1 + mod:GetStackCount() * self.talents.w7_damage / 100)
	end
	return damage
end

function custom_legion_commander_press_the_attack:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_press_the_attack_custom_buff")
	if
		self.talents.has_w7 == 1
		and mod
		and not self.parent:HasModifier("modifier_press_the_attack_custom_legendary")
	then
		mod.active = true
		mod:SetDuration(self.talents.w7_linger_duration + 0.1, true)
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_press_the_attack_custom_legendary",
			{ duration = self.talents.w7_linger_duration + 0.1 }
		)
		self:EndCd()
		return
	end

	local target = self.caster
	if self:GetCursorTarget() then
		target = self:GetCursorTarget()
	end

	if self.caster == target then
		self.caster:SetPoseParameter("capture_progress_0_to_1", 1)
		self.caster:SetPoseParameter("run_haste_turns", 1)
	end

	self.caster:GenericParticle("particles/units/heroes/hero_legion_commander/legion_commander_press_halo.vpcf")

	local before = #target:FindAllModifiers()
	target:Purge(false, true, false, true, true)
	local after = #target:FindAllModifiers()

	if self.caster:GetQuest() == "Legion.Quest_6" and after < before then
		self.caster:UpdateQuest(1)
	end

	local duration = self.duration + self.talents.w2_duration
	if self.talents.has_w7 == 1 then
		duration = self.talents.w7_duration + self.talents.w2_duration_legendary
	end
	target:EmitSound("Hero_LegionCommander.PressTheAttack")
	target:AddNewModifier(self.caster, self, "modifier_press_the_attack_custom_buff", { duration = duration })
end

function custom_legion_commander_press_the_attack:ProcRoot(target, new_point)
	if not IsServer() then
		return
	end
	local point
	if new_point then
		point = new_point + Vector(0, 0, 60)
	else
		point = target:GetAbsOrigin()
	end

	local wave_particle =
		ParticleManager:CreateParticle("particles/legion_commander/lc_wave.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControl(wave_particle, 1, point)
	ParticleManager:ReleaseParticleIndex(wave_particle)

	for _, enemy in pairs(self.caster:FindTargets(self.talents.w4_radius, point)) do
		local dir = enemy:GetAbsOrigin() - point

		local vec = dir:Normalized()
		if enemy:GetAbsOrigin() == point then
			vec = enemy:GetForwardVector()
		end
		vec.z = 0

		local point = point + vec * self.talents.w4_pull_distance
		local distance = (point - enemy:GetAbsOrigin()):Length2D()

		if dir:Length2D() <= self.talents.w4_pull_distance then
			distance = 0
		end

		local arc = enemy:AddNewModifier(self.caster, self, "modifier_generic_arc", {
			target_x = point.x,
			target_y = point.y,
			distance = distance,
			duration = self.talents.w4_pull_duration,
			height = 0,
			fix_end = false,
			isStun = false,
			activity = ACT_DOTA_FLAIL,
		})

		if arc then
			arc:SetEndCallback(function()
				if IsValid(enemy) then
					enemy:AddNewModifier(
						self.caster,
						self,
						"modifier_press_the_attack_custom_root",
						{ duration = (1 - enemy:GetStatusResistance()) * self.talents.w4_root }
					)
					enemy:EmitSound("Lc.Press_Root")
				end
			end)
		end
	end
end

function custom_legion_commander_press_the_attack:ProcDamage(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end
	if not target:IsUnit() then
		return
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return
	end
	if not target:CheckCd("lc_burn", self.talents.w3_talent_cd) then
		return
	end

	target:EmitSound("Lc.Press_proc")

	local hit_effect =
		ParticleManager:CreateParticle("particles/items7_fx/misrule_focus.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControl(hit_effect, 1, Vector(150, 0, 0))
	ParticleManager:ReleaseParticleIndex(hit_effect)

	target:AddNewModifier(self.caster, self, "modifier_press_the_attack_custom_proc_damage", {})
end

modifier_press_the_attack_custom_buff = class(mod_visible)
function modifier_press_the_attack_custom_buff:IsAura()
	return IsServer() and self.parent:IsAlive()
end
function modifier_press_the_attack_custom_buff:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_press_the_attack_custom_buff:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_press_the_attack_custom_buff:GetAuraRadius()
	return self.radius
end
function modifier_press_the_attack_custom_buff:GetAuraDuration()
	return 0
end
function modifier_press_the_attack_custom_buff:GetModifierAura()
	return "modifier_press_the_attack_custom_burn_effect"
end
function modifier_press_the_attack_custom_buff:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = self.ability:GetRadius()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.ability:EndCd(self.ability.talents.has_w7 == 1 and 0.5 or nil)

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_legion_commander/legion_commander_press.vpcf",
		self.ability
	)
	if self.parent == self.caster then
		particle_name = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_legion_commander/legion_commander_press_owner.vpcf",
			self.ability
		)
	end

	if
		particle_name ~= "particles/units/heroes/hero_legion_commander/legion_commander_press.vpcf"
		and particle_name ~= "particles/units/heroes/hero_legion_commander/legion_commander_press_owner.vpcf"
	then
		self.caster:AddActivityModifier("self")
		self.caster:StartGesture(ACT_SCRIPT_CUSTOM_0)
	end

	self.cast = ParticleManager:CreateParticle(particle_name, PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.cast,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.cast,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.cast, false, false, -1, false, false)

	self.interval = FrameTime() * 3

	if self.ability.talents.has_w7 == 1 then
		self.parent:EmitSound("Lc.Press_burn")

		self.timer = 0
		self.max_time = self:GetRemainingTime()

		self.radius_visual = ParticleManager:CreateParticleForPlayer(
			"particles/legion_commander/press_legendary_radius.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent,
			self.parent:GetPlayerOwner()
		)
		ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(self.radius_visual, 1, Vector(self.radius, 0, 0))
		self:AddParticle(self.radius_visual, false, false, -1, false, false)
	else
		self:ProcEffects()
	end

	self.items_timer = 0
	self.items_max = 1

	if self.ability.talents.has_w7 == 0 and self.ability.talents.has_q4 == 0 then
		return
	end
	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval)
end

function modifier_press_the_attack_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:RemoveGesture(ACT_SCRIPT_CUSTOM_0)

	self.parent:StopSound("Lc.Press_burn")
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "LegionPress", priority = 1 })
end

function modifier_press_the_attack_custom_buff:ProcEffects()
	if not IsServer() then
		return
	end
	local legendary = self.ability.talents.has_w7 == 1

	if
		self.ability.talents.has_w4 == 1
		and (self.ability.talents.has_q7 == 0 or legendary)
		and (not legendary or self.parent:CheckCd("lc_root", self.ability.talents.w4_root_cd))
	then
		self.ability:ProcRoot(self.parent)
	end
	if
		self.ability.talents.has_h5 == 1
		and (not legendary or self.parent:CheckCd("lc_bkb", self.ability.talents.h5_cd))
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ duration = self.ability.talents.h5_bkb, effect = 2, sound = 1 }
		)
	end
end

function modifier_press_the_attack_custom_buff:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	if self.ability.talents.has_q4 == 1 then
		self.items_timer = self.items_timer + self.interval
		if self.items_timer >= (1 - FrameTime()) then
			self.items_timer = 0
			self.parent:CdItems(
				self.ability.talents.has_w7 == 1 and self.ability.talents.q4_cd_items_legendary
					or self.ability.talents.q4_cd_items,
				"modifier_legion_odds_4"
			)
		end
	end

	if self.ability.talents.has_w7 == 0 then
		return
	end

	self:ProcEffects()

	local stack = self:GetStackCount()
	local time = self:GetRemainingTime()
	local max_time = self.max_time
	if self.active then
		local mod = self.parent:FindModifierByName("modifier_press_the_attack_custom_legendary")
		if mod then
			stack = "+" .. (self:GetStackCount() * self.ability.talents.w7_damage) .. "%"
			time = mod:GetRemainingTime()
			max_time = self.ability.talents.w7_linger_duration
		else
			self:Destroy()
			return
		end
	else
		local targets = self.parent:FindTargets(self.radius)
		if #targets > 0 then
			self:SetDuration(self.max_time, true)

			if self:GetStackCount() < self.ability.talents.w7_max then
				for _, target in pairs(targets) do
					if target:IsRealHero() then
						self.timer = self.timer + self.interval
						if self.timer >= (1 - FrameTime()) then
							self.timer = 0
							self:IncrementStackCount()
						end
						break
					end
				end
			end
		end
	end

	self.parent:UpdateUIshort({ time = time, max_time = max_time, stack = stack, style = "LegionPress", priority = 1 })
end

function modifier_press_the_attack_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_press_the_attack_custom_buff:GetActivityTranslationModifiers()
	if self.caster ~= self.parent then
		return
	end
	return "press_the_attack"
end

function modifier_press_the_attack_custom_buff:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.movespeed
end

function modifier_press_the_attack_custom_buff:GetModifierConstantHealthRegen()
	return self.ability.hp_regen + self.parent:GetMaxHealth() * self.ability.talents.w2_heal
end

modifier_press_the_attack_custom_burn_effect = class(mod_visible)
function modifier_press_the_attack_custom_burn_effect:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.interval = self.ability.interval

	self.particle = ParticleManager:CreateParticle(
		"particles/econ/events/fall_2022/radiance_target_fall2022.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.caster:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self.ability }

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval - 0.01)
end

function modifier_press_the_attack_custom_burn_effect:OnIntervalThink()
	if not IsServer() then
		return
	end
	local damage_ability
	local mod = self.caster:FindModifierByName("modifier_press_the_attack_custom_buff")
	if mod and mod.active then
		damage_ability = "modifier_legion_press_7"
	end
	self.damageTable.damage = self.ability:GetDamage() * self.interval
	DoDamage(self.damageTable, damage_ability)
end

function modifier_press_the_attack_custom_burn_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_press_the_attack_custom_burn_effect:GetModifierMagicalResistanceBonus()
	return self.ability.talents.w1_magic
end

modifier_press_the_attack_custom_legendary = class(mod_hidden)
function modifier_press_the_attack_custom_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:EmitSound("Lc.Press_legendary")
	self.parent:EmitSound("Lc.Press_Heal")
	self.radius = self.ability:GetRadius()

	local effect_target = ParticleManager:CreateParticle(
		"particles/legion_commander/lc_press_heal.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_target, 1, Vector(200, 100, 100))
	ParticleManager:ReleaseParticleIndex(effect_target)

	local effect_aoe = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_legion_commander/legion_commander_press_the_attack_aoe.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_aoe, 1, Vector(self.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_aoe)

	self.effect_cast = ParticleManager:CreateParticle(
		"particles/legion_commander/press_legendary_aoe.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(self.radius, self.radius, self.radius))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	self.parent:GenericParticle("particles/legion_commander/press_legendary_buff.vpcf", self)
	self.parent:GenericParticle("particles/econ/events/fall_2022/radiance/radiance_owner_fall2022.vpcf", self)
end

function modifier_press_the_attack_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	if self.effect_cast then
		ParticleManager:DestroyParticle(self.effect_cast, true)
		ParticleManager:ReleaseParticleIndex(self.effect_cast)
		self.effect_cast = nil
	end
end

modifier_press_the_attack_custom_tracker = class(mod_hidden)
function modifier_press_the_attack_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.press_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.movespeed = self.ability:GetSpecialValueFor("movespeed")
	self.ability.hp_regen = self.ability:GetSpecialValueFor("hp_regen")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_press_the_attack_custom_tracker:OnRefresh()
	self.ability.movespeed = self.ability:GetSpecialValueFor("movespeed")
	self.ability.hp_regen = self.ability:GetSpecialValueFor("hp_regen")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

modifier_press_the_attack_custom_root = class(mod_hidden)
function modifier_press_the_attack_custom_root:IsPurgable()
	return true
end
function modifier_press_the_attack_custom_root:GetEffectName()
	return "particles/legion_commander/lc_root.vpcf"
end

function modifier_press_the_attack_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_press_the_attack_custom_proc_damage = class(mod_hidden)
function modifier_press_the_attack_custom_proc_damage:GetStatusEffectName()
	return "particles/status_fx/status_effect_burn.vpcf"
end
function modifier_press_the_attack_custom_proc_damage:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_press_the_attack_custom_proc_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.duration = self.ability.talents.w3_duration
	self.interval = 1
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		custom_flag = "lc_burn_flag",
	}

	self.parent:GenericParticle("particles/units/heroes/hero_invoker/invoker_chaos_meteor_burn_debuff.vpcf", self)

	self:OnRefresh()
	self:StartIntervalThink(self.interval)
end

function modifier_press_the_attack_custom_proc_damage:OnRefresh(table)
	if not IsServer() then
		return
	end
	local add = self.ability:GetDamage() * self.ability.talents.w3_damage

	self.total_damage = self.total_damage + add
	self.tick = self.total_damage / self.duration
	self.count = self.duration
	self.damageTable.damage = self.tick
end

function modifier_press_the_attack_custom_proc_damage:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable, "modifier_legion_press_3")
	self.parent:SendNumber(4, real_damage)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end