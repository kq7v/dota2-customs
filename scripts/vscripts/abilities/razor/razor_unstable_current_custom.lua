--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_razor_unstable_current_custom",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_razor_unstable_current_custom_slow",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_razor_unstable_current_custom_cd",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_razor_unstable_current_custom_legendary",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_razor_unstable_current_custom_legendary_charge",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_razor_unstable_current_custom_damage",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_razor_unstable_current_custom_heal",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_razor_unstable_current_custom_stun_cd",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_razor_unstable_current_custom_stats",
	"abilities/razor/razor_unstable_current_custom",
	LUA_MODIFIER_MOTION_NONE
)

razor_unstable_current_custom = class({})

function razor_unstable_current_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_razor/razor_unstable_current.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
		context
	)
	PrecacheResource("particle", "particles/razor/surge_stacks.vpcf", context)
	PrecacheResource("particle", "particles/razor/surge_range.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf", context)
	PrecacheResource("particle", "particles/razor/surge_speed.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_forcestaff.vpcf", context)
	PrecacheResource("particle", "particles/razor/surge_damage_stack.vpcf", context)
end

function razor_unstable_current_custom:GetAbilityTextureName()
	local caster = self:GetCaster()
	if caster:HasModifier("modifier_razor_unstable_current_custom_legendary") then
		return "unstable_current_stop"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "razor_storm_surge", self)
end

function razor_unstable_current_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_razor_unstable_current_custom"
end

function razor_unstable_current_custom:GetBehavior()
	if self:GetCaster():HasTalent("modifier_razor_current_7") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function razor_unstable_current_custom:GetCastRange(vLocation, hTarget)
	if IsClient() then
		return self:GetSpecialValueFor("strike_search_radius")
	end
end

function razor_unstable_current_custom:GetCooldown(iLevel)
	if self:GetCaster():HasTalent("modifier_razor_current_7") then
		return self:GetCaster():GetTalentValue("modifier_razor_current_7", "cd")
	end
	return
end

function razor_unstable_current_custom:OnSpellStart()
	local caster = self:GetCaster()
	local mod = caster:FindModifierByName("modifier_razor_unstable_current_custom_legendary")

	if mod then
		mod:Destroy()
	else
		local duration = caster:GetTalentValue("modifier_razor_current_7", "duration")
		caster:AddNewModifier(caster, self, "modifier_razor_unstable_current_custom_legendary", { duration = duration })
		self:EndCd(0)
		self:StartCooldown(0.3)
	end
end

function razor_unstable_current_custom:ApplySlow(target)
	if not IsServer() then
		return
	end

	local duration = self:GetSpecialValueFor("strike_slow_duration")

	target:AddNewModifier(
		self:GetCaster(),
		self,
		"modifier_razor_unstable_current_custom_slow",
		{ duration = (1 - target:GetStatusResistance()) * duration }
	)
end

modifier_razor_unstable_current_custom = class({})
function modifier_razor_unstable_current_custom:IsHidden()
	return not self.parent:HasTalent("modifier_razor_current_4")
		and not self.parent:HasTalent("modifier_razor_current_5")
end
function modifier_razor_unstable_current_custom:IsPurgable()
	return false
end
function modifier_razor_unstable_current_custom:GetTexture()
	return "razor_unstable_current"
end

