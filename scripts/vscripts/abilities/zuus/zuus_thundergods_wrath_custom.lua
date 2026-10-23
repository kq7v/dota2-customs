--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_kills",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_zuus_hero_6"
)
LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_kills_tracker",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_vision",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_legendary_thinker",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_legendary_teleport",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_cloud",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_tracker",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_speed",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_zuus_wrath_4"
)
LinkLuaModifier("modifier_zuus_cloud_custom", "abilities/zuus/zuus_thundergods_wrath_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_zuus_cloud_custom_unit",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_thundergods_wrath_custom_magic",
	"abilities/zuus/zuus_thundergods_wrath_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_zuus_wrath_3"
)

zuus_thundergods_wrath_custom = class({})
zuus_thundergods_wrath_custom.talents = {}

function zuus_thundergods_wrath_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_thundergods_wrath_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zeus/zeus_cloud_strike.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_thundergods_wrath.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_break.vpcf", context)
	PrecacheResource("particle", "particles/patrol/rare_orb_patrol.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_wrath_kill.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zeus_wrath_cloud.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_wrath_legendary.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zeus/zeus_cloud.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zeus_landing.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zeus_blinks_start.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/zeus/arcana_chariot/zeus_arcana_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_lightning_bolt_glow_fx.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_lightning_bolt.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zeus_wrath_end.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_static_field.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_mjollnir_shield.vpcf", context)
	PrecacheResource("particle", "particles/zeus/wrath_legendary_refresh.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_shield_wrath.vpcf", context)
	PrecacheResource("particle", "particles/zeus/arc_legendary_active.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_lightning_bolt_aoe.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_speed.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/zeus/arcana_chariot/zeus_arcana_thundergods_wrath.vpcf", context)
	PrecacheResource("particle", "particles/zeus/arcana_ulti.vpcf", context)
end

function zuus_thundergods_wrath_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r1_damage = 0,
			r1_spell = 0,

			r2_cd = 0,
			r2_heal = 0,

			has_r3 = 0,
			r3_magic = 0,
			r3_damage = 0,
			r3_duration = caster:GetTalentValue("modifier_zuus_wrath_3", "duration", true),
			r3_effect_duration = caster:GetTalentValue("modifier_zuus_wrath_3", "effect_duration", true),
			r3_damage_type = caster:GetTalentValue("modifier_zuus_wrath_3", "damage_type", true),
			r3_radius = caster:GetTalentValue("modifier_zuus_wrath_3", "radius", true),
			r3_chance = caster:GetTalentValue("modifier_zuus_wrath_3", "chance", true),
			r3_max = caster:GetTalentValue("modifier_zuus_wrath_3", "max", true),
			r3_range = caster:GetTalentValue("modifier_zuus_wrath_3", "range", true),

			has_r4 = 0,
			r4_cd_items = caster:GetTalentValue("modifier_zuus_wrath_4", "cd_items", true),
			r4_duration = caster:GetTalentValue("modifier_zuus_wrath_4", "duration", true),
			r4_move = caster:GetTalentValue("modifier_zuus_wrath_4", "move", true),
			r4_resist = caster:GetTalentValue("modifier_zuus_wrath_4", "resist", true),
			r4_cd_items_wrath = caster:GetTalentValue("modifier_zuus_wrath_4", "cd_items_wrath", true),

			has_h2 = 0,
			h2_shield = 0,
			h2_armor = 0,
			h2_duration = caster:GetTalentValue("modifier_zuus_hero_2", "duration", true),

			has_h6 = 0,
			h6_cdr = caster:GetTalentValue("modifier_zuus_hero_6", "cdr", true),
			h6_silence = caster:GetTalentValue("modifier_zuus_hero_6", "silence", true),
			h6_duration = caster:GetTalentValue("modifier_zuus_hero_6", "duration", true),
			h6_max = caster:GetTalentValue("modifier_zuus_hero_6", "max", true),
			h6_radius = caster:GetTalentValue("modifier_zuus_hero_6", "radius", true),
		}
	end

	if caster:HasTalent("modifier_zuus_wrath_1") then
		self.talents.r1_damage = caster:GetTalentValue("modifier_zuus_wrath_1", "damage") / 100
		self.talents.r1_spell = caster:GetTalentValue("modifier_zuus_wrath_1", "spell")
	end

	if caster:HasTalent("modifier_zuus_wrath_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_zuus_wrath_2", "cd")
		self.talents.r2_heal = caster:GetTalentValue("modifier_zuus_wrath_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_zuus_wrath_2", type = 1, value = self.talents.r2_heal })
	end

	if caster:HasTalent("modifier_zuus_wrath_3") then
		self.talents.has_r3 = 1
		self.talents.r3_magic = caster:GetTalentValue("modifier_zuus_wrath_3", "magic")
		self.talents.r3_damage = caster:GetTalentValue("modifier_zuus_wrath_3", "damage")
	end

	if caster:HasTalent("modifier_zuus_wrath_4") then
		self.talents.has_r4 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_zuus_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_shield = caster:GetTalentValue("modifier_zuus_hero_2", "shield") / 100
		self.talents.h2_armor = caster:GetTalentValue("modifier_zuus_hero_2", "armor")
	end

	if caster:HasTalent("modifier_zuus_hero_6") then
		self.talents.has_h6 = 1
	end
