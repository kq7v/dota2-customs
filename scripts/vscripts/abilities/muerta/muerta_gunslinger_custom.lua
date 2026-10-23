--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_muerta_gunslinger_custom",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_gunslinger_custom_speed",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_muerta_gun_1", "modifier_muerta_gun_3" }
)
LinkLuaModifier(
	"modifier_muerta_gunslinger_custom_active",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_muerta_gunslinger_custom_illusion",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_gunslinger_custom_incoming",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_muerta_gun_4" }
)
LinkLuaModifier(
	"modifier_muerta_gunslinger_custom_incoming_cd",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_gun_4"
)
LinkLuaModifier(
	"modifier_muerta_gunslinger_custom_armor",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_gunslinger_custom_legendary_stack",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_gun_7"
)
LinkLuaModifier(
	"modifier_muerta_gunslinger_custom_legendary_attack",
	"abilities/muerta/muerta_gunslinger_custom",
	LUA_MODIFIER_MOTION_NONE
)

muerta_gunslinger_custom = class({})
muerta_gunslinger_custom.talents = {}

function muerta_gunslinger_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_gunslinger.vpcf", context)
	PrecacheResource("particle", "particles/muerta/magic_hit.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_muerta/muerta_ultimate_projectile_alternate.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_ultimate_projectile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_base_attack_alt.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_dig_ground.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_wraithking_ghosts.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_ultimate_form_ethereal.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/force_staff.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_gun_active.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_forcestaff.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_attack_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_muerta_parting_shot.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blur_absorb.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_parting_shot_tether.vpcf", context)
	PrecacheResource("particle", "particles/muerta/gun_evasion.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti9/shovel_dig.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti9/shovel_smoke_cloud.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_quest_kill.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti9/muerta_dig_treasure.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_dig_drop.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_quest_item.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti9/shovel_revealed_nothing.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_alchemist/alchemist_lasthit_coins.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/wraith_king_vampiric_aura_lifesteal.vpcf",
		context
	)
	PrecacheResource("particle", "particles/muerta/muerta_item_active.vpcf", context)
end

function muerta_gunslinger_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_speed = 0,
			e1_duration = caster:GetTalentValue("modifier_muerta_gun_1", "duration", true),
			e1_max = caster:GetTalentValue("modifier_muerta_gun_1", "max", true),

			e2_chance = 0,
			e2_heal = 0,

			has_e3 = 0,
			e3_crit = 0,
			e3_stats = 0,
			e3_max = caster:GetTalentValue("modifier_muerta_gun_3", "max", true),
			e3_duration = caster:GetTalentValue("modifier_muerta_gun_3", "duration", true),

			has_e4 = 0,
			e4_effect_duration = caster:GetTalentValue("modifier_muerta_gun_4", "effect_duration", true),
			e4_heal = caster:GetTalentValue("modifier_muerta_gun_4", "heal", true) / 100,
			e4_incoming = caster:GetTalentValue("modifier_muerta_gun_4", "incoming", true),
			e4_duration = caster:GetTalentValue("modifier_muerta_gun_4", "duration", true),
			e4_health = caster:GetTalentValue("modifier_muerta_gun_4", "health", true),
			e4_armor = caster:GetTalentValue("modifier_muerta_gun_4", "armor", true),
			e4_damage_reduce = caster:GetTalentValue("modifier_muerta_gun_4", "damage_reduce", true),
			e4_talent_cd = caster:GetTalentValue("modifier_muerta_gun_4", "talent_cd", true),

			has_e7 = 0,
			e7_speed = caster:GetTalentValue("modifier_muerta_gun_7", "speed", true),
			e7_cd_inc = caster:GetTalentValue("modifier_muerta_gun_7", "cd_inc", true),
			e7_damage = caster:GetTalentValue("modifier_muerta_gun_7", "damage", true),
			e7_range = caster:GetTalentValue("modifier_muerta_gun_7", "range", true),
			e7_effect_duration = caster:GetTalentValue("modifier_muerta_gun_7", "effect_duration", true),
			e7_duration_creeps = caster:GetTalentValue("modifier_muerta_gun_7", "duration_creeps", true),
			e7_stack = caster:GetTalentValue("modifier_muerta_gun_7", "stack", true),
			e7_duration = caster:GetTalentValue("modifier_muerta_gun_7", "duration", true),
			e7_talent_cd = caster:GetTalentValue("modifier_muerta_gun_7", "talent_cd", true),

			has_r4 = 0,
			r4_cd_inc = caster:GetTalentValue("modifier_muerta_veil_4", "cd_inc", true) / 100,

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_muerta_gun_1") then
		self.talents.has_e1 = 1
		self.talents.e1_speed = caster:GetTalentValue("modifier_muerta_gun_1", "speed")
	end

	if caster:HasTalent("modifier_muerta_gun_2") then
		self.talents.e2_chance = caster:GetTalentValue("modifier_muerta_gun_2", "chance")
		self.talents.e2_heal = caster:GetTalentValue("modifier_muerta_gun_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_muerta_gun_2", type = 2, value = self.talents.e2_heal })
	end

	if caster:HasTalent("modifier_muerta_gun_3") then
		self.talents.has_e3 = 1
		self.talents.e3_crit = caster:GetTalentValue("modifier_muerta_gun_3", "crit")
		self.talents.e3_stats = caster:GetTalentValue("modifier_muerta_gun_3", "stats")
	end

	if caster:HasTalent("modifier_muerta_gun_4") then
		self.talents.has_e4 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_muerta_gun_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_muerta_veil_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_muerta_veil_7") then
		self.talents.has_r7 = 1
	end