function modifier_razor_unstable_current_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:AddAttackEvent_inc(self)
	self.parent:AddSpellEvent(self)

	self.move = self.ability:GetSpecialValueFor("self_movement_speed_pct")
	self.chance = self.ability:GetSpecialValueFor("strike_pct_chance")
	self.count = self.ability:GetSpecialValueFor("strike_target_count")
	self.radius = self.ability:GetSpecialValueFor("strike_search_radius")
	self.cd = self.ability:GetSpecialValueFor("strike_internal_cd")
	self.damage = self.ability:GetSpecialValueFor("strike_damage")

	self.damage_duration = self.parent:GetTalentValue("modifier_razor_current_4", "duration", true)
	self.heal_duration = self.parent:GetTalentValue("modifier_razor_current_2", "duration", true)

	self.stun_cd = self.parent:GetTalentValue("modifier_razor_current_6", "cd", true)
	self.stun_duration = self.parent:GetTalentValue("modifier_razor_current_6", "stun", true)
	self.cd_inc = self.parent:GetTalentValue("modifier_razor_current_6", "cd_inc", true)

	self.distance_move = self.parent:GetTalentValue("modifier_razor_current_4", "distance", true)

	self.cd_items = self.parent:GetTalentValue("modifier_razor_current_5", "cd", true)

	self.legendary_cd = self.parent:GetTalentValue("modifier_razor_current_7", "cd_inc", true)

	self.stats_stack = self.parent:GetTalentValue("modifier_razor_current_3", "spell", true)
	self.stats_duration = self.parent:GetTalentValue("modifier_razor_current_3", "duration", true)

	if not IsServer() then
		return
	end

	self:SetStackCount(0)
	self.old_pos = self.parent:GetAbsOrigin()
	self:StartIntervalThink(1)
end

function modifier_razor_unstable_current_custom:OnRefresh(table)
	self:OnCreated()
end

function modifier_razor_unstable_current_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if
		not self.parent:HasTalent("modifier_razor_current_4") and not self.parent:HasTalent("modifier_razor_current_5")
	then
		self.old_pos = self.parent:GetAbsOrigin()
		return
	end

	local new_pos = self.parent:GetAbsOrigin()
	local dist = (new_pos - self.old_pos):Length2D()
	local targets = self.parent:FindTargets(self.radius)

	if #targets > 0 then
		self:SetStackCount(self:GetStackCount() + dist)

		if self:GetStackCount() >= self.distance_move then
			self:SetStackCount(0)

			if self.parent:HasTalent("modifier_razor_current_4") then
				self:PassiveProc(nil, true)
			end

			if self.parent:HasTalent("modifier_razor_current_5") then
				self.parent:CdItems(self.cd_items, "modifier_razor_current_5")
			end
		end
	end

	self.old_pos = new_pos
	self:StartIntervalThink(0.1)
end

function modifier_razor_unstable_current_custom:PassiveProc(attacker, no_cd, spell)
	if not IsServer() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end

	local cd = self.cd
	if self.parent:HasTalent("modifier_razor_current_6") then
		cd = cd + self.cd_inc
	end

	if self.parent:HasTalent("modifier_razor_current_2") then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_razor_unstable_current_custom_heal",
			{ duration = self.heal_duration }
		)
	end

	self.parent:EmitSound("Hero_Razor.UnstableCurrent.Strike")

	if not no_cd then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_razor_unstable_current_custom_cd",
			{ duration = cd }
		)
	end

	local heroes = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)
	local creeps = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)

	local targets = {}

	if attacker then
		table.insert(targets, attacker)
	end

	for _, hero in pairs(heroes) do
		if #targets < self.count then
			if not attacker or attacker ~= hero then
				table.insert(targets, hero)
			end
		else
			break
		end
	end

	for _, creep in pairs(creeps) do
		if #targets < self.count then
			if not attacker or attacker ~= creep then
				table.insert(targets, creep)
			end
		else
			break
		end
	end

	local count = 0
	local ability_name = nil
	if no_cd then
		ability_name = "modifier_razor_current_4"
	end

	local damage_table = {
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage = self.damage + self.parent:GetTalentValue("modifier_razor_current_1", "damage"),
	}
	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_razor/razor_unstable_current.vpcf",
		self
	)

	for _, target in pairs(targets) do
		local effect_cast = ParticleManager:CreateParticle(particle_name, PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		damage_table.victim = target

		self.ability:ApplySlow(target)

		if
			spell
			and attacker
			and attacker == target
			and not target:HasModifier("modifier_razor_unstable_current_custom_stun_cd")
			and self.parent:HasTalent("modifier_razor_current_6")
		then
			attacker:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_stunned",
				{ duration = (1 - attacker:GetStatusResistance()) * self.stun_duration }
			)
			attacker:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_razor_unstable_current_custom_stun_cd",
				{ duration = self.stun_cd }
			)

			ParticleManager:ReleaseParticleIndex(
				ParticleManager:CreateParticle(
					"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					attacker
				)
			)
			attacker:EmitSound("Razor.Surge_stun")
		end

		local real_damage = DoDamage(damage_table, ability_name)

		if self.parent:GetQuest() == "Razor.Quest_7" and target:IsRealHero() then
			self.parent:UpdateQuest(1)
		end

		target:EmitSound("Hero_Razor.UnstableCurrent.Target")

		if self.parent:HasTalent("modifier_razor_current_4") then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_razor_unstable_current_custom_damage",
				{ duration = self.damage_duration }
			)
		end

		count = count + 1
		if count >= self.count then
			break
		end
	end

	if
		#targets > 0
		and self.parent:HasTalent("modifier_razor_current_7")
		and not self.parent:HasModifier("modifier_razor_unstable_current_custom_legendary")
	then
		self.parent:CdAbility(self.ability, self.legendary_cd, nil, "modifier_razor_current_7")
	end
