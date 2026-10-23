--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_meteor_hammer_custom_burn",
	"abilities/items/item_meteor_hammer_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_meteor_hammer_custom_stats",
	"abilities/items/item_meteor_hammer_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_meteor_hammer_custom_cast",
	"abilities/items/item_meteor_hammer_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_meteor_hammer_custom = class({})

function item_meteor_hammer_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items4_fx/meteor_hammer_aoe.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/meteor_hammer_cast.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/meteor_hammer_spell.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/meteor_hammer_spell_debuff.vpcf", context)
end

function item_meteor_hammer_custom:GetIntrinsicModifierName()
	return "modifier_item_meteor_hammer_custom_stats"
end

function item_meteor_hammer_custom:Spawn()
	self.impact_radius = self:GetSpecialValueFor("impact_radius")
	self.max_duration = self:GetSpecialValueFor("max_duration")
	self.burn_duration = self:GetSpecialValueFor("burn_duration")
	self.burn_interval = self:GetSpecialValueFor("burn_interval")
	self.land_time = self:GetSpecialValueFor("land_time")
	self.impact_damage_units = self:GetSpecialValueFor("impact_damage_units")
	self.stun_duration = self:GetSpecialValueFor("stun_duration")
	self.movespeed_slow = self:GetSpecialValueFor("movespeed_slow")
	self.burn_dps_units = self:GetSpecialValueFor("burn_dps_units")
	self.stats_agi = self:GetSpecialValueFor("stats_agi")
	self.stats_str = self:GetSpecialValueFor("stats_str")
	self.stats_int = self:GetSpecialValueFor("stats_int")
	self.spell_amp = self:GetSpecialValueFor("spell_amp")
	self.mana_regen_multiplier = self:GetSpecialValueFor("mana_regen_multiplier")
	self.health_bonus = self:GetSpecialValueFor("health_bonus")
end

function item_meteor_hammer_custom:GetAOERadius()
	return self.impact_radius
end

function item_meteor_hammer_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "item_meteor_hammer", self)
end

function item_meteor_hammer_custom:GetChannelTime()
	return self.max_duration
end

