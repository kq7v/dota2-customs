--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_counter",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_tracker",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_legendary_buff",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_huskar_spears_7"
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_legendary_debuff",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_huskar_spears_7"
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_speed",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_huskar_spears_1"
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_fear_cd",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_attack",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_double",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_double_damage",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_burning_spear_double_slow",
	"abilities/huskar/custom_huskar_burning_spear",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_huskar_spears_3"
)

custom_huskar_burning_spear = class({})
custom_huskar_burning_spear.talents = {}

function custom_huskar_burning_spear:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_huskar/huskar_burning_spear.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_fast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/orange_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_huskar/huskar_burning_spear_debuff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_huskar/huskar_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_spears_legen.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_hands.vpcf", context)
	PrecacheResource("particle", "particles/huskar/double_spear.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_stack.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		context
	)
end

function custom_huskar_burning_spear:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_speed = 0,
			w1_max = caster:GetTalentValue("modifier_huskar_spears_1", "max", true),
			w1_duration = caster:GetTalentValue("modifier_huskar_spears_1", "duration", true),

			w2_range = 0,
			w2_move = 0,

			has_w3 = 0,
			w3_chance = 0,
			w3_delay = caster:GetTalentValue("modifier_huskar_spears_3", "delay", true),
			w3_duration = caster:GetTalentValue("modifier_huskar_spears_3", "duration", true),
			w3_damage = caster:GetTalentValue("modifier_huskar_spears_3", "damage", true),
			w3_slow = caster:GetTalentValue("modifier_huskar_spears_3", "slow", true),
			w3_knock_range = caster:GetTalentValue("modifier_huskar_spears_3", "knock_range", true),

			has_w4 = 0,
			w4_fear = caster:GetTalentValue("modifier_huskar_spears_4", "fear", true),
			w4_slow = caster:GetTalentValue("modifier_huskar_spears_4", "slow", true),
			w4_max = caster:GetTalentValue("modifier_huskar_spears_4", "max", true),
			w4_talent_cd = caster:GetTalentValue("modifier_huskar_spears_4", "talent_cd", true),

			has_w7 = 0,
			w7_damage_creeps = caster:GetTalentValue("modifier_huskar_spears_7", "damage_creeps", true),
			w7_damage = caster:GetTalentValue("modifier_huskar_spears_7", "damage", true) / 100,

			has_e1 = 0,
			e1_damage = 0,
			e1_bonus = caster:GetTalentValue("modifier_huskar_passive_1", "bonus", true),

			h1_heal_inc = 0,
			h1_heal_reduce = 0,
			h1_max = caster:GetTalentValue("modifier_huskar_hero_1", "max", true),
		}
	end

	if caster:HasTalent("modifier_huskar_spears_1") then
		self.talents.has_w1 = 1
		self.talents.w1_speed = caster:GetTalentValue("modifier_huskar_spears_1", "speed")
	end

	if caster:HasTalent("modifier_huskar_spears_2") then
		self.talents.w2_range = caster:GetTalentValue("modifier_huskar_spears_2", "range")
		self.talents.w2_move = caster:GetTalentValue("modifier_huskar_spears_2", "move")
	end

	if caster:HasTalent("modifier_huskar_spears_3") then
		self.talents.has_w3 = 1
		self.talents.w3_chance = caster:GetTalentValue("modifier_huskar_spears_3", "chance")
		caster:AddProc(self.tracker, { extra = false })
	end

	if caster:HasTalent("modifier_huskar_spears_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_huskar_spears_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_huskar_passive_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_huskar_passive_1", "damage") / 100
	end

	if caster:HasTalent("modifier_huskar_hero_1") then
		self.talents.h1_heal_inc = caster:GetTalentValue("modifier_huskar_hero_1", "heal_inc")
		self.talents.h1_heal_reduce = caster:GetTalentValue("modifier_huskar_hero_1", "heal_reduce")
	end
end

function custom_huskar_burning_spear:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "huskar_burning_spear", self)
end

function custom_huskar_burning_spear:GetCastRange(vLocation, hTarget)
	return self.caster:Script_GetAttackRange() + (self.bonus_range or 0)
end

function custom_huskar_burning_spear:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_huskar_burning_spear_tracker"
end

function custom_huskar_burning_spear:GetHealthCost()
	if IsServer() then
		return
	end
	return self:GetCost()
end

