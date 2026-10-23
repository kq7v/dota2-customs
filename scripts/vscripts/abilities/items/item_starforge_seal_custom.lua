--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_starforge_seal_custom_burn",
	"abilities/items/item_starforge_seal_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_starforge_seal_custom_stats",
	"abilities/items/item_starforge_seal_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_starforge_seal_custom_aura",
	"abilities/items/item_starforge_seal_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_starforge_seal_custom_stun",
	"abilities/items/item_starforge_seal_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_starforge_seal_custom_thinker",
	"abilities/items/item_starforge_seal_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_starforge_seal_custom = class({})

function item_starforge_seal_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items/devastator_aoe.vpcf", context)
	PrecacheResource("particle", "particles/items/devastator/devastator_blast.vpcf", context)
	PrecacheResource("particle", "particles/items/devastator/devastator_impact.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/meteor_hammer_spell_debuff.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_stunned.vpcf", context)
end

function item_starforge_seal_custom:GetIntrinsicModifierName()
	return "modifier_item_starforge_seal_custom_stats"
end

function item_starforge_seal_custom:GetAOERadius()
	return self.impact_radius
end

function item_starforge_seal_custom:Spawn()
	self.stats_agi = self:GetSpecialValueFor("stats_agi")
	self.stats_str = self:GetSpecialValueFor("stats_str")
	self.stats_int = self:GetSpecialValueFor("stats_int")
	self.spell_amp = self:GetSpecialValueFor("spell_amp")
	self.health_bonus = self:GetSpecialValueFor("health_bonus") / 100
	self.range_bonus = self:GetSpecialValueFor("range_bonus")
	self.mana_bonus = self:GetSpecialValueFor("mana_bonus")
	self.mana_regen_multiplier = self:GetSpecialValueFor("mana_regen_multiplier")
	self.stun_duration = self:GetSpecialValueFor("stun_duration")
	self.impact_radius = self:GetSpecialValueFor("impact_radius")
	self.land_time = self:GetSpecialValueFor("land_time")
	self.max_duration = self:GetSpecialValueFor("max_duration")
	self.burn_interval = self:GetSpecialValueFor("burn_interval")
	self.movespeed_slow = self:GetSpecialValueFor("movespeed_slow")
	self.burn_duration = self:GetSpecialValueFor("burn_duration")
	self.damage_init_base = self:GetSpecialValueFor("damage_init_base")
	self.damage_init_int = self:GetSpecialValueFor("damage_init_int") / 100
	self.damage_burn_base = self:GetSpecialValueFor("damage_burn_base")
	self.damage_burn_int = self:GetSpecialValueFor("damage_burn_int") / 100
	self.cd_duo = self:GetSpecialValueFor("cd_duo")
	self.AbilityCooldown = self:GetSpecialValueFor("AbilityCooldown")
end

function item_starforge_seal_custom:GetCooldown(iLevel)
	local cd = self.AbilityCooldown
	if not IsSoloMode() then
		cd = self.cd_duo
	end
	return cd
end

function item_starforge_seal_custom:OnSpellStart()
	local caster = self:GetCaster()
	local position = self:GetCursorPosition()

	CreateModifierThinker(
		caster,
		self,
		"modifier_item_starforge_seal_custom_thinker",
		{ duration = self.max_duration, damage_k = self.multicast_k or 1 },
		position,
		caster:GetTeamNumber(),
		false
	)
end