end

function muerta_gunslinger_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_muerta_gunslinger_custom"
end

function muerta_gunslinger_custom:GetCooldown(iLevel)
	if self.talents.has_e7 == 1 then
		return self.talents.e7_talent_cd
	end
	return 0
end

function muerta_gunslinger_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function muerta_gunslinger_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_e7 == 1 then
		return IsServer() and 999999 or (self.talents.e7_range - self.caster:GetCastRangeBonus())
	end
	return 0
end

function muerta_gunslinger_custom:OnSpellStart()
	self.caster:RemoveGesture(ACT_DOTA_CAST_ABILITY_3)

	local point = self.caster:CastPosition(self:GetCursorPosition())
	self.caster:FacePoint(point)

	self.caster:EmitSound("Muerta.Gun_active")
	self.caster:EmitSound("Muerta.Gun_active2")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_muerta_gunslinger_custom_active",
		{ x = point.x, y = point.y }
	)
end

function muerta_gunslinger_custom:OnProjectileHit_ExtraData(target, Location, table)
	if not IsServer() then
		return
	end
	if not target then
		return
	end
	if table.real ~= 1 then
		return
	end

	self.caster.muerta_e = true
	self.caster:PerformAttack(target, true, true, true, true, false, false, false, { damage = "muerta_e" })
	self.caster.muerta_e = false

	if self.talents.has_e1 == 1 or self.talents.has_e3 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_muerta_gunslinger_custom_speed",
			{ duration = self.talents.has_e1 == 1 and self.talents.e1_duration or self.talents.e3_duration }
		)
	end
end

function muerta_gunslinger_custom:LegendaryStack(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e7 == 0 then
		return
	end

	local duration = self.talents.e7_duration
	if target:IsCreep() then
		duration = self.talents.e7_duration_creeps
	end
	local stack_duration = duration
	local mod = self.caster:FindModifierByName("modifier_muerta_gunslinger_custom_legendary_stack")
	if mod then
		duration = math.max(duration, mod:GetRemainingTime())
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_muerta_gunslinger_custom_legendary_stack",
		{ duration = duration, stack_duration = stack_duration }
	)
end

modifier_muerta_gunslinger_custom = class(mod_hidden)
function modifier_muerta_gunslinger_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.double_shot_chance = self.ability:GetSpecialValueFor("double_shot_chance")
	self.ability.target_search_bonus_range = self.ability:GetSpecialValueFor("target_search_bonus_range")
	self.ability.creeps = self.ability:GetSpecialValueFor("creeps")

	if not IsServer() then
		return
	end
	self.parent:AddAttackRecordEvent_out(self)
	self.parent:AddAttackStartEvent_out(self)
	self.proc = self.parent:AddProc(self, { current = true })

	self.proj_data = {
		[DOTA_PROJECTILE_ATTACHMENT_ATTACK_1] = "particles/units/heroes/hero_muerta/muerta_base_attack_alt.vpcf",
		[DOTA_PROJECTILE_ATTACHMENT_ATTACK_2] = "particles/units/heroes/hero_muerta/muerta_base_attack.vpcf",
	}

	self.proj_data_ulti = {
		[DOTA_PROJECTILE_ATTACHMENT_ATTACK_1] = "particles/units/heroes/hero_muerta/muerta_ultimate_projectile_alternate.vpcf",
		[DOTA_PROJECTILE_ATTACHMENT_ATTACK_2] = "particles/units/heroes/hero_muerta/muerta_ultimate_projectile.vpcf",
	}

	self.double_attack = false
