--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_harpoon_custom", "abilities/items/item_harpoon_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_harpoon_custom_pull",
	"abilities/items/item_harpoon_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier("modifier_item_harpoon_custom_speed", "abilities/items/item_harpoon_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_harpoon_custom_cd", "abilities/items/item_harpoon_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_harpoon_custom_slow", "abilities/items/item_harpoon_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_harpoon_custom_thinker", "abilities/items/item_harpoon_custom", LUA_MODIFIER_MOTION_NONE)

item_harpoon_custom = class({})

function item_harpoon_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items_fx/harpoon_projectile.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/harpoon_pull.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_forcestaff.vpcf", context)
end

function item_harpoon_custom:GetIntrinsicModifierName()
	return "modifier_item_harpoon_custom"
end

function item_harpoon_custom:Spawn()
	self.projectile_speed = self:GetSpecialValueFor("projectile_speed")
	self.min_distance = self:GetSpecialValueFor("min_distance")
	self.pull_duration = self:GetSpecialValueFor("pull_duration")
	self.damage = self:GetSpecialValueFor("damage")
	self.slow_duration = self:GetSpecialValueFor("slow_duration")
	self.bonus_intellect = self:GetSpecialValueFor("bonus_intellect")
	self.bonus_agility = self:GetSpecialValueFor("bonus_agility")
	self.bonus_mana_regen = self:GetSpecialValueFor("bonus_mana_regen")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_strength = self:GetSpecialValueFor("bonus_strength")
	self.passive_cooldown = self:GetSpecialValueFor("passive_cooldown")
	self.speed = self:GetSpecialValueFor("speed")
end

function item_harpoon_custom:OnAbilityPhaseStart()
	local target = self:GetCursorTarget()
	if not target.IsTree and not IsTree(target) then
		return false
	end
	return true
end

function item_harpoon_custom:OnSpellStart()
	local caster = self:GetCaster()
	local target = self:GetCursorTarget()

	caster:EmitSound("Item.Harpoon.Cast")

	if not IsTree(target) and target:TriggerSpellAbsorb(self) then
		return nil
	end

	local cast_target

	if IsTree(target) then
		local point = GetGroundPosition(target:GetAbsOrigin(), nil)
		cast_target = CreateUnitByName(
			"npc_dota_ember_spirit_remnant_custom",
			point,
			false,
			caster,
			caster,
			caster:GetTeamNumber()
		)
		cast_target:AddNewModifier(caster, self, "modifier_item_harpoon_custom_thinker", { duration = 5 })
		cast_target:SetAbsOrigin(point + Vector(0, 0, 120))
	else
		cast_target = target
	end

	local projectile = {
		Target = cast_target,
		Source = caster,
		Ability = self,
		EffectName = "particles/items_fx/harpoon_projectile.vpcf",
		iMoveSpeed = self.projectile_speed,
		vSourceLoc = caster:GetAbsOrigin(),
		bDodgeable = false,
		bProvidesVision = false,
	}
	ProjectileManager:CreateTrackingProjectile(projectile)
end

function item_harpoon_custom:OnProjectileHit(target, vLocation)
	if not target then
		return
	end
	local caster = self:GetCaster()
	local is_tree = target:HasModifier("modifier_item_harpoon_custom_thinker")
	local duration = self.pull_duration

	target:EmitSound("Item.Harpoon.Target")

	if is_tree then
		duration = duration * 1.3
	else
		DoDamage({
			victim = target,
			attacker = caster,
			ability = self,
			damage_type = DAMAGE_TYPE_PURE,
			damage = self.damage,
		})
		if (target:GetAbsOrigin() - caster:GetAbsOrigin()):Length2D() <= self.min_distance then
			return
		end
		target:AddNewModifier(
			caster,
			self,
			"modifier_item_harpoon_custom_slow",
			{ duration = (1 - target:GetStatusResistance()) * self.slow_duration }
		)
		target:AddNewModifier(
			caster,
			self,
			"modifier_item_harpoon_custom_pull",
			{ duration = duration, target = caster:entindex() }
		)
	end

	caster:AddNewModifier(
		caster,
		self,
		"modifier_item_harpoon_custom_pull",
		{ duration = duration, target = target:entindex(), is_tree = is_tree }
	)
end

modifier_item_harpoon_custom_pull = class(mod_hidden)
function modifier_item_harpoon_custom_pull:GetStatusEffectName()
	return "particles/status_fx/status_effect_forcestaff.vpcf"