modifier_item_starforge_seal_custom_thinker = class(mod_hidden)
function modifier_item_starforge_seal_custom_thinker:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.center = self.parent:GetAbsOrigin()

	self.impact_radius = self.ability.impact_radius
	self.stun_duration = self.ability.stun_duration
	self.damage_base = self.ability.damage_init_base
	self.damage_int = self.ability.damage_init_int
	self.burn_duration = self.ability.burn_duration
	self.damage_k = table.damage_k

	AddFOWViewer(self.caster:GetTeamNumber(), self.center, self.impact_radius * 1.2, self:GetRemainingTime() * 2, false)

	self.parent:EmitSound("Devastator.Channel")
	self.parent:EmitSound("Devastator.Channel2")

	self.particle = ParticleManager:CreateParticle("particles/items/devastator_aoe.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle, 0, self.center)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.impact_radius, 1, 1))
	ParticleManager:SetParticleControl(self.particle, 2, Vector(self:GetRemainingTime() + 0.1, 1, 1))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self:StartIntervalThink(self:GetRemainingTime() - self.ability.land_time)
end

function modifier_item_starforge_seal_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Devastator.Cast")
	self:StartIntervalThink(-1)
end

function modifier_item_starforge_seal_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Devastator.Channel")
	self.parent:StopSound("Devastator.Channel2")

	self.particle3 =
		ParticleManager:CreateParticle("particles/items/devastator/devastator_blast.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle3, 0, self.center)
	ParticleManager:SetParticleControl(self.particle3, 1, Vector(self.impact_radius, 1, 1))
	ParticleManager:ReleaseParticleIndex(self.particle3)

	self.particle4 =
		ParticleManager:CreateParticle("particles/items/devastator/devastator_impact.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle4, 0, self.center)
	ParticleManager:SetParticleControl(self.particle4, 3, self.center)
	ParticleManager:SetParticleControl(self.particle4, 1, Vector(self.impact_radius, 1, 1))
	ParticleManager:ReleaseParticleIndex(self.particle4)

	GridNav:DestroyTreesAroundPoint(self.center, self.impact_radius, true)

	EmitSoundOnLocationWithCaster(self.center, "Devastator.Impact", self.caster)
	EmitSoundOnLocationWithCaster(self.center, "Devastator.Impact2", self.caster)

	local damage = self.damage_base + self.damage_int * self.caster:GetIntellect(false)

	local damage_table = {
		damage = damage * self.damage_k,
		damage_type = DAMAGE_TYPE_MAGICAL,
		attacker = self.caster,
		ability = self.ability,
	}

	for _, enemy in pairs(self.caster:FindTargets(self.impact_radius, self.center)) do
		damage_table.victim = enemy
		DoDamage(damage_table)
		enemy:RemoveModifierByName("modifier_item_starforge_seal_custom_burn")
		enemy:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_item_starforge_seal_custom_burn",
			{ duration = self.burn_duration + 2 * FrameTime() }
		)
		enemy:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_item_starforge_seal_custom_stun",
			{ duration = self.stun_duration * (1 - enemy:GetStatusResistance()) }
		)
	end
end

modifier_item_starforge_seal_custom_burn = class(mod_visible)
function modifier_item_starforge_seal_custom_burn:IsPurgable()
	return true
end
function modifier_item_starforge_seal_custom_burn:GetEffectName()
	return "particles/items4_fx/meteor_hammer_spell_debuff.vpcf"
end
function modifier_item_starforge_seal_custom_burn:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not self.ability then
		self:Destroy()
		return
	end

	self.slow = self.ability.movespeed_slow
	if not IsServer() then
		return
	end

	local damage = self.ability.damage_burn_base + self.ability.damage_burn_int * self.caster:GetIntellect(false)
	self.damage_table = {
		victim = self.parent,
		damage = damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
		attacker = self.caster,
		ability = self.ability,
	}
	self:StartIntervalThink(self.ability.burn_interval)
end

function modifier_item_starforge_seal_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local damage = DoDamage(self.damage_table)
	self.parent:SendNumber(4, damage)
end

function modifier_item_starforge_seal_custom_burn:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_item_starforge_seal_custom_burn:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_item_starforge_seal_custom_stun = class(mod_hidden)
function modifier_item_starforge_seal_custom_stun:IsPurgeException()
	return true
end
function modifier_item_starforge_seal_custom_stun:IsStunDebuff()
	return true
end
function modifier_item_starforge_seal_custom_stun:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.anim_time = 0.3
	self.parent:GenericParticle("particles/generic_gameplay/generic_stunned.vpcf", self, true)

	if
		not self.parent:IsCurrentlyVerticalMotionControlled()
		and not self.parent:IsCurrentlyHorizontalMotionControlled()
	then
		self.mod = self.parent:AddNewModifier(self.caster, self.ability, "modifier_knockback", {
			center_x = self.parent:GetAbsOrigin().x,
			center_y = self.parent:GetAbsOrigin().y,
			knockback_distance = 0,
			knockback_height = 130,
			duration = self.anim_time,
			knockback_duration = self.anim_time,
			should_stun = true,
		})

		self.parent:StartGesture(ACT_DOTA_FLAIL)
		self:StartIntervalThink(self.anim_time)
	else
		self.parent:StartGesture(ACT_DOTA_DISABLED)
	end
end

function modifier_item_starforge_seal_custom_stun:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:RemoveGesture(ACT_DOTA_FLAIL)
	self.parent:StartGesture(ACT_DOTA_DISABLED)
	self:StartIntervalThink(-1)
end

function modifier_item_starforge_seal_custom_stun:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

function modifier_item_starforge_seal_custom_stun:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.mod) then
		self.mod:Destroy()
	end

	self.parent:FadeGesture(ACT_DOTA_DISABLED)
	self.parent:RemoveGesture(ACT_DOTA_FLAIL)
end

modifier_item_starforge_seal_custom_stats = class(mod_hidden)
function modifier_item_starforge_seal_custom_stats:GetUniqueStat(name)
	return self[name]
end
function modifier_item_starforge_seal_custom_stats:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.spell_amp = self.ability.spell_amp
	self.mana_regen = self.ability.mana_regen_multiplier
	self.mana_health = self.ability.health_bonus
	self.parent:AddUniqueStat(self, "spell_amp", "mana_regen", "mana_health")
end

function modifier_item_starforge_seal_custom_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MANA_BONUS,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_starforge_seal_custom_stats:GetModifierBonusStats_Agility()
	return self.ability.stats_agi
end

function modifier_item_starforge_seal_custom_stats:GetModifierBonusStats_Strength()
	return self.ability.stats_str
end

function modifier_item_starforge_seal_custom_stats:GetModifierBonusStats_Intellect()
	return self.ability.stats_int
end

function modifier_item_starforge_seal_custom_stats:GetModifierManaBonus()
	return self.ability.mana_bonus
end

function modifier_item_starforge_seal_custom_stats:GetModifierHealthBonus()
	local bonus = self.parent:UniqueStat(self, "mana_health")
	if not bonus then
		return
	end
	return bonus * self.parent:GetMaxMana()
end

function modifier_item_starforge_seal_custom_stats:GetModifierCastRangeBonusStacking()
	return self.ability.range_bonus
end

function modifier_item_starforge_seal_custom_stats:GetModifierSpellAmplify_Percentage()
	return self.parent:UniqueStat(self, "spell_amp")
end

function modifier_item_starforge_seal_custom_stats:GetModifierMPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "mana_regen")
end