end

function modifier_razor_unstable_current_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if params.unit:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if not params.target then
		return
	end
	if params.target ~= self.parent then
		return
	end

	if self.parent:HasTalent("modifier_razor_current_3") then
		for i = 1, self.stats_stack do
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_razor_unstable_current_custom_stats",
				{ duration = self.stats_duration }
			)
		end
	end

	if params.ability:IsItem() and not self.parent:HasTalent("modifier_razor_current_6") then
		return
	end
	if self.parent:HasModifier("modifier_razor_unstable_current_custom_cd") then
		return
	end

	self:PassiveProc(params.unit, false, true)
end

function modifier_razor_unstable_current_custom:AttackEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.target then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end

	if self.parent:HasTalent("modifier_razor_current_3") then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_razor_unstable_current_custom_stats",
			{ duration = self.stats_duration }
		)
	end

	if self.parent:HasModifier("modifier_razor_unstable_current_custom_cd") then
		return
	end
	local chance = self.chance + self.parent:GetTalentValue("modifier_razor_current_2", "chance")

	if RollPseudoRandomPercentage(chance, 3180, self.parent) then
		self:PassiveProc(params.attacker)
	end
end

modifier_razor_unstable_current_custom_slow = class({})
function modifier_razor_unstable_current_custom_slow:IsHidden()
	return false
end
function modifier_razor_unstable_current_custom_slow:IsPurgable()
	return true
end
function modifier_razor_unstable_current_custom_slow:OnCreated()
	self.slow = self:GetAbility():GetSpecialValueFor("strike_move_slow_pct") * -1
end

function modifier_razor_unstable_current_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_razor_unstable_current_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_razor_unstable_current_custom_cd = class({})
function modifier_razor_unstable_current_custom_cd:IsHidden()
	return false
end
function modifier_razor_unstable_current_custom_cd:IsPurgable()
	return false
end
function modifier_razor_unstable_current_custom_cd:IsDebuff()
	return true
end

modifier_razor_unstable_current_custom_legendary = class({})
function modifier_razor_unstable_current_custom_legendary:IsHidden()
	return true
end
function modifier_razor_unstable_current_custom_legendary:IsPurgable()
	return false
end
function modifier_razor_unstable_current_custom_legendary:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.slow = self.parent:GetTalentValue("modifier_razor_current_7", "slow")
	self.full_time = self:GetDuration()

	self.max_distance = self.parent:GetTalentValue("modifier_razor_current_7", "max_distance")
	self.speed = self.parent:GetTalentValue("modifier_razor_current_7", "charge_speed")

	if not IsServer() then
		return
	end

	self.parent:EmitSound("Razor.Surge_cast")
	self.parent:EmitSound("Razor.Surge_cast_loop")
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_razor_current",
		{ state = 1, range = self.max_distance }
	)

	self.particle = self.parent:GenericParticle("particles/razor/surge_stacks.vpcf", self, true)

	self.visual_count = 6
	self:VisualStack()

	self.stack = self.full_time / self.visual_count
	self.count = 0
	self.interval = 0.01

	self.effect_stack = 0.3
	self.effect_count = 0

	self:StartIntervalThink(self.interval)