end

function modifier_muerta_gunslinger_custom:OnRefresh()
	self.ability.double_shot_chance = self.ability:GetSpecialValueFor("double_shot_chance")
end

function modifier_muerta_gunslinger_custom:GetProcChance(params)
	if self.parent:PassivesDisabled() then
		return 0
	end
	if self.parent:HasModifier("modifier_muerta_gunslinger_custom_legendary_attack") then
		return 100
	end
	return (self.ability.double_shot_chance + self.ability.talents.e2_chance)
		* (params.target:IsCreep() and self.ability.creeps or 1)
end

function modifier_muerta_gunslinger_custom:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	self.double_attack = false

	local target = params.target
	if not target:IsUnit() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end

	self.parent:FadeGesture(ACT_DOTA_CAST_ABILITY_3)

	if not self.proc or not self.proc.armed then
		return
	end

	self.double_attack = 1
	if self.parent:HasModifier("modifier_muerta_gunslinger_custom_legendary_attack") then
		self.double_attack = 2
		self.parent:RemoveModifierByName("modifier_muerta_gunslinger_custom_legendary_attack")
	end

	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_3, self.parent:GetAttackSpeed(true))
	self.parent:GenericParticle("particles/units/heroes/hero_muerta/muerta_gunslinger.vpcf")
end

function modifier_muerta_gunslinger_custom:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end

	if self.ability.talents.has_e7 == 1 then
		self.parent:CdAbility(self.ability, self.ability.talents.e7_cd_inc, nil, "modifier_muerta_gun_7")
	end

	if IsValid(self.parent.veil_ability) then
		if target:IsRealHero() then
			self.parent.veil_ability:LegendaryStack()
		end
		if self.ability.talents.has_r4 == 1 and self.ability.talents.has_r7 == 0 then
			self.parent:CdAbility(
				self.parent.veil_ability,
				nil,
				self.ability.talents.r4_cd_inc,
				"modifier_muerta_veil_4"
			)
		end
	end

	local proj_data = self.proj_data
	if (self.parent:IsAttackImmune() or target:IsAttackImmune()) and IsValid(self.parent.veil_ability) then
		proj_data = self.proj_data_ulti
		if self.ability.talents.has_e7 == 1 then
			self.ability:LegendaryStack(target)
		end
	end

	if not self.double_attack then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	local targets = self.parent:FindTargets(
		self.parent:Script_GetAttackRange() + self.ability.target_search_bonus_range,
		nil,
		nil,
		DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE
	)
	if #targets > 0 then
		local new_target = targets[RandomInt(1, #targets)]
		local info = {
			Ability = self.ability,
			iMoveSpeed = self.parent:GetProjectileSpeed(),
			Source = self.parent,
			bDodgeable = true,
			Target = new_target,
		}
		local real = 1
		for attach, effect in pairs(proj_data) do
			if new_target == target or attach == DOTA_PROJECTILE_ATTACHMENT_ATTACK_1 then
				info.iSourceAttachment = attach
				info.EffectName = effect
				info.ExtraData = { real = real }
				real = 0
				ProjectileManager:CreateTrackingProjectile(info)
			end
		end
	end

	if self.ability.talents.has_e4 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_muerta_gunslinger_custom_armor",
			{ duration = self.ability.talents.e4_effect_duration }
		)
	end

	if self.double_attack == 2 then
		for i = 1, self.ability.talents.e7_stack do
			self.ability:LegendaryStack(target)
		end
	end

	self.parent:EmitSound("Hero_Muerta.Attack.DoubleShot")
end

function modifier_muerta_gunslinger_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_muerta_gunslinger_custom:GetCritDamage()
	return self.ability.talents.e3_crit
end

function modifier_muerta_gunslinger_custom:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e3 == 0 then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end
	if not self.parent.muerta_e then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_muerta_gunslinger_custom_speed")
	if not mod or mod:GetStackCount() < self.ability.talents.e3_max then
		return
	end
	target:EmitSound("DOTA_Item.Daedelus.Crit")
	return self:GetCritDamage()
end

function modifier_muerta_gunslinger_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.e4_health then
		return
	end
	if self.parent:HasModifier("modifier_muerta_gunslinger_custom_incoming_cd") then
		return
	end

	self.parent:EmitSound("Muerta.Gun_lowhp")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_muerta_gunslinger_custom_incoming_cd",
		{ duration = self.ability.talents.e4_talent_cd }
	)

	local incoming = self.ability.talents.e4_incoming - 100
	local target = nil
	if params.attacker then
		target = params.attacker:entindex()
	end

	local point = self.parent:GetAbsOrigin() + RandomVector(300)

	local illusions = CreateIllusions(
		self.parent,
		self.parent,
		{ duration = self.ability.talents.e4_duration, outgoing_damage = -100, incoming_damage = incoming },
		1,
		1,
		false,
		true
	)
	for _, illusion in pairs(illusions) do
		FindClearSpaceForUnit(illusion, point, true)
		illusion:SetHealth(illusion:GetMaxHealth())
		illusion.owner = self.parent

		local mod = self.parent:FindModifierByName("modifier_muerta_gunslinger_custom_speed")
		if mod then
			local illusion_mod =
				illusion:AddNewModifier(self.parent, self.ability, "modifier_muerta_gunslinger_custom_speed", {})
			illusion_mod:SetStackCount(mod:GetStackCount())
		end

		illusion:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_muerta_gunslinger_custom_illusion",
			{ target = target, hero = self.parent:entindex() }
		)
	end