function custom_huskar_burning_spear:GetCost()
	return (self.health_cost or 0) * self.caster:GetHealth()
end

function custom_huskar_burning_spear:GetAbilityTargetFlags()
	if self.talents.has_w7 == 1 then
		return DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
	end
	return DOTA_UNIT_TARGET_FLAG_NONE
end

function custom_huskar_burning_spear:OnProjectileHit_ExtraData(target, location, table)
	if not target then
		return
	end

	target:EmitSound("Huskar.Spear_double")

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

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_huskar_burning_spear_double_damage",
		{ duration = FrameTime() }
	)
	self.caster:PerformAttack(target, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_custom_huskar_burning_spear_double_damage")

	if table.spear == 1 then
		self:AddStack(target)
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_huskar_burning_spear_double_slow",
		{ duration = self.talents.w3_duration }
	)

	if not target:IsCurrentlyHorizontalMotionControlled() and not target:IsCurrentlyVerticalMotionControlled() then
		local dist = (target:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D()
		local knockback_dist = math.max(5, (1 - dist / 800) * self.talents.w3_knock_range)
		target:AddNewModifier(self.caster, self, "modifier_knockback", {
			should_stun = 0,
			knockback_duration = 0.1,
			duration = 0.1,
			knockback_distance = knockback_dist,
			knockback_height = 0,
			center_x = self.caster:GetAbsOrigin().x,
			center_y = self.caster:GetAbsOrigin().y,
			center_z = self.caster:GetAbsOrigin().z,
		})
	end
end

function custom_huskar_burning_spear:AddStack(target, double)
	if not IsServer() then
		return
	end
	if not target:IsUnit() then
		return
	end
	local duration = self.duration
	local count = 0

	for _, aoe_target in pairs(self.caster:FindTargets(self.radius, target:GetAbsOrigin())) do
		if aoe_target == target or count < self.aoe_max then
			if aoe_target ~= target then
				count = count + 1
			end
			aoe_target:AddNewModifier(
				self.caster,
				self.caster:BkbAbility(self, self.talents.has_w7 == 1),
				"modifier_custom_huskar_burning_spear_counter",
				{ duration = duration + 0.2 }
			)

			if self.caster:HasModifier("modifier_custom_huskar_burning_spear_legendary_buff") then
				aoe_target:AddNewModifier(
					self.caster,
					self,
					"modifier_custom_huskar_burning_spear_legendary_debuff",
					{ duration = duration + 0.2 }
				)
				if aoe_target:IsHero() then
					aoe_target:AddNewModifier(self.caster, self, "modifier_generic_vision", { duration = duration })
				end
			end
		end
	end
end

function custom_huskar_burning_spear:MakeSpear()
	if not IsServer() then
		return
	end
	local health_cost = self:GetCost()
	self.caster:EmitSound("Hero_Huskar.Burning_Spear.Cast")
	self.caster:SetHealth(math.max(self.caster:GetHealth() - health_cost, 1))
end

modifier_custom_huskar_burning_spear_counter = class(mod_visible)
function modifier_custom_huskar_burning_spear_counter:GetTexture()
	return self.ability:GetAbilityTextureName()
end
function modifier_custom_huskar_burning_spear_counter:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.burning_spears_ability
	if not self.ability then
		self:Destroy()
		return
	end

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_huskar/huskar_burning_spear_debuff.vpcf",
		self
	)

	self.parent:GenericParticle(particle_name, self)

	self.duration = self.ability.duration
	self.damage = self.ability.burn_damage
	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self:OnRefresh()
	self:StartIntervalThink(self.ability.interval)
end

function modifier_custom_huskar_burning_spear_counter:OnRefresh()
	if not IsServer() then
		return
	end

	self.parent:EmitSound("Hero_Huskar.Burning_Spear")
	self:IncrementStackCount()

	if
		self.ability.talents.has_w4 == 1
		and self:GetStackCount() >= self.ability.talents.w4_max
		and not self.parent:HasModifier("modifier_custom_huskar_burning_spear_fear_cd")
		and (self.ability.talents.has_w7 == 1 or not self.parent:IsDebuffImmune())
	then
		self.parent:EmitSound("Generic.Fear")
		self.parent:EmitSound("Huskar.Spear_fear")
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_custom_huskar_burning_spear_fear_cd",
			{ duration = self.ability.talents.w4_talent_cd }
		)
		self.parent:AddNewModifier(
			self.caster,
			self.caster:BkbAbility(self.ability, self.ability.talents.has_w7 == 1),
			"modifier_nevermore_requiem_fear",
			{ duration = self.ability.talents.w4_fear * (1 - self.parent:GetStatusResistance()) }
		)

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(particle, 1, self.parent:GetOrigin())
		ParticleManager:ReleaseParticleIndex(particle)
	end

	Timers:CreateTimer(self.duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)