end

function zuus_thundergods_wrath_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "zuus_thundergods_wrath", self)
end

function zuus_thundergods_wrath_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_zuus_thundergods_wrath_custom_tracker"
end

function zuus_thundergods_wrath_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.r2_cd or 0)
end

function zuus_thundergods_wrath_custom:GetCastRange(vLocation, hTarget)
	return (self.damage_range or 0)
end

function zuus_thundergods_wrath_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.caster:HasScepter() and (self.scepter_cast or 0) or 0)
end

function zuus_thundergods_wrath_custom:OnAbilityPhaseStart()
	local precast_sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Zuus.GodsWrath.PreCast", self)
	local particle_start = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_zuus/zuus_thundergods_wrath_start.vpcf",
		self
	)

	if particle_start ~= "particles/units/heroes/hero_zuus/zuus_thundergods_wrath_start.vpcf" then
		self.thundergod_spell_cast = ParticleManager:CreateParticle(particle_start, PATTACH_CUSTOMORIGIN, self.caster)
		ParticleManager:SetParticleControlEnt(
			self.thundergod_spell_cast,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			self.thundergod_spell_cast,
			1,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.caster:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			self.thundergod_spell_cast,
			2,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_attack2",
			self.caster:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			self.thundergod_spell_cast,
			3,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			self.thundergod_spell_cast,
			6,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetOrigin(),
			true
		)
	else
		self.thundergod_spell_cast =
			ParticleManager:CreateParticle(particle_start, PATTACH_ABSORIGIN_FOLLOW, self.caster)
		ParticleManager:SetParticleControlEnt(
			self.thundergod_spell_cast,
			1,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.caster:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.thundergod_spell_cast,
			2,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_attack2",
			self.caster:GetOrigin(),
			true
		)
	end

	self.caster:EmitSound(precast_sound)
	return true
end

function zuus_thundergods_wrath_custom:OnAbilityPhaseInterrupted()
	if self.thundergod_spell_cast then
		ParticleManager:DestroyParticle(self.thundergod_spell_cast, true)
		ParticleManager:ReleaseParticleIndex(self.thundergod_spell_cast)
	end
end

function zuus_thundergods_wrath_custom:OnSpellStart()
	if self.thundergod_spell_cast then
		ParticleManager:DestroyParticle(self.thundergod_spell_cast, false)
		ParticleManager:ReleaseParticleIndex(self.thundergod_spell_cast)
	end

	local sight_duration = self.caster:HasScepter() and self.scepter_duration or self.sight_duration
	self.caster:RemoveModifierByName("modifier_zuus_thundergods_wrath_custom_vision")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_zuus_thundergods_wrath_custom_vision",
		{ duration = sight_duration }
	)

	EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Hero_Zuus.GodsWrath", self.caster)

	if self.caster:HasScepter() then
		return
	end

	self:DealDamage()
end