end

modifier_muerta_gunslinger_custom_speed = class(mod_visible)
function modifier_muerta_gunslinger_custom_speed:GetTexture()
	return "buffs/muerta/gun_1"
end
function modifier_muerta_gunslinger_custom_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.has_e1 == 1 and self.ability.talents.e1_max or self.ability.talents.e3_max
	if not IsServer() then
		return
	end
	self.StackOnIllusion = true
	self:OnRefresh()
end

function modifier_muerta_gunslinger_custom_speed:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_muerta_gunslinger_custom_speed:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_muerta_gunslinger_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_muerta_gunslinger_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.e1_speed * self:GetStackCount()
end

function modifier_muerta_gunslinger_custom_speed:GetModifierBonusStats_Strength()
	return self.ability.talents.e3_stats * self:GetStackCount()
end

function modifier_muerta_gunslinger_custom_speed:GetModifierBonusStats_Agility()
	return self.ability.talents.e3_stats * self:GetStackCount()
end

function modifier_muerta_gunslinger_custom_speed:GetModifierBonusStats_Intellect()
	return self.ability.talents.e3_stats * self:GetStackCount()
end

modifier_muerta_gunslinger_custom_active = class(mod_hidden)
function modifier_muerta_gunslinger_custom_active:GetEffectName()
	return "particles/muerta/muerta_gun_active.vpcf"
end
function modifier_muerta_gunslinger_custom_active:GetStatusEffectName()
	return "particles/status_fx/status_effect_forcestaff.vpcf"
end
function modifier_muerta_gunslinger_custom_active:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_muerta_gunslinger_custom_active:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	ProjectileManager:ProjectileDodge(self.parent)

	self.parent:GenericParticle("particles/items_fx/force_staff.vpcf", self)
	self.parent:StartGesture(ACT_DOTA_FLAIL)
	self.point = GetGroundPosition(Vector(kv.x, kv.y, 0), nil)

	self.angle = (self.point - self.parent:GetAbsOrigin()):Normalized()
	self.distance = self.ability.talents.e7_range
	self.speed = self.ability.talents.e7_speed

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_muerta_gunslinger_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_muerta_gunslinger_custom_active:GetActivityTranslationModifiers()
	return "forcestaff_friendly"
end

function modifier_muerta_gunslinger_custom_active:GetModifierDisableTurning()
	return 1
end

function modifier_muerta_gunslinger_custom_active:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end

	local pos = me:GetAbsOrigin()
	local next_pos = GetGroundPosition(pos + self.angle * self.speed * dt, nil)
	me:SetAbsOrigin(next_pos)

	local dist = (next_pos - pos):Length2D()
	self.distance = self.distance - dist
	if self.distance <= 0 then
		self:Destroy()
	end