end
function modifier_item_harpoon_custom_pull:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_item_harpoon_custom_pull:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.target = EntIndexToHScript(params.target)

	local player_id = self.caster:GetPlayerOwnerID()
	local custom_effect_data = shop:GetCurrentEffectData(player_id, "effect_force_staff")
	local pfx_name = "particles/items_fx/harpoon_pull.vpcf"
	if custom_effect_data then
		pfx_name = custom_effect_data[1]
	end
	self.parent:GenericParticle(pfx_name, self)

	self.is_tree = params.is_tree
	self.parent:StartGesture(ACT_DOTA_FLAIL)

	self.angle = (self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()

	if self.is_tree == 1 then
		self.point = self.target:GetAbsOrigin()
		UTIL_Remove(self.target)
	else
		self.point = (self.parent:GetAbsOrigin() + self.target:GetAbsOrigin()) / 2
		self.point = self.point - self.angle * 50
	end

	self.speed = (self.parent:GetAbsOrigin() - self.point):Length2D() / self:GetRemainingTime()

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_item_harpoon_custom_pull:OnDestroy()
	if not IsServer() then
		return
	end

	if not self.parent:IsDebuffImmune() then
		self.parent:InterruptMotionControllers(true)
	end

	local dir = self.parent:GetForwardVector()
	if IsValid(self.target) then
		dir = (self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
	end
	self.parent:FacePoint(self.parent:GetAbsOrigin() + dir)

	self.parent:FadeGesture(ACT_DOTA_FLAIL)
	ResolveNPCPositions(self.parent:GetAbsOrigin(), 128)
end

function modifier_item_harpoon_custom_pull:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	if (not IsValid(self.target) or not self.target:IsAlive()) and self.is_tree == 0 then
		self:Destroy()
		return
	end

	local origin = self.parent:GetOrigin()

	local direction = self.point - origin
	direction.z = 0
	local distance = direction:Length2D()
	direction = direction:Normalized()

	local flPad = self.parent:GetPaddedCollisionRadius()

	if distance < flPad then
		self:Destroy()
	elseif distance > 1500 then
		self:Destroy()
	end

	GridNav:DestroyTreesAroundPoint(origin, 80, false)
	local target = origin + direction * self.speed * dt
	self.parent:SetOrigin(target)

	self.parent:FaceTowards(self.point)
end

function modifier_item_harpoon_custom_pull:OnHorizontalMotionInterrupted()
	self:Destroy()
end

modifier_item_harpoon_custom = class(mod_hidden)
function modifier_item_harpoon_custom:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if
		self.parent:IsRealHero() and not self.parent:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
	then
		self.parent:AddAttackStartEvent_out(self)
		self.parent:AddProc(self, { group = "echo_harpoon", priority = 1, extra = false, any = true })
	end

	self.int = self.ability.bonus_intellect
	self.agi = self.ability.bonus_agility
	self.regen = self.ability.bonus_mana_regen
	self.damage = self.ability.bonus_damage
	self.str = self.ability.bonus_strength
	self.slow_duration = self.ability.slow_duration
end

function modifier_item_harpoon_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
	}
end

function modifier_item_harpoon_custom:StartSpeed(target, slow)
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	if self.parent:HasModifier("modifier_marci_unleash_custom") then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_item_harpoon_custom_cd",
		{ duration = self.ability.passive_cooldown * self.parent:GetCooldownReduction() }
	)
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_item_harpoon_custom_speed", {})

	if not self.ability then
		return
	end
	if not target:IsUnit() then
		return
	end
	if not slow then
		return
	end
	target:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_item_harpoon_custom_slow",
		{ duration = (1 - target:GetStatusResistance()) * self.slow_duration }
	)
end

function modifier_item_harpoon_custom:GetProcChance()
	if self.parent:IsRangedAttacker() then
		return 0
	end
	if self.parent:HasModifier("modifier_item_harpoon_custom_cd") then
		return 0
	end
	return 100
end

function modifier_item_harpoon_custom:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_item_harpoon_custom_speed")
	if mod then
		params.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_item_harpoon_custom_slow",
			{ duration = (1 - params.target:GetStatusResistance()) * self.slow_duration }
		)
		mod:Destroy()
	end

	if not params.procs or not params.procs[self] then
		return
	end
	self:StartSpeed(params.target, true)
end

function modifier_item_harpoon_custom:GetModifierBonusStats_Intellect()
	return self.int
end

function modifier_item_harpoon_custom:GetModifierBonusStats_Agility()
	return self.agi
end

function modifier_item_harpoon_custom:GetModifierConstantManaRegen()
	return self.regen
end

function modifier_item_harpoon_custom:GetModifierPreAttack_BonusDamage()
	return self.damage
end

function modifier_item_harpoon_custom:GetModifierBonusStats_Strength()
	return self.str
end

modifier_item_harpoon_custom_cd = class(mod_visible)
function modifier_item_harpoon_custom_cd:RemoveOnDeath()
	return false
end
function modifier_item_harpoon_custom_cd:IsDebuff()
	return true
end

modifier_item_harpoon_custom_speed = class(mod_hidden)
function modifier_item_harpoon_custom_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.name = self.ability:GetName()
	self.speed = self.ability.speed

	if not IsServer() then
		return
	end
	self:StartIntervalThink(0.2)
end

function modifier_item_harpoon_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_item_harpoon_custom_speed:GetModifierAttackSpeedBonus_Constant(params)
	if not params.target then
		return
	end
	return self.speed
end

function modifier_item_harpoon_custom_speed:OnIntervalThink()
	if not IsServer() then
		return
	end

	local item = self.parent:FindItemInInventory(self.name)

	if not item or item:IsInBackpack() or self.parent:IsRangedAttacker() or not self.ability then
		self:Destroy()
	end
end

modifier_item_harpoon_custom_slow = class(mod_visible)
function modifier_item_harpoon_custom_slow:IsPurgable()
	return true
end
function modifier_item_harpoon_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_item_harpoon_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return -100
end

modifier_item_harpoon_custom_thinker = class(mod_hidden)
function modifier_item_harpoon_custom_thinker:OnCreated()
	self.parent = self:GetParent()
end

function modifier_item_harpoon_custom_thinker:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_TEAM_MOVE_TO] = true,
		[MODIFIER_STATE_NO_TEAM_SELECT] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
	}
end

function modifier_item_harpoon_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	UTIL_Remove(self.parent)
end