end

function modifier_razor_unstable_current_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

function modifier_razor_unstable_current_custom_legendary:Particle()
	if not IsServer() then
		return
	end
	if not self.aim_particle then
		return
	end

	local distance = (self:GetElapsedTime() / self.full_time) * self.max_distance

	local point = self.parent:GetAbsOrigin() + self.parent:GetForwardVector() * distance

	ParticleManager:SetParticleControl(self.aim_particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.aim_particle, 1, point)
end

function modifier_razor_unstable_current_custom_legendary:VisualStack()
	if not IsServer() then
		return
	end
	if not self.particle then
		return
	end

	for i = 1, self.visual_count do
		if i <= self:GetStackCount() then
			ParticleManager:SetParticleControl(self.particle, i, Vector(1, 0, 0))
		else
			ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
		end
	end
end

function modifier_razor_unstable_current_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.count = self.count + self.interval

	if self.count >= self.stack then
		self.count = 0
		self:IncrementStackCount()
		self:VisualStack()
	end

	self.effect_count = self.effect_count + self.interval

	if self.effect_count < self.effect_stack then
		return
	end
	self.effect_count = 0

	self.parent:EmitSound("Razor.Surge_cast_lightning")

	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetAbsOrigin(), self.max_distance, self.effect_stack, false)

	local point = self.parent:GetAbsOrigin() + RandomVector(150)

	local cast_particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(cast_particle, 0, point)
	ParticleManager:SetParticleControl(cast_particle, 1, self.parent:GetAbsOrigin() + Vector(0, 0, 150))
	ParticleManager:SetParticleControl(cast_particle, 2, point)
	ParticleManager:ReleaseParticleIndex(cast_particle)

	self.parent:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")
end

function modifier_razor_unstable_current_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_razor_unstable_current_custom_legendary:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_razor_unstable_current_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Razor.Surge_cast_loop")
	self.parent:StopSound("Razor.Surge_cast")
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_razor_current",
		{ state = 2 }
	)

	self.ability:EndCd(0)
	self.ability:UseResources(false, false, false, true)

	local distance = (self:GetElapsedTime() / self.full_time) * self.max_distance

	local duration = distance / self.speed
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_razor_unstable_current_custom_legendary_charge",
		{ distance = distance, duration = duration }
	)
end

modifier_razor_unstable_current_custom_legendary_charge = class({})
function modifier_razor_unstable_current_custom_legendary_charge:IsHidden()
	return true
end
function modifier_razor_unstable_current_custom_legendary_charge:IsPurgable()
	return false
end