function zuus_thundergods_wrath_custom:DealDamage()
	if self.talents.has_h2 == 1 then
		if IsValid(self.shield_mod) then
			self.shield_mod:Destroy()
		end
		self.shield_mod = self.caster:AddNewModifier(self.caster, self, "modifier_generic_shield", {
			duration = self.talents.h2_duration,
			start_full = 1,
			max_shield = self.talents.h2_shield * self.caster:GetMaxHealth(),
			sound = "DOTA_Item.Mjollnir.Loop",
			shield_talent = "modifier_zuus_hero_2",
		})

		if self.shield_mod then
			local shield_size = self.caster:GetModelRadius()
			local vec = Vector(shield_size, 0, shield_size)
			local effect = ParticleManager:CreateParticle(
				"particles/zeus/zuus_shield_wrath.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
				self.caster
			)
			ParticleManager:SetParticleControlEnt(
				effect,
				0,
				self.caster,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.caster:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControl(effect, 1, vec)
			ParticleManager:SetParticleControl(effect, 2, vec)
			ParticleManager:SetParticleControl(effect, 4, vec)
			self.shield_mod:AddParticle(effect, false, false, -1, false, false)

			self.shield_mod:SetEndFunction(function()
				if IsValid(self.caster) then
					self.caster:EmitSound("DOTA_Item.Mjollnir.DeActivate")
				end
			end)
		end
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_zuus_thundergods_wrath_custom_kills_tracker",
		{ duration = self.talents.h6_duration }
	)

	if self.caster.jump_ability then
		self.caster.jump_ability:LegendaryStack(true)
	end

	local wrath_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_zuus/zuus_thundergods_wrath.vpcf",
		self
	)
	local damage_table = { attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL }
	local min_target = nil
	local min_range = 99999

	for _, hero in pairs(players) do
		if
			hero:IsAlive()
			and hero:GetTeamNumber() ~= self.caster:GetTeamNumber()
			and not self.caster:DuelRestrict(hero)
		then
			local target_point = hero:GetAbsOrigin()
			local vStartPosition = target_point + Vector(0, 0, 4000)

			if wrath_pfx ~= "particles/units/heroes/hero_zuus/zuus_thundergods_wrath.vpcf" then
				local nFXIndex = ParticleManager:CreateParticle(
					"particles/econ/items/zeus/arcana_chariot/zeus_arcana_thundergods_wrath.vpcf",
					PATTACH_CUSTOMORIGIN,
					hero
				)
				ParticleManager:SetParticleControl(nFXIndex, 0, vStartPosition)
				ParticleManager:SetParticleControlEnt(
					nFXIndex,
					1,
					hero,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					hero:GetOrigin(),
					true
				)
				ParticleManager:SetParticleControlEnt(
					nFXIndex,
					6,
					self.caster,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.caster:GetOrigin(),
					true
				)
				ParticleManager:ReleaseParticleIndex(nFXIndex)
				if hero:IsHero() then
					local nFXIndex2 =
						ParticleManager:CreateParticle("particles/zeus/arcana_ulti.vpcf", PATTACH_CUSTOMORIGIN, hero)
					ParticleManager:SetParticleControlEnt(
						nFXIndex2,
						0,
						hero,
						PATTACH_POINT_FOLLOW,
						"attach_hitloc",
						hero:GetOrigin(),
						true
					)
					ParticleManager:SetParticleControlEnt(
						nFXIndex2,
						1,
						hero,
						PATTACH_POINT_FOLLOW,
						"attach_hitloc",
						hero:GetOrigin(),
						true
					)
					ParticleManager:SetParticleControlEnt(
						nFXIndex2,
						2,
						hero,
						PATTACH_POINT_FOLLOW,
						"attach_hitloc",
						hero:GetOrigin(),
						true
					)
					ParticleManager:ReleaseParticleIndex(nFXIndex2)
				end
			else
				local nFXIndex = ParticleManager:CreateParticle(
					"particles/units/heroes/hero_zuus/zuus_thundergods_wrath.vpcf",
					PATTACH_CUSTOMORIGIN,
					hero
				)
				ParticleManager:SetParticleControl(nFXIndex, 0, vStartPosition)
				ParticleManager:SetParticleControlEnt(
					nFXIndex,
					1,
					hero,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					hero:GetOrigin(),
					true
				)
				ParticleManager:DestroyParticle(nFXIndex, false)
				ParticleManager:ReleaseParticleIndex(nFXIndex)
			end

			if
				not hero:IsInvulnerable()
				and not hero:IsOutOfGame()
				and (not hero:IsInvisible() or self.caster:CanEntityBeSeenByMyTeam(hero))
			then
				local range = (hero:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D()
				local k = range > self.damage_range and self.damage_reduction or 1

				if range < min_range and range <= self.talents.r3_range then
					min_range = range
					min_target = hero
				end

				if self.caster.static_ability then
					self.caster.static_ability:DealDamage(hero)
				end

				if self.talents.has_h6 == 1 and (range <= self.talents.h6_radius) then
					hero:AddNewModifier(
						self.caster,
						self,
						"modifier_generic_silence",
						{ duration = (1 - hero:GetStatusResistance()) * self.talents.h6_silence }
					)
				end

				local damage = (self.damage + self.health_damage * (hero:GetMaxHealth() - hero:GetHealth()))
					* (1 + self.talents.r1_damage)
				damage_table.damage = damage * k
				damage_table.victim = hero
				DoDamage(damage_table)
			end

			hero:EmitSound("Hero_Zuus.GodsWrath.Target")
		end
	end

	if min_target then
		self:CreateCloud(min_target:GetAbsOrigin(), true)
	end
end

function zuus_thundergods_wrath_custom:CreateCloud(point, ignore_random)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r3 == 0 then
		return
	end
	if not ignore_random and not RollPseudoRandomPercentage(self.talents.r3_chance, 78, self.caster) then
		return
	end

	local new_point = point + RandomVector(70)
	new_point = GetGroundPosition(new_point, nil) + Vector(0, 0, 350)
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_zuus_thundergods_wrath_custom_cloud",
		{},
		new_point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_zuus_thundergods_wrath_custom_tracker = class(mod_hidden)
function modifier_zuus_thundergods_wrath_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.wrath_ability = self.ability
	self.parent.cloud_ability = self.parent:FindAbilityByName("zuus_cloud_custom")

	if IsValid(self.parent.cloud_ability) then
		if IsServer() and not self.parent.cloud_ability:IsTrained() then
			self.parent.cloud_ability:SetLevel(1)
		end
		self.parent.cloud_ability:UpdateTalents()
	end

	self.ability.sight_duration = self.ability:GetSpecialValueFor("sight_duration")
	self.ability.vision_radius = self.ability:GetSpecialValueFor("vision_radius")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.health_damage = self.ability:GetSpecialValueFor("health_damage") / 100
	self.ability.damage_range = self.ability:GetSpecialValueFor("damage_range")
	self.ability.damage_reduction = self.ability:GetSpecialValueFor("damage_reduction") / 100

	self.ability.scepter_cast = self.ability:GetSpecialValueFor("scepter_cast")
	self.ability.scepter_stun = self.ability:GetSpecialValueFor("scepter_stun")
	self.ability.scepter_duration = self.ability:GetSpecialValueFor("scepter_duration")
	self.ability.scepter_delay = self.ability:GetSpecialValueFor("scepter_delay")
	self.ability.scepter_aoe = self.ability:GetSpecialValueFor("scepter_aoe")
	self.ability.scepter_speed = self.ability:GetSpecialValueFor("scepter_speed")
end

function modifier_zuus_thundergods_wrath_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.health_damage = self.ability:GetSpecialValueFor("health_damage") / 100
end

function modifier_zuus_thundergods_wrath_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end

	if params.ability:IsItem() then
		self.parent:RemoveModifierByName("modifier_zuus_thundergods_wrath_custom_speed")
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_zuus_thundergods_wrath_custom_speed",
			{ duration = self.ability.talents.r4_duration }
		)
	else
		local cd = 0
		if params.ability == self.ability then
			cd = self.ability.talents.r4_cd_items_wrath
		elseif self.parent.bolt_ability and self.parent.bolt_ability == params.ability then
			cd = self.ability.talents.r4_cd_items
		end
		if cd ~= 0 then
			self.parent:CdItems(cd, "modifier_zuus_wrath_4")
		end
	end