end

function modifier_muerta_gunslinger_custom_active:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_muerta_gunslinger_custom_active:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:InterruptMotionControllers(true)

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_muerta_gunslinger_custom_legendary_attack",
		{ duration = self.ability.talents.e7_effect_duration }
	)

	self.parent:RemoveGesture(ACT_DOTA_FLAIL)
	self.parent:StartGesture(ACT_DOTA_FORCESTAFF_END)
	self.parent:FacePoint()
end

modifier_muerta_gunslinger_custom_illusion = class(mod_hidden)
function modifier_muerta_gunslinger_custom_illusion:GetStatusEffectName()
	return "particles/status_fx/status_effect_muerta_parting_shot.vpcf"
end
function modifier_muerta_gunslinger_custom_illusion:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_muerta_gunslinger_custom_illusion:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.parent:GenericParticle("particles/units/heroes/hero_muerta/muerta_ultimate_form_ethereal.vpcf", self)
	self.caster:AddNewModifier(self.caster, self.ability, "modifier_muerta_gunslinger_custom_incoming", {})

	if table.target then
		self.target = EntIndexToHScript(table.target)
		if (self.parent:GetAbsOrigin() - self.target:GetAbsOrigin()):Length2D() < 1500 then
			self.parent:SetForceAttackTarget(self.target)
		end
	end

	self.parent:GenericParticle("particles/phantom_assassin/blur_absorb.vpcf", self)

	self.particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_muerta/muerta_parting_shot_tether.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)

	self:StartIntervalThink(0.5)
end

function modifier_muerta_gunslinger_custom_illusion:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.target) or not self.target:IsAlive() then
		self.target = nil
		self.parent:SetForceAttackTarget(nil)
	end

	self:StartIntervalThink(-1)
end

function modifier_muerta_gunslinger_custom_illusion:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.caster) then
		return
	end
	self.caster:RemoveModifierByName("modifier_muerta_gunslinger_custom_incoming")
end

function modifier_muerta_gunslinger_custom_illusion:CheckState()
	return {
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
	}
end

function modifier_muerta_gunslinger_custom_illusion:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
	}
end

function modifier_muerta_gunslinger_custom_illusion:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end

	self.caster:GenericHeal(
		self.ability.talents.e4_heal * self.caster:GetMaxHealth(),
		self.ability,
		false,
		"",
		"modifier_muerta_gun_4"
	)
end

modifier_muerta_gunslinger_custom_incoming = class(mod_hidden)
function modifier_muerta_gunslinger_custom_incoming:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/phantom_assassin/blur_absorb.vpcf", self)
end

function modifier_muerta_gunslinger_custom_incoming:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_muerta_gunslinger_custom_incoming:GetModifierIncomingDamage_Percentage()
	return self.ability.talents.e4_damage_reduce
end

modifier_muerta_gunslinger_custom_incoming_cd = class(mod_cd)
function modifier_muerta_gunslinger_custom_incoming_cd:GetTexture()
	return "buffs/muerta/gun_4"
end

modifier_muerta_gunslinger_custom_armor = class(mod_hidden)
function modifier_muerta_gunslinger_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.talents.e4_armor
end

function modifier_muerta_gunslinger_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_muerta_gunslinger_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_muerta_gunslinger_custom_legendary_stack = class(mod_visible)
function modifier_muerta_gunslinger_custom_legendary_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:AddStack(table.stack_duration)
end

function modifier_muerta_gunslinger_custom_legendary_stack:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack(table.stack_duration)
end

function modifier_muerta_gunslinger_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_muerta_gunslinger_custom_legendary_stack:AddStack(duration)
	if not IsServer() then
		return
	end

	self.max_timer = self:GetRemainingTime()

	Timers:CreateTimer(duration, function()
		if self and not self:IsNull() then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self:IncrementStackCount()
end

function modifier_muerta_gunslinger_custom_legendary_stack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_muerta_gunslinger_custom_legendary_stack:GetModifierPreAttack_BonusDamage(params)
	if
		(self.parent:IsAttackImmune() or (params.target and params.target:IsAttackImmune()))
		and IsValid(self.parent.veil_ability)
	then
		return
	end
	return self.ability.talents.e7_damage * self:GetStackCount()
end

modifier_muerta_gunslinger_custom_legendary_attack = class(mod_hidden)