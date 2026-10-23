--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_antimage_blink_custom_active",
	"abilities/antimage/antimage_blink_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_antimage_blink_custom_illusion",
	"abilities/antimage/antimage_blink_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_blink_custom_turn",
	"abilities/antimage/antimage_blink_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_blink_custom_quest",
	"abilities/antimage/antimage_blink_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_blink_custom_legendary_agility",
	"abilities/antimage/antimage_blink_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_blink_7"
)
LinkLuaModifier(
	"modifier_antimage_blink_custom_tracker",
	"abilities/antimage/antimage_blink_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_blink_custom_move",
	"abilities/antimage/antimage_blink_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_blink_2"
)
LinkLuaModifier(
	"modifier_antimage_blink_custom_crit",
	"abilities/antimage/antimage_blink_custom",
	LUA_MODIFIER_MOTION_NONE
)

antimage_blink_custom = class({})
antimage_blink_custom.talents = {}
antimage_blink_custom.legendary_count = 0

function antimage_blink_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_antimage/antimage_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_antimage/antimage_blink_end.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/force_staff.vpcf", context)
	PrecacheResource("particle", "particles/antimage/antimage_charge.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_forcestaff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_antimage/antimage_manabreak_slow.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_dark_seer_normal_punch_replica.vpcf", context)
	PrecacheResource("particle", "particles/antimage/blink_damage.vpcf", context)
	PrecacheResource("particle", "particles/antimage/nomana_haste.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_kez/status_effect_kez_afterimage_buff.vpcf", context)
end

function antimage_blink_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_crit = 0,
			w1_duration = caster:GetTalentValue("modifier_antimage_blink_1", "duration", true),
			w1_attacks = caster:GetTalentValue("modifier_antimage_blink_1", "attacks", true),
			w1_attacks_legendary = caster:GetTalentValue("modifier_antimage_blink_1", "attacks_legendary", true),

			has_w2 = 0,
			w2_duration = caster:GetTalentValue("modifier_antimage_blink_2", "duration", true),

			has_w3 = 0,
			w3_damage = 0,
			w3_heal = 0,
			w3_legendary_count = caster:GetTalentValue("modifier_antimage_blink_3", "legendary_count", true),
			w3_duration = caster:GetTalentValue("modifier_antimage_blink_3", "duration", true),

			has_w4 = 0,
			w4_cast = caster:GetTalentValue("modifier_antimage_blink_4", "cast", true),
			w4_speed = caster:GetTalentValue("modifier_antimage_blink_4", "speed", true) / 100,
			w4_cd_inc = caster:GetTalentValue("modifier_antimage_blink_4", "cd_inc", true) / 100,

			has_w7 = 0,
			w7_duration_creeps = caster:GetTalentValue("modifier_antimage_blink_7", "duration_creeps", true),
			w7_min_distance = caster:GetTalentValue("modifier_antimage_blink_7", "min_distance", true),
			w7_cd = caster:GetTalentValue("modifier_antimage_blink_7", "cd", true) / 100,
			w7_speed = caster:GetTalentValue("modifier_antimage_blink_7", "speed", true),
			w7_duration_hero = caster:GetTalentValue("modifier_antimage_blink_7", "duration_hero", true),
			w7_max = caster:GetTalentValue("modifier_antimage_blink_7", "max", true),
			w7_distance = caster:GetTalentValue("modifier_antimage_blink_7", "distance", true),
			w7_agi = caster:GetTalentValue("modifier_antimage_blink_7", "agi", true) / 100,
			w7_mana = caster:GetTalentValue("modifier_antimage_blink_7", "mana", true),

			has_r1 = 0,
		}
	end

	if caster:HasTalent("modifier_antimage_blink_1") then
		self.talents.has_w1 = 1
		self.talents.w1_crit = caster:GetTalentValue("modifier_antimage_blink_1", "crit")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_antimage_blink_2") then
		self.talents.has_w2 = 1
	end

	if caster:HasTalent("modifier_antimage_blink_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_antimage_blink_3", "damage")
		self.talents.w3_heal = caster:GetTalentValue("modifier_antimage_blink_3", "heal") / 100
	end

	if caster:HasTalent("modifier_antimage_blink_4") then
		self.talents.has_w4 = 1
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_antimage_blink_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_antimage_void_1") then
		self.talents.has_r1 = 1
	end