end

function modifier_zuus_thundergods_wrath_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_zuus_thundergods_wrath_custom_tracker:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h2_armor
end

function modifier_zuus_thundergods_wrath_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.r1_spell
end

modifier_zuus_thundergods_wrath_custom_kills = class(mod_visible)
function modifier_zuus_thundergods_wrath_custom_kills:IsHidden()
	return self.ability.talents.has_h6 == 0 or self:GetStackCount() >= self.max
end
function modifier_zuus_thundergods_wrath_custom_kills:RemoveOnDeath()
	return false
end
function modifier_zuus_thundergods_wrath_custom_kills:GetTexture()
	return "buffs/zeus/hero_6"
end
function modifier_zuus_thundergods_wrath_custom_kills:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.max = self.ability.talents.h6_max

	if not IsServer() then
		return
	end
	self:OnRefresh()
	self:StartIntervalThink(2)
end

function modifier_zuus_thundergods_wrath_custom_kills:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_zuus_thundergods_wrath_custom_kills:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h6 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:EmitSound("BS.Thirst_legendary_active")
	self.parent:GenericParticle("particles/patrol/rare_orb_patrol.vpcf")
	self:StartIntervalThink(-1)
end

function modifier_zuus_thundergods_wrath_custom_kills:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_zuus_thundergods_wrath_custom_kills:GetModifierPercentageCooldown()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_cdr * self:GetStackCount()
end