end

function modifier_custom_huskar_burning_spear_counter:OnIntervalThink()
	if not IsServer() then
		return
	end
	local bonus = 0
	local mod = self.parent:FindModifierByName("modifier_custom_huskar_burning_spear_legendary_debuff")
	if mod then
		if self.parent:IsCreep() then
			bonus = mod:GetStackCount() * self.ability.talents.w7_damage_creeps
		else
			bonus = mod:GetStackCount() * self.ability.talents.w7_damage * self.parent:GetMaxHealth()
		end
	end

	local damage = self.damage * self:GetStackCount() + bonus
	if self.ability.talents.has_e1 == 1 then
		damage = damage
			* (
				1
				+ self.ability.talents.e1_damage
					* (self.caster:HasModifier("modifier_custom_huskar_berserkers_blood_bonus") and self.ability.talents.e1_bonus or 1)
			)
	end

	self.damageTable.damage = damage * self.ability.interval
	DoDamage(self.damageTable)
end

function modifier_custom_huskar_burning_spear_counter:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Hero_Huskar.Burning_Spear")
end

function modifier_custom_huskar_burning_spear_counter:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_custom_huskar_burning_spear_counter:GetModifierMoveSpeedBonus_Percentage()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_slow * math.min(self.ability.talents.w4_max, self:GetStackCount())
end

function modifier_custom_huskar_burning_spear_counter:GetModifierHealChange()
	return self.ability.talents.h1_heal_reduce * math.min(self.ability.talents.h1_max, self:GetStackCount())
end

function modifier_custom_huskar_burning_spear_counter:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.h1_heal_reduce * math.min(self.ability.talents.h1_max, self:GetStackCount())
end

modifier_custom_huskar_burning_spear_tracker = class(mod_hidden)
function modifier_custom_huskar_burning_spear_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.burning_spears_ability = self.ability

	self.parent.burning_spears_legendary_ability =
		self.parent:FindAbilityByName("custom_huskar_burning_spear_legendary")
	if IsValid(self.parent.burning_spears_legendary_ability) then
		self.parent.burning_spears_legendary_ability:UpdateTalents()
	end

	self.ability.health_cost = self.ability:GetSpecialValueFor("health_cost") / 100
	self.ability.burn_damage = self.ability:GetSpecialValueFor("burn_damage")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.bonus_range = self.ability:GetSpecialValueFor("bonus_range")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.aoe_max = self.ability:GetSpecialValueFor("aoe_max")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")

	if not IsServer() then
		return
	end

	self.parent:AddRecordDestroyEvent(self, true)
	self.parent:AddAttackRecordEvent_out(self)
	self.parent:AddAttackStartEvent_out(self)
	self.parent:AddProc(self, { name = "hit", land = true })
	self.parent:AddOrderEvent(self)

	self.records = {}
	self.cast = false
end

function modifier_custom_huskar_burning_spear_tracker:OnRefresh()
	self.ability.burn_damage = self.ability:GetSpecialValueFor("burn_damage")
end

function modifier_custom_huskar_burning_spear_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_custom_huskar_burning_spear_tracker:GetModifierHealChange()
	return self.ability.talents.h1_heal_inc
end

function modifier_custom_huskar_burning_spear_tracker:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.h1_heal_inc
end

function modifier_custom_huskar_burning_spear_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.w2_range
end

function modifier_custom_huskar_burning_spear_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.w2_move
end

function modifier_custom_huskar_burning_spear_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	self.parent:RemoveModifierByName("modifier_custom_huskar_burning_spear_attack")

	if
		self.parent:IsSilenced() and not self.parent:HasModifier("modifier_custom_huskar_burning_spear_legendary_buff")
	then
		return
	end
	if not self.ability:GetAutoCastState() and self.cast == false then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.target:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_custom_huskar_burning_spear_attack", {})
end

function modifier_custom_huskar_burning_spear_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.w3_chance
end