end

function antimage_blink_custom:CreateTalent()
	self.caster:UpdateUIlong({ max = 1, stack = 0, active = 0, style = "AntimageBlink" })
end

function antimage_blink_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_antimage_blink_custom_tracker"
end

function antimage_blink_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "antimage_blink", self)
end

function antimage_blink_custom:GetCastAnimation()
	if self.talents.has_w7 == 1 then
		return 0
	end
	return ACT_DOTA_CAST_ABILITY_2
end

function antimage_blink_custom:GetCastPoint(iLevel)
	if self.talents.has_w7 == 1 then
		return 0
	end
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_w4 == 1 and self.talents.w4_cast or 0)
end

function antimage_blink_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
end

function antimage_blink_custom:GetCastRange(vLocation, hTarget)
	local max_dist = (self.blink_range or 0)
	if self.talents.has_w7 == 1 then
		max_dist = self.talents.w7_distance - self.caster:GetCastRangeBonus()
	end
	if IsClient() then
		return max_dist
	end
	return 99999
end

function antimage_blink_custom:GetCooldown(iLevel)
	local k = 1
	if self.talents.has_w7 == 1 then
		k = 1 + self.talents.w7_cd
	end
	return (self.BaseClass.GetCooldown(self, iLevel)) * k
end

function antimage_blink_custom:GetManaCost(level)
	if self.talents.has_w4 == 1 then
		return 0
	end
	if self.talents.has_w7 == 1 then
		return self.talents.w7_mana
	end
	return self.BaseClass.GetManaCost(self, level)
end

function antimage_blink_custom:OnAbilityPhaseStart()
	if not IsServer() then
		return true
	end
	local caster = self:GetCaster()
	local origin = caster:GetAbsOrigin()
	local direction = self:GetCursorPosition() - origin
	direction.z = 0
	local particle = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			caster,
			"particles/units/heroes/hero_antimage/antimage_blink_pre.vpcf",
			self
		),
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, origin)
	if direction:Length2D() > 0 then
		ParticleManager:SetParticleControlForward(particle, 0, direction:Normalized())
	end
	ParticleManager:ReleaseParticleIndex(particle)
	return true
end

function antimage_blink_custom:OnSpellStart()
	local origin = self.caster:GetOrigin()
	local point = self:GetCursorPosition()
	if point == origin then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	local blink_range = self.talents.has_w7 == 1 and self.talents.w7_distance
		or (self.blink_range + self.caster:GetCastRangeBonus())

	local direction = (point - origin)
	direction.z = 0
	if direction:Length2D() > blink_range then
		direction = direction:Normalized() * blink_range
	elseif self.talents.has_w7 == 1 and direction:Length2D() < self.talents.w7_min_distance then
		direction = direction:Normalized() * self.talents.w7_min_distance
	end
	ProjectileManager:ProjectileDodge(self.caster)

	local particle_start_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_antimage/antimage_blink_start.vpcf",
		self
	)
	local particle_start = ParticleManager:CreateParticle(particle_start_name, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle_start, 0, origin)
	ParticleManager:SetParticleControlForward(particle_start, 0, direction:Normalized())
	ParticleManager:ReleaseParticleIndex(particle_start)

	if self.caster:GetQuest() == "Anti.Quest_6" and not self.caster:QuestCompleted() then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_antimage_blink_custom_quest",
			{ duration = self.caster.quest.number }
		)
	end

	if self.talents.has_w7 == 1 then
		self.caster:EmitSound("Antimage.Blink_legen")
		local point = origin + direction
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_antimage_blink_custom_active",
			{ x = point.x, y = point.y }
		)
	else
		EmitSoundOnLocationWithCaster(origin, "Hero_Antimage.Blink_out", self.caster)
		FindClearSpaceForUnit(self.caster, origin + direction, true)
		self:ProceedProc(origin)
		local sound_in = wearables_system:GetSoundReplacement(self.caster, "Hero_Antimage.Blink_in", self)
		EmitSoundOnLocationWithCaster(self.caster:GetOrigin(), sound_in, self.caster)
	end