function modifier_razor_unstable_current_custom_legendary_charge:OnCreated(kv)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:AddOrderEvent(self)

	self.pfx = ParticleManager:CreateParticle("particles/razor/surge_speed.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.pfx, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.pfx, 1, self.parent:GetAbsOrigin())
	self:AddParticle(self.pfx, false, false, -1, false, false)

	self.parent:EmitSound("Razor.Surge_charge_1")
	self.parent:EmitSound("Razor.Surge_charge_2")

	self.parent:StartGesture(ACT_DOTA_RUN)

	self.speed = self.parent:GetTalentValue("modifier_razor_current_7", "charge_speed")
	self.stun = self.parent:GetTalentValue("modifier_razor_current_7", "stun")
	self.stun_knock = self.parent:GetTalentValue("modifier_razor_current_7", "stun_knock")
	self.max_distance = self.parent:GetTalentValue("modifier_razor_current_7", "max_distance")

	self.k = math.min(1, kv.distance / self.max_distance)
		* self.parent:GetTalentValue("modifier_razor_current_7", "max_damage")
		/ 100

	self.damage_table = { attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self.dt = 0.01
	self.aoe = 150

	self.distance = kv.distance / (kv.duration / self.dt)

	self.angle = self.parent:GetForwardVector():Normalized()
	self.origin = self.parent:GetAbsOrigin()

	self.targets = {}

	self.effect_count = 0
	self.effect_stack = 0.1

	self:StartIntervalThink(self.dt)
end

function modifier_razor_unstable_current_custom_legendary_charge:OnIntervalThink()
	if not IsServer() then
		return
	end

	if
		self.parent:IsCurrentlyVerticalMotionControlled()
		or self.parent:IsCurrentlyHorizontalMotionControlled()
		or self.parent:IsHexed()
		or self.parent:IsStunned()
	then
		self:Destroy()
		return
	end

	self:Motion()
	self:CheckTargets()

	self.effect_count = self.effect_count + self.dt

	if self.effect_count < self.effect_stack then
		return
	end

	self.effect_count = 0

	local point = self.parent:GetAbsOrigin() + RandomVector(150)

	local cast_particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		cast_particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(cast_particle, 1, point)
	ParticleManager:SetParticleControlEnt(
		cast_particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(cast_particle)

	ParticleManager:ReleaseParticleIndex(
		ParticleManager:CreateParticle(
			"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
	)
end

function modifier_razor_unstable_current_custom_legendary_charge:Motion()
	if not IsServer() then
		return
	end

	local pos = self.parent:GetAbsOrigin()
	GridNav:DestroyTreesAroundPoint(pos, 80, false)

	local pos_p = self.angle * self.distance

	local next_pos = GetGroundPosition(pos + pos_p, self.parent)
	self.parent:SetAbsOrigin(next_pos)
end

function modifier_razor_unstable_current_custom_legendary_charge:CheckTargets()
	if not IsServer() then
		return
	end

	local targets = self.parent:FindTargets(self.aoe)

	for _, target in pairs(targets) do
		if not self.targets[target] then
			self.targets[target] = true

			target:EmitSound("Razor.Surge_charge_damage")

			ParticleManager:ReleaseParticleIndex(
				ParticleManager:CreateParticle(
					"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					target
				)
			)

			self.damage_table.victim = target
			self.damage_table.damage = self.parent:GetAverageTrueAttackDamage(nil) * self.k
			self.ability:ApplySlow(target)

			DoDamage(self.damage_table, "modifier_razor_current_7")
			if not (target:IsCurrentlyHorizontalMotionControlled() or target:IsCurrentlyVerticalMotionControlled()) then
				local direction = target:GetOrigin() - self.parent:GetAbsOrigin()
				direction.z = 0
				direction = direction:Normalized()

				local knockbackProperties = {
					center_x = self.parent:GetOrigin().x,
					center_y = self.parent:GetOrigin().y,
					center_z = self.parent:GetOrigin().z,
					duration = self.stun,
					knockback_duration = self.stun,
					knockback_distance = self.stun_knock,
					knockback_height = 30,
					should_stun = 1,
				}
				target:AddNewModifier(self.parent, self, "modifier_knockback", knockbackProperties)
			end
		end
	end
end

function modifier_razor_unstable_current_custom_legendary_charge:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

function modifier_razor_unstable_current_custom_legendary_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_razor_unstable_current_custom_legendary_charge:OrderEvent(params)
	if params.order_type == DOTA_UNIT_ORDER_STOP or params.order_type == DOTA_UNIT_ORDER_HOLD_POSITION then
		self:Destroy()
	end
end

function modifier_razor_unstable_current_custom_legendary_charge:GetActivityTranslationModifiers()
	return "haste"
end
function modifier_razor_unstable_current_custom_legendary_charge:GetModifierDisableTurning()
	return 1
end
function modifier_razor_unstable_current_custom_legendary_charge:GetEffectName()
	return ""
end
function modifier_razor_unstable_current_custom_legendary_charge:GetStatusEffectName()
	return "particles/status_fx/status_effect_forcestaff.vpcf"
end
function modifier_razor_unstable_current_custom_legendary_charge:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end

function modifier_razor_unstable_current_custom_legendary_charge:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:FadeGesture(ACT_DOTA_RUN)

	local dir = self.parent:GetForwardVector()
	dir.z = 0
	self.parent:SetForwardVector(dir)
	self.parent:FaceTowards(self.parent:GetAbsOrigin() + dir * 10)

	ResolveNPCPositions(self.parent:GetAbsOrigin(), 128)
end

modifier_razor_unstable_current_custom_damage = class({})
function modifier_razor_unstable_current_custom_damage:IsHidden()
	return false
end
function modifier_razor_unstable_current_custom_damage:IsPurgable()
	return false
end
function modifier_razor_unstable_current_custom_damage:GetTexture()
	return "buffs/bolt_items"
end
function modifier_razor_unstable_current_custom_damage:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.damage = self.caster:GetTalentValue("modifier_razor_current_4", "damage")
	self.max = self.caster:GetTalentValue("modifier_razor_current_4", "max")
	if not IsServer() then
		return
	end

	self:SetStackCount(1)
	self.particle =
		ParticleManager:CreateParticle("particles/razor/surge_damage_stack.vpcf", PATTACH_OVERHEAD_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
	self:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_razor_unstable_current_custom_damage:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self.particle then
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
	end
end

function modifier_razor_unstable_current_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_razor_unstable_current_custom_damage:GetModifierIncomingDamage_Percentage(params)
	if IsServer() and (not params.attacker or params.attacker:FindOwner() ~= self.caster) then
		return
	end
	return self.damage * self:GetStackCount()
end

modifier_razor_unstable_current_custom_heal = class({})
function modifier_razor_unstable_current_custom_heal:IsHidden()
	return false
end
function modifier_razor_unstable_current_custom_heal:IsPurgable()
	return false
end
function modifier_razor_unstable_current_custom_heal:GetTexture()
	return "buffs/surge_heal"
end
function modifier_razor_unstable_current_custom_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_razor_unstable_current_custom_heal:OnCreated()
	self.heal = self:GetCaster():GetTalentValue("modifier_razor_current_2", "heal")
		/ self:GetCaster():GetTalentValue("modifier_razor_current_2", "duration")
end

function modifier_razor_unstable_current_custom_heal:GetModifierHealthRegenPercentage()
	return self.heal
end

modifier_razor_unstable_current_custom_stun_cd = class({})
function modifier_razor_unstable_current_custom_stun_cd:IsHidden()
	return true
end
function modifier_razor_unstable_current_custom_stun_cd:IsPurgable()
	return false
end
function modifier_razor_unstable_current_custom_stun_cd:OnCreated()
	self.RemoveForDuel = true
end

function modifier_razor_unstable_current_custom_stun_cd:RemoveOnDeath()
	return false
end

modifier_razor_unstable_current_custom_stats = class({})
function modifier_razor_unstable_current_custom_stats:IsHidden()
	return false
end
function modifier_razor_unstable_current_custom_stats:IsPurgable()
	return false
end
function modifier_razor_unstable_current_custom_stats:GetTexture()
	return "buffs/surge_stats"
end
function modifier_razor_unstable_current_custom_stats:OnCreated()
	self.parent = self:GetParent()
	self.max = self.parent:GetTalentValue("modifier_razor_current_3", "max")
	self.agi = self.parent:GetTalentValue("modifier_razor_current_3", "agi")
	self.str = self.parent:GetTalentValue("modifier_razor_current_3", "str")

	if not IsServer() then
		return
	end
	self:SetStackCount(1)
	self.parent:CalculateStatBonus(true)
end

function modifier_razor_unstable_current_custom_stats:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_razor_unstable_current_custom_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
	}
end

function modifier_razor_unstable_current_custom_stats:GetModifierBonusStats_Agility()
	return self:GetStackCount() * self.agi
end

function modifier_razor_unstable_current_custom_stats:GetModifierBonusStats_Strength()
	return self:GetStackCount() * self.str
end