function modifier_custom_huskar_burning_spear_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if params.attacker ~= self.parent then
		return
	end
	local target = params.target
	local spear = 0

	if self.parent:HasModifier("modifier_custom_huskar_burning_spear_attack") then
		self.parent:RemoveModifierByName("modifier_custom_huskar_burning_spear_attack")
		self.cast = false
		self.records[params.record] = true
		self.ability:MakeSpear()
		spear = 1
	end

	if not params.procs or not params.procs[self] then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_huskar_burning_spear_double",
		{ target = target:entindex(), spear = spear, duration = self.ability.talents.w3_delay }
	)
end

function modifier_custom_huskar_burning_spear_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	if self.ability.talents.has_w1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_huskar_burning_spear_speed",
			{ duration = self.ability.talents.w1_duration }
		)
	end

	if not self.records[params.record] then
		return
	end
	self.ability:AddStack(params.target)
end

function modifier_custom_huskar_burning_spear_tracker:GetPriority()
	if self.parent:HasModifier("modifier_custom_huskar_burning_spear_attack") then
		return MODIFIER_PRIORITY_NORMAL
	end
	return MODIFIER_PRIORITY_LOW
end

function modifier_custom_huskar_burning_spear_tracker:GetModifierProjectileName()
	if self.parent:HasModifier("modifier_custom_huskar_burning_spear_attack") then
		return wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/units/heroes/hero_huskar/huskar_burning_spear.vpcf",
			self
		)
	end
	return wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_huskar/huskar_base_attack.vpcf",
		self
	)
end

function modifier_custom_huskar_burning_spear_tracker:RecordDestroyEvent(params)
	self.records[params.record] = nil
end

function modifier_custom_huskar_burning_spear_tracker:OrderEvent(params)
	self.cast = (params.ability and params.ability == self.ability) and true or false
end

modifier_custom_huskar_burning_spear_speed = class(mod_visible)
function modifier_custom_huskar_burning_spear_speed:GetTexture()
	return "buffs/huskar/burning_spears_1"
end
function modifier_custom_huskar_burning_spear_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w1_max
	self.speed = self.ability.talents.w1_speed
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_custom_huskar_burning_spear_speed:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_custom_huskar_burning_spear_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_custom_huskar_burning_spear_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed * self:GetStackCount()
end

modifier_custom_huskar_burning_spear_fear_cd = class(mod_hidden)
function modifier_custom_huskar_burning_spear_fear_cd:RemoveOnDeath()
	return false
end
function modifier_custom_huskar_burning_spear_fear_cd:OnCreated()
	self.RemoveForDuel = true
end

modifier_custom_huskar_burning_spear_attack = class(mod_hidden)

modifier_custom_huskar_burning_spear_double = class(mod_hidden)
function modifier_custom_huskar_burning_spear_double:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_custom_huskar_burning_spear_double:GetStatusEffectName()
	return "particles/status_fx/status_effect_slark_shadow_dance.vpcf"