end

function antimage_blink_custom:DealDamage(origin, point)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w7 == 0 and self.talents.has_r1 == 0 then
		return
	end

	local width = 150
	local hit_type = 0
	local enemies = FindUnitsInLine(
		self.caster:GetTeamNumber(),
		origin,
		point,
		nil,
		width,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO,
		0
	)
	for _, enemy in pairs(enemies) do
		if self.talents.has_w7 == 1 then
			hit_type = math.max(1, hit_type)
			if enemy:IsRealHero() then
				hit_type = 2
			end
		end

		if self.caster.manavoid_ability and self.talents.has_r1 == 1 then
			self.caster.manavoid_ability:ApplyBurn(enemy)
		end

		local particle =
			ParticleManager:CreateParticle("particles/antimage/blink_damage.vpcf", PATTACH_ABSORIGIN_FOLLOW, enemy)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			enemy,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			enemy:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			enemy,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			enemy:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
		enemy:EmitSound("Hero_Antimage.Attack")

		local particle2 = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_antimage/antimage_manabreak_slow.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			enemy
		)
		ParticleManager:SetParticleControlEnt(
			particle2,
			0,
			enemy,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			enemy:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle2,
			1,
			enemy,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			enemy:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle2)
	end

	if hit_type ~= 0 then
		local duration = hit_type == 2 and self.talents.w7_duration_hero or self.talents.w7_duration_creeps
		local mod = self.caster:FindModifierByName("modifier_antimage_blink_custom_legendary_agility")
		if mod then
			duration = math.max(duration, mod:GetRemainingTime())
		end
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_antimage_blink_custom_legendary_agility",
			{ duration = duration }
		)
	end
end

function antimage_blink_custom:ProceedProc(origin)
	if not IsServer() then
		return
	end
	local point = self.caster:GetAbsOrigin()
	local direction = point - origin
	direction.z = 0

	self:DealDamage(origin, point)

	local particle_end_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_antimage/antimage_blink_end.vpcf",
		self
	)

	local particle_end = ParticleManager:CreateParticle(particle_end_name, PATTACH_ABSORIGIN, self.caster)
	ParticleManager:SetParticleControl(particle_end, 0, self.caster:GetOrigin())
	ParticleManager:SetParticleControlForward(particle_end, 0, direction:Normalized())
	ParticleManager:ReleaseParticleIndex(particle_end)

	if self.talents.has_w1 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_antimage_blink_custom_crit",
			{ duration = self.talents.w1_duration }
		)
	end

	if self.talents.has_w2 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_antimage_blink_custom_move",
			{ duration = self.talents.w2_duration }
		)
	end

	if self.talents.has_w3 == 1 then
		local legendary_count = self.talents.w3_legendary_count
		if self.talents.has_w7 == 1 then
			self.legendary_count = self.legendary_count + 1
			if self.legendary_count < legendary_count then
				return
			end
			self.legendary_count = 0
		end

		local duration = self.talents.w3_duration
		local damage = self.talents.w3_damage - 100

		local illusions = CreateIllusions(
			self.caster,
			self.caster,
			{ duration = duration, outgoing_damage = damage, incoming_damage = 0 },
			1,
			0,
			false,
			true
		)

		for k, illusion in pairs(illusions) do
			illusion.owner = self.caster
			for _, mod in pairs(self.caster:FindAllModifiers()) do
				if mod.StackOnIllusion == true then
					illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount(), mod)
				end
			end
			illusion:AddNewModifier(self.caster, self, "modifier_antimage_blink_custom_illusion", {})
			Timers:CreateTimer(0.1, function()
				illusion:MoveToPositionAggressive(illusion:GetAbsOrigin())
			end)
		end
	end
end

modifier_antimage_blink_custom_active = class(mod_hidden)
function modifier_antimage_blink_custom_active:GetEffectName()
	return "particles/antimage/antimage_charge.vpcf"