modifier_zuus_thundergods_wrath_custom_kills_tracker = class(mod_hidden)
function modifier_zuus_thundergods_wrath_custom_kills_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.parent:AddDeathEvent(self, true)
end

function modifier_zuus_thundergods_wrath_custom_kills_tracker:DeathEvent(params)
	if not IsServer() then
		return
	end
	if not params.attacker then
		return
	end
	local attacker = params.attacker
	if attacker.owner then
		attacker = attacker.owner
	end

	if attacker ~= self.parent then
		return
	end
	if not params.unit:IsValidKill(attacker) then
		return
	end

	if self.parent:GetQuest() == "Zuus.Quest_8" then
		self.parent:UpdateQuest(1)
	end

	local particle = ParticleManager:CreateParticle("particles/zeus/zuus_wrath_kill.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, params.unit:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, params.unit:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_zuus_thundergods_wrath_custom_kills", {})
end

modifier_zuus_thundergods_wrath_custom_vision = class(mod_hidden)
function modifier_zuus_thundergods_wrath_custom_vision:IsHidden()
	return not self.parent:HasScepter()
end
function modifier_zuus_thundergods_wrath_custom_vision:RemoveOnDeath()
	return false
end
function modifier_zuus_thundergods_wrath_custom_vision:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.interval = 0.2
	self.vision_radius = self.ability.vision_radius

	if self.parent:HasScepter() and not self.ability:IsHidden() then
		self.parent:SwapAbilities(self.ability:GetName(), "zuus_thundergods_wrath_custom_legendary", false, true)
	end

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_zuus_thundergods_wrath_custom_vision:OnIntervalThink()
	if not IsServer() then
		return
	end

	for _, player in pairs(players) do
		if player:GetTeamNumber() ~= self.parent:GetTeamNumber() and player:IsAlive() then
			AddFOWViewer(
				self.parent:GetTeamNumber(),
				player:GetAbsOrigin(),
				self.vision_radius,
				self.interval * 2,
				false
			)
			player:AddNewModifier(self.parent, self.ability, "modifier_truesight", { duration = self.interval * 2 })
		end
	end
end

function modifier_zuus_thundergods_wrath_custom_vision:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability:IsHidden() then
		self.parent:SwapAbilities(self.ability:GetName(), "zuus_thundergods_wrath_custom_legendary", true, false)
		self.ability:StartCd()
	end
end

modifier_zuus_thundergods_wrath_custom_cloud = class(mod_hidden)
function modifier_zuus_thundergods_wrath_custom_cloud:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.parent:EmitSound("Zuus.Wrath_cloud")
	self.radius = self.ability.talents.r3_radius

	self.point = GetGroundPosition(self.parent:GetAbsOrigin(), nil)

	self.zuus_nimbus_particle =
		ParticleManager:CreateParticle("particles/zeus/zeus_wrath_cloud.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 2, self.parent:GetAbsOrigin())
	self:AddParticle(self.zuus_nimbus_particle, false, false, -1, false, false)

	self.count = self.ability.talents.r3_duration + 1

	self.damageTable = {
		attacker = self.caster,
		ability = self.ability,
		damage = self.ability.talents.r3_damage,
		damage_type = self.ability.talents.r3_damage_type,
	}
	self:OnIntervalThink()
	self:StartIntervalThink(1)
end

function modifier_zuus_thundergods_wrath_custom_cloud:OnIntervalThink()
	if not IsServer() then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_zuus/zuus_lightning_bolt_aoe.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.point)
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	for _, unit in pairs(self.parent:FindTargets(self.radius)) do
		self.damageTable.victim = unit
		DoDamage(self.damageTable, "modifier_zuus_wrath_3")
		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_zeus/zeus_cloud_strike.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			unit,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			unit:GetAbsOrigin(),
			true
		)
		ParticleManager:DestroyParticle(particle, false)
		ParticleManager:ReleaseParticleIndex(particle)

		unit:GenericParticle("particles/units/heroes/hero_zuus/zuus_static_field.vpcf")
		unit:EmitSound("Hero_Zuus.StaticField")

		unit:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_zuus_thundergods_wrath_custom_magic",
			{ duration = self.ability.talents.r3_effect_duration }
		)
	end

	self.parent:EmitSound("Zuus.Wrath_cloud_ground")

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_zuus_thundergods_wrath_custom_speed = class(mod_visible)
function modifier_zuus_thundergods_wrath_custom_speed:GetTexture()
	return "buffs/zeus/wrath_4"