end
function modifier_custom_huskar_burning_spear_double:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_custom_huskar_burning_spear_double:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.target = EntIndexToHScript(table.target)
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 2.5)
	self.spear = table.spear
	self.attack = self.spear == 1 and "particles/units/heroes/hero_huskar/huskar_burning_spear.vpcf"
		or "particles/units/heroes/hero_huskar/huskar_base_attack.vpcf"

	local scale = 100
	local mod = self.parent:FindModifierByName("modifier_custom_huskar_berserkers_blood")
	if mod then
		scale = scale + mod:GetModifierModelScale()
	end

	local dir = (self.target:GetOrigin() - self.parent:GetOrigin()):Normalized()
	local particle =
		ParticleManager:CreateParticle("particles/huskar/double_spear.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlForward(particle, 1, dir)
	ParticleManager:SetParticleControl(particle, 2, Vector(1, 1, 1))
	ParticleManager:SetParticleControl(particle, 3, Vector(scale, 1, 1))
	ParticleManager:SetParticleControlForward(particle, 5, dir)
	ParticleManager:ReleaseParticleIndex(particle)
	self.parent:EmitSound("Huskar.Spear_double_start")
end

function modifier_custom_huskar_burning_spear_double:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if not IsValid(self.target) then
		return
	end

	if self.spear == 1 then
		self.ability:MakeSpear()
	end

	self.info = {
		EffectName = self.attack,
		Ability = self.ability,
		iMoveSpeed = self.parent:GetProjectileSpeed(),
		Source = self.parent,
		Target = self.target,
		bDodgeable = true,
		bProvidesVision = true,
		iVisionTeamNumber = self.parent:GetTeamNumber(),
		iVisionRadius = 50,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		ExtraData = {
			spear = self.spear,
		},
	}
	ProjectileManager:CreateTrackingProjectile(self.info)
end

modifier_custom_huskar_burning_spear_double_damage = class(mod_hidden)
function modifier_custom_huskar_burning_spear_double_damage:OnCreated(table)
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.damage = self.ability.talents.w3_damage - 100
end

function modifier_custom_huskar_burning_spear_double_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_custom_huskar_burning_spear_double_damage:GetModifierDamageOutgoing_Percentage()
	return self.damage
end

modifier_custom_huskar_burning_spear_double_slow = class(mod_hidden)
function modifier_custom_huskar_burning_spear_double_slow:IsPurgable()
	return true
end
function modifier_custom_huskar_burning_spear_double_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move = self.ability.talents.w3_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", self, true)
end

function modifier_custom_huskar_burning_spear_double_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_custom_huskar_burning_spear_double_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

modifier_custom_huskar_burning_spear_legendary_debuff = class(mod_hidden)
function modifier_custom_huskar_burning_spear_legendary_debuff:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self.duration = self.ability.duration
	self:OnRefresh()
end

function modifier_custom_huskar_burning_spear_legendary_debuff:OnRefresh()
	if not IsServer() then
		return
	end

	self:IncrementStackCount()
	self.parent:SendNumber(6, self:GetStackCount())

	Timers:CreateTimer(self.duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)
end

custom_huskar_burning_spear_legendary = class({})
custom_huskar_burning_spear_legendary.talents = {}

function custom_huskar_burning_spear_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_huskar_spears_7", "duration", true),
			w7_damage_inc = caster:GetTalentValue("modifier_huskar_spears_7", "damage_inc", true),
			w7_talent_cd = caster:GetTalentValue("modifier_huskar_spears_7", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_huskar_spears_7") then
		self.talents.has_w7 = 1
	end
end

function custom_huskar_burning_spear_legendary:GetCooldown()
	return self.talents.has_w7 == 1 and self.talents.w7_talent_cd or 0
end

function custom_huskar_burning_spear_legendary:OnSpellStart()
	local particle = ParticleManager:CreateParticle("particles/huskar/huskar_fast.vpcf", PATTACH_ABSORIGIN, self.caster)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.caster:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	self.caster:EmitSound("Huskar.Spear_Cast")
	self.caster:EmitSound("Huskar.Spear_Cast_vo")
	self.caster:EmitSound("Huskar.Spear_Cast2")

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_huskar_burning_spear_legendary_buff",
		{ duration = self.talents.w7_duration }
	)
end

function custom_huskar_burning_spear_legendary:CreateTalent()
	self:SetLevel(1)
	self:SetHidden(false)
	self:UpdateTalents()
end

modifier_custom_huskar_burning_spear_legendary_buff = class(mod_visible)
function modifier_custom_huskar_burning_spear_legendary_buff:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_inc = self.ability.talents.w7_damage_inc

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/huskar/huskar_hands.vpcf", self)
	self.parent:GenericParticle(
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		self
	)
	self.max_duration = self.ability.talents.w7_duration

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(particle, 1, self.parent:GetOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	self.stack = -1
	self.effect_cast =
		self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_unleash_stack.vpcf", self, true)

	self.ability:EndCd()

	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_custom_huskar_burning_spear_legendary_buff:OnIntervalThink()
	if not IsServer() then
		return
	end
	local time = self:GetRemainingTime()

	if self.stack ~= math.floor(time) then
		self.stack = math.floor(time)
		if self.effect_cast then
			ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self.stack + 1, 0))
		end
	end

	self.parent:UpdateUIshort({
		max_time = self.max_duration,
		time = time,
		stack = time,
		use_zero = 1,
		priority = 0,
		style = "HuskarSpears",
	})
end

function modifier_custom_huskar_burning_spear_legendary_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 0, style = "HuskarSpears" })
end

function modifier_custom_huskar_burning_spear_legendary_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_custom_huskar_burning_spear_legendary_buff:GetModifierIncomingDamage_Percentage()
	return self.damage_inc
end