end
function modifier_antimage_blink_custom_active:GetStatusEffectName()
	return "particles/units/heroes/hero_kez/status_effect_kez_afterimage_buff.vpcf"
end
function modifier_antimage_blink_custom_active:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_antimage_blink_custom_active:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.anim = ACT_DOTA_RUN

	if not IsServer() then
		return
	end

	if
		self.parent.current_model == "models/heroes/antimage_female/antimage_female.vmdl"
		or self.parent.current_model == "models/items/antimage_female/mh_antimage_kirin/antimage_female_kirin.vmdl"
		or self.parent.current_model
			== "models/items/antimage_female/mh_antimage_kirin/antimage_female_kirin_rainbow.vmdl"
	then
		self:SetStackCount(1)
	end
	self.parent:StartGesture(ACT_DOTA_RUN)

	self.parent:GenericParticle("particles/items_fx/force_staff.vpcf", self)

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.angle = (self.point - self.parent:GetAbsOrigin()):Normalized()
	self.parent:FacePoint(self.point)
	self.distance = (self.point - self.parent:GetAbsOrigin()):Length2D()
	self.speed = self.ability.talents.w7_speed

	if self.ability.talents.has_w4 == 1 then
		self.speed = self.speed * (1 + self.ability.talents.w4_speed)
	end

	self.origin = self.parent:GetAbsOrigin()

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_antimage_blink_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_antimage_blink_custom_active:GetActivityTranslationModifiers()
	return self:GetStackCount() == 1 and "chase" or "haste"
end

function modifier_antimage_blink_custom_active:GetModifierDisableTurning()
	return 1
end

function modifier_antimage_blink_custom_active:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveGesture(ACT_DOTA_RUN)

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_antimage_blink_custom_turn", { duration = 1 })
	self.parent:InterruptMotionControllers(true)

	local dir = self.parent:GetForwardVector()
	dir.z = 0
	self.parent:FacePoint(self.parent:GetAbsOrigin() + dir * 10)

	ResolveNPCPositions(self.parent:GetAbsOrigin(), 128)
	self.ability:ProceedProc(self.origin)
end

function modifier_antimage_blink_custom_active:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	local pos = self.parent:GetAbsOrigin()
	GridNav:DestroyTreesAroundPoint(pos, 80, false)

	local pos_p = self.angle * self.speed * dt
	local next_pos = GetGroundPosition(pos + pos_p, self.parent)

	self.parent:SetAbsOrigin(next_pos)

	if (next_pos - self.origin):Length2D() >= self.distance then
		self:Destroy()
		return
	end
end

function modifier_antimage_blink_custom_active:OnHorizontalMotionInterrupted()
	self:Destroy()
end

modifier_antimage_blink_custom_illusion = class(mod_hidden)
function modifier_antimage_blink_custom_illusion:GetStatusEffectName()
	return "particles/status_fx/status_effect_dark_seer_normal_punch_replica.vpcf"
end
function modifier_antimage_blink_custom_illusion:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_antimage_blink_custom_illusion:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:AddLifesteal(
		self,
		{
			name = "modifier_antimage_blink_3",
			type = 2,
			heal_unit = self.caster,
			illusion = true,
			value = self.ability.talents.w3_heal,
		}
	)
end

function modifier_antimage_blink_custom_illusion:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
	}
end

modifier_antimage_blink_custom_turn = class(mod_hidden)
function modifier_antimage_blink_custom_turn:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE,
	}
end

function modifier_antimage_blink_custom_turn:GetModifierTurnRate_Percentage()
	return 100
end

modifier_antimage_blink_custom_quest = class(mod_hidden)