end
function modifier_zuus_thundergods_wrath_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/zeus/zuus_speed.vpcf", self)
end

function modifier_zuus_thundergods_wrath_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_zuus_thundergods_wrath_custom_speed:GetModifierSlowResistance_Stacking()
	return self.ability.talents.r4_resist
end

function modifier_zuus_thundergods_wrath_custom_speed:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.r4_move
end

modifier_zuus_thundergods_wrath_custom_magic = class(mod_visible)
function modifier_zuus_thundergods_wrath_custom_magic:GetTexture()
	return "buffs/zeus/wrath_3"
end
function modifier_zuus_thundergods_wrath_custom_magic:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_zuus_thundergods_wrath_custom_magic:OnRefresh(stack)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/generic/generic_magic_reduction.vpcf", self, true)
	end
end

function modifier_zuus_thundergods_wrath_custom_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_zuus_thundergods_wrath_custom_magic:GetModifierMagicalResistanceBonus()
	return self:GetStackCount() * self.ability.talents.r3_magic
end

zuus_thundergods_wrath_custom_legendary = class({})
function zuus_thundergods_wrath_custom_legendary:OnSpellStart()
	local ability = self.caster.wrath_ability
	if not ability then
		return
	end

	local target = self.caster
	local min_range = 99999
	local point = self:GetCursorPosition()

	for _, hero in pairs(players) do
		if hero:IsAlive() and not self.caster:DuelRestrict(hero) then
			local range = (hero:GetAbsOrigin() - point):Length2D()
			if range < min_range then
				min_range = range
				target = hero
			end
		end
	end

	local position = target:GetAbsOrigin()
	self.caster:SetAbsOrigin(point)
	self.caster:RemoveModifierByName("modifier_zuus_thundergods_wrath_custom_vision")
	CreateModifierThinker(
		self.caster,
		ability,
		"modifier_zuus_thundergods_wrath_custom_legendary_thinker",
		{ duration = ability.scepter_delay, target = target:entindex() },
		position,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_zuus_thundergods_wrath_custom_legendary_thinker = class(mod_hidden)
function modifier_zuus_thundergods_wrath_custom_legendary_thinker:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.ability:DealDamage()
	self.target = EntIndexToHScript(table.target)

	self.radius = self.ability.scepter_aoe
	self.speed = self.ability.scepter_speed
	self.delay = self.ability.scepter_delay
	self.stun = self.ability.scepter_stun

	local point = self.parent:GetAbsOrigin()
	GridNav:DestroyTreesAroundPoint(point, self.radius, true)

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_zuus_thundergods_wrath_custom_legendary_teleport",
		{ duration = self.delay }
	)

	local effect_cast = ParticleManager:CreateParticle(
		"particles/zeus/zuus_wrath_legendary.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_cast, 0, point)
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(self.radius, self.radius, self.radius))
	self:AddParticle(effect_cast, false, false, -1, false, false)

	self.zuus_nimbus_particle = ParticleManager:CreateParticle(
		"particles/zeus/arc_legendary_active.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 0, point)
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 1, Vector(self.radius, 0, 0))
	self:AddParticle(self.zuus_nimbus_particle, false, false, -1, false, false)

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Zuus.Wrath_legendary_aoe", self.caster)

	self.interval = 0.03
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_zuus_thundergods_wrath_custom_legendary_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.target) or not self.target:IsAlive() then
		return
	end
	local vec = self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()

	if vec:Length2D() <= 50 then
		return
	end
	local dist = vec:Normalized() * self.speed * self.interval
	self.parent:SetAbsOrigin(self.parent:GetAbsOrigin() + dist)
	self.caster:SetAbsOrigin(self.parent:GetAbsOrigin())
end