function item_meteor_hammer_custom:OnSpellStart()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_item_meteor_hammer_custom_cast",
		{ duration = self.max_duration }
	)

	local position = self:GetCursorPosition()

	self.caster:EmitSound("DOTA_Item.MeteorHammer.Channel")

	AddFOWViewer(self.caster:GetTeam(), position, self.impact_radius, 3.8, false)

	self.particle =
		ParticleManager:CreateParticle("particles/items4_fx/meteor_hammer_aoe.vpcf", PATTACH_WORLDORIGIN, self.caster)
	ParticleManager:SetParticleControl(self.particle, 0, position)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.impact_radius, 1, 1))

	self.particle2 = ParticleManager:CreateParticle(
		"particles/items4_fx/meteor_hammer_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)

	self.caster:StartGesture(ACT_DOTA_GENERIC_CHANNEL_1)
end

function item_meteor_hammer_custom:OnChannelFinish(bInterrupted)
	if not IsServer() then
		return
	end

	self.caster:RemoveModifierByName("modifier_item_meteor_hammer_custom_cast")

	self.position = self:GetCursorPosition()

	self.caster:FadeGesture(ACT_DOTA_GENERIC_CHANNEL_1)

	if bInterrupted then
		self.caster:StopSound("DOTA_Item.MeteorHammer.Channel")

		ParticleManager:DestroyParticle(self.particle, true)
		ParticleManager:DestroyParticle(self.particle2, true)
	else
		self.caster:EmitSound("DOTA_Item.MeteorHammer.Cast")

		self.particle3 = ParticleManager:CreateParticle(
			"particles/items4_fx/meteor_hammer_spell.vpcf",
			PATTACH_WORLDORIGIN,
			self.caster
		)
		ParticleManager:SetParticleControl(self.particle3, 0, self.position + Vector(0, 0, 1000))
		ParticleManager:SetParticleControl(self.particle3, 1, self.position)
		ParticleManager:SetParticleControl(self.particle3, 2, Vector(self.land_time, 0, 0))
		ParticleManager:ReleaseParticleIndex(self.particle3)

		Timers:CreateTimer(self.land_time, function()
			if not self:IsNull() then
				GridNav:DestroyTreesAroundPoint(self.position, self.impact_radius, true)

				EmitSoundOnLocationWithCaster(self.position, "DOTA_Item.MeteorHammer.Impact", self.caster)

				local damage = self.impact_damage_units
				local enemies = self.caster:FindTargets(self.impact_radius, self.position)

				local damage_table = {
					damage = damage,
					damage_type = DAMAGE_TYPE_MAGICAL,
					attacker = self.caster,
					ability = self,
				}

				for _, enemy in pairs(enemies) do
					enemy:EmitSound("DOTA_Item.MeteorHammer.Damage")

					enemy:AddNewModifier(
						self.caster,
						self,
						"modifier_item_meteor_hammer_custom_burn",
						{ duration = self.burn_duration + FrameTime() }
					)
					enemy:AddNewModifier(
						self.caster,
						self,
						"modifier_stunned",
						{ duration = self.stun_duration * (1 - enemy:GetStatusResistance()) }
					)

					damage_table.victim = enemy
					DoDamage(damage_table)
				end
			end
		end)
	end

	ParticleManager:ReleaseParticleIndex(self.particle)
	ParticleManager:ReleaseParticleIndex(self.particle2)
end

modifier_item_meteor_hammer_custom_burn = class(mod_visible)
function modifier_item_meteor_hammer_custom_burn:IsPurgable()
	return true
end
function modifier_item_meteor_hammer_custom_burn:GetEffectName()
	return "particles/items4_fx/meteor_hammer_spell_debuff.vpcf"
end
function modifier_item_meteor_hammer_custom_burn:IgnoreTenacity()
	return true
end
function modifier_item_meteor_hammer_custom_burn:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not self.ability then
		return
	end

	self.slow = self.ability.movespeed_slow
	if not IsServer() then
		return
	end

	self.inc_damage = self.ability.burn_dps_units
	self.burn_interval = self.ability.burn_interval

	self.damage_table = {
		victim = self.parent,
		damage = self.inc_damage * self.burn_interval,
		damage_type = DAMAGE_TYPE_MAGICAL,
		attacker = self.caster,
		ability = self.ability,
	}

	self:StartIntervalThink(self.burn_interval)
end

function modifier_item_meteor_hammer_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local damage = DoDamage(self.damage_table)
	self.parent:SendNumber(4, damage)
end

function modifier_item_meteor_hammer_custom_burn:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_item_meteor_hammer_custom_burn:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_item_meteor_hammer_custom_stats = class(mod_hidden)
function modifier_item_meteor_hammer_custom_stats:GetUniqueStat(name)
	return self[name]
end
function modifier_item_meteor_hammer_custom_stats:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.agi = self.ability.stats_agi
	self.str = self.ability.stats_str
	self.int = self.ability.stats_int

	self.spell_amp = self.ability.spell_amp
	self.mana_regen = self.ability.mana_regen_multiplier
	self.mana_health = self.ability.health_bonus / 100
	self.parent:AddUniqueStat(self, "spell_amp", "mana_regen", "mana_health")
end

function modifier_item_meteor_hammer_custom_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_meteor_hammer_custom_stats:GetModifierBonusStats_Agility()
	return self.agi
end

function modifier_item_meteor_hammer_custom_stats:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_item_meteor_hammer_custom_stats:GetModifierBonusStats_Intellect()
	return self.int
end

function modifier_item_meteor_hammer_custom_stats:GetModifierSpellAmplify_Percentage()
	return self.parent:UniqueStat(self, "spell_amp")
end

function modifier_item_meteor_hammer_custom_stats:GetModifierMPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "mana_regen")
end

function modifier_item_meteor_hammer_custom_stats:GetModifierHealthBonus()
	local bonus = self.parent:UniqueStat(self, "mana_health")
	if not bonus then
		return
	end
	return bonus * self.parent:GetMaxMana()
end

modifier_item_meteor_hammer_custom_cast = class(mod_visible)