modifier_antimage_blink_custom_legendary_agility = class(mod_hidden)
function modifier_antimage_blink_custom_legendary_agility:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()

	if self.parent.owner then
		self.ability = self.parent.owner.antimage_blink_ability
	end

	self.max = self.ability.talents.w7_max
	self.agi = self.ability.talents.w7_agi / self.max
	self.StackOnIllusion = true
	self.RemoveForDuel = true

	self.max_time = self:GetRemainingTime()
	self:SetStackCount(1)

	if not self.parent:IsRealHero() then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_antimage_blink_custom_legendary_agility:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.max_time = self:GetRemainingTime()

	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_antimage_blink_custom_legendary_agility:OnStackCountChanged()
	if not IsServer() then
		return
	end
	self.parent:AddPercentStat({ agi = self.agi * self:GetStackCount() }, self)
end

function modifier_antimage_blink_custom_legendary_agility:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:UpdateUIlong({
		max = self.max_time,
		stack = 0,
		override_stack = "0%",
		active = 0,
		style = "AntimageBlink",
	})
end

function modifier_antimage_blink_custom_legendary_agility:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIlong({
		max = self.max_time,
		stack = self:GetRemainingTime(),
		override_stack = math.floor(self:GetStackCount() * self.agi * 100) .. "%",
		active = self:GetStackCount() >= self.max and 1 or 0,
		style = "AntimageBlink",
	})
end

modifier_antimage_blink_custom_tracker = class(mod_hidden)
function modifier_antimage_blink_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.antimage_blink_ability = self.ability

	self.record = nil
	self.ability.blink_range = self.ability:GetSpecialValueFor("blink_range")
end

function modifier_antimage_blink_custom_tracker:OnRefresh()
	self.ability.blink_range = self.ability:GetSpecialValueFor("blink_range")
end

function modifier_antimage_blink_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_antimage_blink_custom_tracker:GetCritDamage()
	if not self.parent:HasModifier("modifier_antimage_blink_custom_crit") then
		return
	end
	return self.ability.talents.w1_crit
end

function modifier_antimage_blink_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	self.record = nil

	local mod = self.parent:FindModifierByName("modifier_antimage_blink_custom_crit")
	if not mod then
		return
	end

	mod:DecrementStackCount()
	if mod:GetStackCount() <= 0 then
		mod:Destroy()
	end
	self.record = true
	return self.ability.talents.w1_crit
end

function modifier_antimage_blink_custom_tracker:GetProcChance()
	return 100
end

function modifier_antimage_blink_custom_tracker:AttackProc(params, name)
	if self.record then
		self.record = nil
		params.target:EmitSound("DOTA_Item.Daedelus.Crit")
		local particle2 = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_antimage/antimage_manabreak_slow.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			params.target
		)
		ParticleManager:SetParticleControlEnt(
			particle2,
			0,
			params.target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			params.target:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle2,
			1,
			params.target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			params.target:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle2)
	end

	if self.ability.talents.has_w4 == 0 then
		return
	end
	self.parent:CdAbility(self.ability, nil, self.ability.talents.w4_cd_inc, "modifier_antimage_blink_4")
end

modifier_antimage_blink_custom_move = class(mod_hidden)
function modifier_antimage_blink_custom_move:IsAura()
	return self.parent:IsRealHero() and self.parent == self.caster
end
function modifier_antimage_blink_custom_move:GetAuraDuration()
	return 0
end
function modifier_antimage_blink_custom_move:GetAuraRadius()
	return self.radius
end
function modifier_antimage_blink_custom_move:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_antimage_blink_custom_move:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_antimage_blink_custom_move:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
end
function modifier_antimage_blink_custom_move:GetModifierAura()
	return "modifier_antimage_blink_custom_move"
end
function modifier_antimage_blink_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = 1000
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_antimage_mana_break_custom_haste") then
		return
	end
	self.parent:GenericParticle("particles/antimage/nomana_haste.vpcf", self)
end

function modifier_antimage_blink_custom_move:GetAuraEntityReject(hEntity)
	return not hEntity.owner or not hEntity:IsIllusion() or hEntity.owner ~= self.caster
end

modifier_antimage_blink_custom_crit = class(mod_hidden)
function modifier_antimage_blink_custom_crit:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self:SetStackCount(
		self.ability.talents.has_w7 == 1 and self.ability.talents.w1_attacks_legendary
			or self.ability.talents.w1_attacks
	)
end