function modifier_zuus_thundergods_wrath_custom_legendary_thinker:OnDestroy()
	if not IsServer() then
		return
	end

	FindClearSpaceForUnit(self.caster, self.parent:GetAbsOrigin(), true)
	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Zuus.Wrath_legendary_impact", self.caster)
	self.parent:EmitSound("Hero_Zuus.GodsWrath.Target")

	for _, unit in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
		local target_point = unit:GetAbsOrigin()
		local vStartPosition = target_point + Vector(0, 0, 4000)

		local nFXIndex = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_zuus/zuus_thundergods_wrath.vpcf",
			PATTACH_CUSTOMORIGIN,
			unit
		)
		ParticleManager:SetParticleControl(nFXIndex, 0, vStartPosition)
		ParticleManager:SetParticleControlEnt(
			nFXIndex,
			1,
			unit,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			unit:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(nFXIndex)

		EmitSoundOnLocationWithCaster(target_point, "Hero_Zuus.LightningBolt", self.caster)
		unit:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_stunned",
			{ duration = (1 - unit:GetStatusResistance()) * self.stun }
		)
	end

	local target_point = self.caster:GetAbsOrigin()
	local vStartPosition = target_point + Vector(0, 0, 4000)

	local nFXIndex = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_zuus/zuus_thundergods_wrath.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControl(nFXIndex, 0, vStartPosition)
	ParticleManager:SetParticleControlEnt(
		nFXIndex,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(nFXIndex)

	local particle2 = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_zuus/zuus_lightning_bolt_glow_fx.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle2, 0, vStartPosition)
	ParticleManager:SetParticleControl(particle2, 1, self.caster:GetOrigin())
	ParticleManager:ReleaseParticleIndex(particle2)

	local line_position = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * self.radius
	local max = 5
	for i = 1, max do
		local qangle = QAngle(0, 360 / max, 0)
		line_position = RotatePosition(self.parent:GetAbsOrigin(), qangle, line_position)
		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_zuus/zuus_lightning_bolt.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(particle, 0, Vector(line_position.x, line_position.y, 3000))
		ParticleManager:SetParticleControl(particle, 1, Vector(line_position.x, line_position.y, line_position.z))
		ParticleManager:ReleaseParticleIndex(particle)
	end

	local part = ParticleManager:CreateParticle("particles/zeus/zeus_wrath_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(part, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(part, 1, self.caster:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(part)

	local effect_cast = ParticleManager:CreateParticle("particles/zeus/zeus_landing.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(self.radius, self.radius, self.radius))
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

modifier_zuus_thundergods_wrath_custom_legendary_teleport = class(mod_hidden)
function modifier_zuus_thundergods_wrath_custom_legendary_teleport:OnCreated(table)
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent = self:GetParent()
	self.parent:AddNoDraw()
	self.parent:NoDraw(self)

	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetAbsOrigin(), 500, 3, false)

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Zuus.Wrath_legendary_start", self.parent)
	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Zuus.Wrath_legendary_start_2", self.parent)

	local part = ParticleManager:CreateParticle("particles/zeus/zeus_blinks_start.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(part, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(part, 1, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(part)

	local part2 = ParticleManager:CreateParticle(
		"particles/econ/items/zeus/arcana_chariot/zeus_arcana_blink_start.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(part2, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(part2, 1, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(part2)
end

function modifier_zuus_thundergods_wrath_custom_legendary_teleport:CheckState()
	return {
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_MUTED] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_zuus_thundergods_wrath_custom_legendary_teleport:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveNoDraw()
	self.parent:StartGesture(ACT_DOTA_SPAWN)
end

zuus_cloud_custom = class({})
zuus_cloud_custom.talents = {}

function zuus_cloud_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_zeus/zeus_cloud.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zeus/zeus_cloud_strike.vpcf", context)
	PrecacheResource("particle", "particles/zeus/wrath_legendary_refresh.vpcf", context)
end

function zuus_cloud_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_stun = caster:GetTalentValue("modifier_zuus_wrath_7", "stun", true),
			r7_cd_bolt = caster:GetTalentValue("modifier_zuus_wrath_7", "cd_bolt", true) / 100,
			r7_cd_wrath = caster:GetTalentValue("modifier_zuus_wrath_7", "cd_wrath", true) / 100,
			r7_damage_type = caster:GetTalentValue("modifier_zuus_wrath_7", "damage_type", true),
			r7_damage = caster:GetTalentValue("modifier_zuus_wrath_7", "damage", true) / 100,
			r7_damage_creeps = caster:GetTalentValue("modifier_zuus_wrath_7", "damage_creeps", true),
			r7_talent_cd = caster:GetTalentValue("modifier_zuus_wrath_7", "talent_cd", true),
			r7_delay = caster:GetTalentValue("modifier_zuus_wrath_7", "delay", true),
			r7_radius = caster:GetTalentValue("modifier_zuus_wrath_7", "radius", true),
		}
	end
end

function zuus_cloud_custom:CreateTalent()
	self:SetHidden(false)
end

function zuus_cloud_custom:GetAOERadius()
	return (self.talents.r7_radius or 0)
end

function zuus_cloud_custom:GetCooldown()
	return (self.talents.r7_talent_cd or 0)
end

function zuus_cloud_custom:OnSpellStart()
	local target_point = self:GetCursorPosition()
	if not self.caster.wrath_ability then
		return
	end

	self.caster.wrath_ability:CreateCloud(target_point)

	EmitSoundOnLocationWithCaster(target_point, "Hero_Zuus.Cloud.Cast", self.caster)
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_zuus_cloud_custom",
		{ duration = self.talents.r7_delay },
		target_point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_zuus_cloud_custom = class(mod_hidden)
function modifier_zuus_cloud_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end
	self.point = GetGroundPosition(self.parent:GetAbsOrigin(), nil)
	self.zuus_nimbus_unit = CreateUnitByName(
		"npc_dota_zeus_cloud",
		self.point + Vector(0, 0, 450),
		false,
		self.caster,
		nil,
		self.caster:GetTeamNumber()
	)
	self.zuus_nimbus_unit:SetControllableByPlayer(self.caster:GetPlayerID(), true)
	self.zuus_nimbus_unit:SetModelScale(0.7)
	self.zuus_nimbus_unit:AddNewModifier(self.caster, self.ability, "modifier_zuus_cloud_custom_unit", {})
	self.zuus_nimbus_unit:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_kill",
		{ duration = self:GetRemainingTime() }
	)

	self.ability:EndCd()
end

function modifier_zuus_cloud_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	local hit_hero = false
	local hit = false

	local targets = self.caster:FindTargets(self.ability.talents.r7_radius, self.parent:GetAbsOrigin())
	for _, target in pairs(targets) do
		if self.caster.static_ability then
			self.caster.static_ability:DealDamage(target)
		end
		local damage = target:IsCreep() and self.ability.talents.r7_damage_creeps
			or self.ability.talents.r7_damage * target:GetMaxHealth()
		DoDamage(
			{
				victim = target,
				attacker = self.caster,
				ability = self.ability,
				damage = damage,
				damage_type = self.ability.talents.r7_damage_type,
			},
			"modifier_zuus_wrath_7"
		)
		hit = true
		if target:IsRealHero() then
			hit_hero = true
		end
		target:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_stunned",
			{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.r7_stun }
		)

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_zeus/zeus_cloud_strike.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.zuus_nimbus_unit
		)
		ParticleManager:SetParticleControl(particle, 0, self.zuus_nimbus_unit:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Hero_Zuus.LightningBolt.Righteous", self.caster)
	if not hit then
		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_zeus/zeus_cloud_strike.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.zuus_nimbus_unit
		)
		ParticleManager:SetParticleControl(particle, 0, self.zuus_nimbus_unit:GetAbsOrigin())
		ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle)
	end

	if hit then
		local particle = ParticleManager:CreateParticle(
			"particles/zeus/wrath_legendary_refresh.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.caster
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		if self.caster.bolt_ability then
			self.caster:CdAbility(
				self.caster.bolt_ability,
				nil,
				self.ability.talents.r7_cd_bolt,
				"modifier_zuus_wrath_7"
			)
		end
		if self.caster.wrath_ability and hit_hero then
			self.caster:CdAbility(
				self.caster.wrath_ability,
				nil,
				self.ability.talents.r7_cd_wrath,
				"modifier_zuus_wrath_7"
			)
		end
	end
end

modifier_zuus_cloud_custom_unit = class(mod_hidden)
function modifier_zuus_cloud_custom_unit:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.point = GetGroundPosition(self.parent:GetAbsOrigin(), nil)

	self.zuus_nimbus_particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_zeus/zeus_cloud.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 0, self.point)
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 1, Vector(self.ability.talents.r7_radius, 0, 0))
	ParticleManager:SetParticleControl(self.zuus_nimbus_particle, 2, self.point + Vector(0, 0, 450))
	self:AddParticle(self.zuus_nimbus_particle, false, false, -1, false, false)
end

function modifier_zuus_cloud_custom_unit:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
	}
end

function modifier_zuus_cloud_custom_unit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
	}
end

function modifier_zuus_cloud_custom_unit:GetVisualZDelta()
	return 450
end