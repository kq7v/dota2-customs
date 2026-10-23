--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_tracker",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_vision_thinker",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_buff",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_scepter_thinker",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_silence_thinker",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_silence",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_broodmother_web_4"
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_legendary_thinker",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_legendary_health_reduce",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_broodmother_web_7"
)
LinkLuaModifier(
	"modifier_broodmother_spin_web_custom_silence_cd",
	"abilities/broodmother/broodmother_spin_web_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_broodmother_web_4"
)

broodmother_spin_web_custom = class({})
broodmother_spin_web_custom.talents = {}

function broodmother_spin_web_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/broodmother/broodmother_web.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/broodmother_spin_web_cast.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/scepter_effect.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/web_silence_tether.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/broodmother_silken_bola_root.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_broodmother/broodmother_silken_bola_projectile.vpcf",
		context
	)
	PrecacheResource("particle", "particles/broodmother/web_pull.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/web_legendary_snare.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/web_legendary_line.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/web_stack.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/bite_legendary_attack.vpcf", context)
end

function broodmother_spin_web_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w2 = 0,
			w2_heal_reduce = 0,
			w2_heal = 0,
			w2_radius = caster:GetTalentValue("modifier_broodmother_web_2", "radius", true),

			has_h1 = 0,
			h1_slow = 0,
			h1_move = 0,
			h1_radius = caster:GetTalentValue("modifier_broodmother_hero_1", "radius", true),

			has_h4 = 0,
			h4_max = caster:GetTalentValue("modifier_broodmother_hero_4", "max", true),
			h4_radius = caster:GetTalentValue("modifier_broodmother_hero_4", "radius", true),
		}
	end

	if caster:HasTalent("modifier_broodmother_web_2") then
		self.talents.has_w2 = 1
		self.talents.w2_heal_reduce = caster:GetTalentValue("modifier_broodmother_web_2", "heal_reduce")
		self.talents.w2_heal = caster:GetTalentValue("modifier_broodmother_web_2", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_broodmother_web_2", type = 1, value = self.talents.w2_heal }
		)
	end

	if caster:HasTalent("modifier_broodmother_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_slow = caster:GetTalentValue("modifier_broodmother_hero_1", "slow")
		self.talents.h1_move = caster:GetTalentValue("modifier_broodmother_hero_1", "move")
	end

	if caster:HasTalent("modifier_broodmother_hero_4") then
		self.talents.has_h4 = 1
	end
end

function broodmother_spin_web_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "broodmother_spin_web", self)
end

function broodmother_spin_web_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_broodmother_spin_web_custom_tracker"
end

function broodmother_spin_web_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
end

function broodmother_spin_web_custom:GetAbilityChargeRestoreTime(level)
	return self.cd or 0
end

function broodmother_spin_web_custom:GetCastRange(vLocation, target)
	local base = self.BaseClass.GetCastRange(self, vLocation, target)

	if IsClient() then
		return base
	end
	if self.tracker then
		for _, index in pairs(self.tracker.active_webs) do
			local unit = EntIndexToHScript(index)
			if IsValid(unit) and (unit:GetAbsOrigin() - vLocation):Length2D() <= self.radius * 2 then
				return 99999
			end
		end
	end
	return base
end

function broodmother_spin_web_custom:GetAOERadius()
	return self.radius or 0
end

function broodmother_spin_web_custom:OnAbilityPhaseStart()
	local point = self:GetCursorPosition()
	if self.tracker then
		for _, index in pairs(self.tracker.active_webs) do
			local unit = EntIndexToHScript(index)
			if IsValid(unit) and (unit:GetAbsOrigin() - point):Length2D() <= self.radius / 1.5 then
				CustomGameEventManager:Send_ServerToPlayer(
					PlayerResource:GetPlayer(self.caster:GetPlayerOwnerID()),
					"CreateIngameErrorMessage",
					{ message = "#brood_web_error" }
				)
				return false
			end
		end
	end
	return true
end

function broodmother_spin_web_custom:OnSpellStart()
	local point = self:GetCursorPosition()

	local cast_fx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_broodmother/broodmother_spin_web_cast.vpcf",
		self
	)
	local cast_effect = ParticleManager:CreateParticle(cast_fx, PATTACH_CUSTOMORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControlEnt(
		cast_effect,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(cast_effect, 1, point)
	ParticleManager:SetParticleControl(cast_effect, 2, Vector(self.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(cast_effect)

	self.caster:EmitSound("Hero_Broodmother.SpinWebCast")

	local unit = CreateUnitByName(
		"npc_dota_broodmother_web_custom",
		point,
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	unit.owner = self.caster
	unit:SetOwner(self.caster)
	unit:SetControllableByPlayer(self.caster:GetPlayerID(), true)
	unit:AddNewModifier(self.caster, self, "modifier_broodmother_spin_web_custom", {})
end

function broodmother_spin_web_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if self:IsStolen() then
		return
	end
	if not IsValid(self.tracker) then
		return
	end
	self.tracker:InitScepter()
end

modifier_broodmother_spin_web_custom_tracker = class(mod_hidden)
function modifier_broodmother_spin_web_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.web_ability = self.ability

	self.legendary_ability = self.parent:FindAbilityByName("broodmother_spin_web_custom_legendary")
	if IsValid(self.legendary_ability) then
		if IsServer() and not self.legendary_ability:IsTrained() then
			self.legendary_ability:SetLevel(1)
		end
		self.legendary_ability:UpdateTalents()
	end

	self.active_webs = {}
	self.talent_que = nil
	self.interval = 1
	self.scepter_count = 0
	self.max_talents = 0
	self.talent_count = 0

	self.ability.scepter_duration = self.ability:GetSpecialValueFor("scepter_duration")
	self.ability.scepter_max = self.ability:GetSpecialValueFor("scepter_max")
	self.ability.scepter_interval = self.ability:GetSpecialValueFor("scepter_interval")

	self.ability.count = self.ability:GetSpecialValueFor("count")
	self.ability.bonus_movespeed = self.ability:GetSpecialValueFor("bonus_movespeed")
	self.ability.bonus_turn_rate = self.ability:GetSpecialValueFor("bonus_turn_rate")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.cd = self.ability:GetSpecialValueFor("AbilityChargeRestoreTime")
	if not IsServer() then
		return
	end
	self:InitScepter()
end

function modifier_broodmother_spin_web_custom_tracker:OnRefresh()
	self.ability.count = self.ability:GetSpecialValueFor("count")
	self.ability.bonus_movespeed = self.ability:GetSpecialValueFor("bonus_movespeed")
	if not IsServer() then
		return
	end
	self:InitScepter()
end

function modifier_broodmother_spin_web_custom_tracker:OnDestroy()
	if not IsServer() then
		return
	end

	for i = 1, #self.ability.tracker.active_webs do
		local index = self.ability.tracker.active_webs[1]
		if index then
			local unit = EntIndexToHScript(index)
			if IsValid(unit) then
				unit:RemoveModifierByName("modifier_broodmother_spin_web_custom")
				unit:RemoveSelf()
			end
		end
	end
end

function modifier_broodmother_spin_web_custom_tracker:InitScepter()
	if not IsServer() then
		return
	end
	if self.ability:IsStolen() then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	if self.scepter_init then
		return
	end

	if ingame_talents["broodmother_spiders"] then
		for _, data in pairs(ingame_talents["broodmother_spiders"]) do
			if data["max_level"] and data["rarity"] == "blue" then
				self.max_talents = self.max_talents + data["max_level"]
			end
		end
	end

	self.talent_que = 15
	self.scepter_init = true
	self.scepter_count = self.ability.scepter_interval
	self:StartIntervalThink(self.interval)
end

function modifier_broodmother_spin_web_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.scepter_count = self.scepter_count + self.interval

	if
		self.scepter_count > self.ability.scepter_interval
		and #self.ability.tracker.active_webs > 0
		and self.parent:HasScepter()
		and self.talent_count < self.max_talents
	then
		local random = RandomInt(1, #self.ability.tracker.active_webs)
		local unit = EntIndexToHScript(self.ability.tracker.active_webs[random])
		if unit then
			self.scepter_count = 0
			local point = unit:GetAbsOrigin()
				+ RandomVector(RandomInt(self.ability.radius * 0.2, self.ability.radius * 0.8))
			local thinker = CreateUnitByName(
				"npc_dota_broodmother_spidersack_custom",
				point,
				false,
				self.parent,
				self.parent,
				self.parent:GetTeamNumber()
			)
			thinker:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_broodmother_spin_web_custom_scepter_thinker",
				{}
			)
			thinker:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_kill",
				{ duration = self.ability.scepter_duration }
			)
		end
	end

	self:CheckTalent()
end

function modifier_broodmother_spin_web_custom_tracker:CheckTalent()
	if not IsServer() then
		return
	end
	if not self.talent_que then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:HasModifier("modifier_end_choise") then
		return
	end
	if not players[self.parent:GetId()] or #players[self.parent:GetId()].choise ~= 0 then
		return
	end

	upgrade:init_upgrade(self.parent, self.talent_que)

	if self.talent_que == 14 then
		self.talent_count = self.talent_count + 1
		if self.parent:GetQuest() == "Brood.Quest_6" then
			self.parent:UpdateQuest(1)
		end

		if self.talent_count >= self.ability.scepter_max and not self.epic_init then
			self.epic_init = true
			self.talent_que = 15
			return
		end
	end

	self.talent_que = nil
end

modifier_broodmother_spin_web_custom = class(mod_hidden)
function modifier_broodmother_spin_web_custom:IsAura()
	return true
end
function modifier_broodmother_spin_web_custom:GetAuraDuration()
	return 0
end
function modifier_broodmother_spin_web_custom:GetAuraRadius()
	return self.radius
end
function modifier_broodmother_spin_web_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_BOTH
end
function modifier_broodmother_spin_web_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_broodmother_spin_web_custom:GetModifierAura()
	return "modifier_broodmother_spin_web_custom_buff"
end
function modifier_broodmother_spin_web_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.point = self.parent:GetAbsOrigin()
	self.radius = self.ability.radius

	if IsClient() then
		local radius = 1200
		local web_fx = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/broodmother/broodmother_web.vpcf",
			self,
			"broodmother_spin_web_custom"
		)
		self.cast_effect = ParticleManager:CreateParticle(web_fx, PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(self.cast_effect, 0, self.point)
		ParticleManager:SetParticleControl(self.cast_effect, 1, Vector(radius, radius, radius))
		ParticleManager:SetParticleShouldCheckFoW(self.cast_effect, false)

		self:AddParticle(self.cast_effect, false, false, -1, false, false)
		self:OnIntervalThink()
	end

	if not IsServer() then
		return
	end

	if self.ability.tracker then
		table.insert(self.ability.tracker.active_webs, self.parent:entindex())
		local max = self.ability.count + (self.ability.talents.has_h4 == 1 and self.ability.talents.h4_max or 0)

		if #self.ability.tracker.active_webs > max then
			local entindex = self.ability.tracker.active_webs[1]
			local unit = EntIndexToHScript(entindex)
			if unit then
				unit:RemoveModifierByName("modifier_broodmother_spin_web_custom")
				unit:RemoveSelf()
			end
		end

		local mod = self.caster:FindModifierByName("modifier_broodmother_spin_web_custom_buff")
		if mod then
			mod:UpdateStack()
		end
	end

	self.vision_thinker = CreateModifierThinker(
		self.caster,
		self.ability,
		"modifier_broodmother_spin_web_custom_vision_thinker",
		{},
		self.point,
		self.caster:GetTeamNumber(),
		false
	)

	self.parent:RemoveAbility("broodmother_spin_web_destroy")
	local ability = self.parent:AddAbility("broodmother_spin_web_destroy_custom")
	if ability then
		ability:SetLevel(1)
	end

	self.parent:EmitSound("Hero_Broodmother.WebLoop")
end

function modifier_broodmother_spin_web_custom:OnIntervalThink()
	if IsServer() then
		return
	end
	self.interval = 0.2
	if (self.caster:GetAbsOrigin() - self.point):Length2D() <= self.radius then
		self.interval = 0.01
	end

	if self.cast_effect then
		ParticleManager:SetParticleControl(self.cast_effect, 3, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(
			self.cast_effect,
			4,
			Vector(self.caster:GetMoveSpeedModifier(self.caster:GetBaseMoveSpeed(), false), 0, 0)
		)
	end

	self:StartIntervalThink(self.interval)
end

function modifier_broodmother_spin_web_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.vision_thinker) then
		self.vision_thinker:Destroy()
	end

	if self.ability.tracker then
		for index, entindex in pairs(self.ability.tracker.active_webs) do
			if entindex == self.parent:entindex() then
				table.remove(self.ability.tracker.active_webs, index)
				break
			end
		end
		local mod = self.caster:FindModifierByName("modifier_broodmother_spin_web_custom_buff")
		if mod then
			mod:UpdateStack()
		end
	end

	self.parent:StopSound("Hero_Broodmother.WebLoop")
end

function modifier_broodmother_spin_web_custom:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNTARGETABLE_ENEMY] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_PROVIDES_VISION] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES] = true,
	}
end

function modifier_broodmother_spin_web_custom:GetAuraEntityReject(hEntity)
	if hEntity:IsFieldInvun(self.caster) then
		return true
	end
	if hEntity:GetTeamNumber() ~= self.caster:GetTeamNumber() then
		if self.ability.talents.has_h1 == 0 and self.ability.talents.has_w2 == 0 then
			return true
		end
		local radius = self.ability.talents.has_h1 == 1 and self.ability.talents.h1_radius
			or self.ability.talents.w2_radius
		if not self.caster:IsAlive() or (self.caster:GetAbsOrigin() - hEntity:GetAbsOrigin()):Length2D() > radius then
			return true
		end
		return false
	end
	return hEntity ~= self.caster and (not hEntity.owner or hEntity.owner ~= self.caster)
end

modifier_broodmother_spin_web_custom_vision_thinker = class(mod_hidden)
function modifier_broodmother_spin_web_custom_vision_thinker:IsAura()
	return self.ability.talents.has_h4 == 1
end
function modifier_broodmother_spin_web_custom_vision_thinker:GetAuraDuration()
	return 0.5
end
function modifier_broodmother_spin_web_custom_vision_thinker:GetAuraRadius()
	return self.radius
end
function modifier_broodmother_spin_web_custom_vision_thinker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_broodmother_spin_web_custom_vision_thinker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_broodmother_spin_web_custom_vision_thinker:GetModifierAura()
	return "modifier_generic_vision"
end
function modifier_broodmother_spin_web_custom_vision_thinker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.radius = self.ability.radius
end

function modifier_broodmother_spin_web_custom_vision_thinker:GetAuraEntityReject(hEntity)
	if hEntity:IsFieldInvun(self.caster) then
		return true
	end
	if not hEntity:IsRealHero() then
		return true
	end
	if
		not self.caster:IsAlive()
		or (self.caster:GetAbsOrigin() - hEntity:GetAbsOrigin()):Length2D() > self.ability.talents.h4_radius
	then
		return true
	end
	return false
end

modifier_broodmother_spin_web_custom_buff = class(mod_visible)
function modifier_broodmother_spin_web_custom_buff:IsHidden()
	return self.is_enemy
end
function modifier_broodmother_spin_web_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.is_enemy = self.parent:GetTeamNumber() ~= self.caster:GetTeamNumber()
	self.turn = self.ability.bonus_turn_rate
	if not IsServer() then
		return
	end
	self:UpdateStack()
end

function modifier_broodmother_spin_web_custom_buff:UpdateStack()
	if not IsServer() then
		return
	end
	if not self.ability.tracker then
		return
	end
	if not self.ability.tracker.active_webs then
		return
	end
	self:SetStackCount(#self.ability.tracker.active_webs)
end

function modifier_broodmother_spin_web_custom_buff:CheckState()
	if self.is_enemy then
		return
	end
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

function modifier_broodmother_spin_web_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TURN_RATE_CONSTANT,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_broodmother_spin_web_custom_buff:GetActivityTranslationModifiers()
	if self.is_enemy then
		return
	end
	return "web"
end

function modifier_broodmother_spin_web_custom_buff:GetModifierMoveSpeedBonus_Percentage()
	if self.is_enemy then
		return self.ability.talents.h1_slow
	end
	return self.ability.bonus_movespeed + self.ability.talents.h1_move
end

function modifier_broodmother_spin_web_custom_buff:GetModifierTurnRateConstant()
	if self.is_enemy then
		return
	end
	return self.turn
end

function modifier_broodmother_spin_web_custom_buff:GetModifierHealChange()
	if not self.is_enemy then
		return
	end
	return self.ability.talents.w2_heal_reduce
end

function modifier_broodmother_spin_web_custom_buff:GetModifierHPRegenAmplify_Percentage()
	if not self.is_enemy then
		return
	end
	return self.ability.talents.w2_heal_reduce
end

modifier_broodmother_spin_web_custom_scepter_thinker = class(mod_hidden)
function modifier_broodmother_spin_web_custom_scepter_thinker:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.pos = GetGroundPosition(self.parent:GetAbsOrigin(), nil)

	GameRules:ExecuteTeamPing(self.caster:GetTeamNumber(), self.pos.x, self.pos.y, self.caster, 0)

	self.parent:SetDayTimeVisionRange(500)
	self.parent:SetNightTimeVisionRange(500)

	self.collected = false
	self.timer = 0
	self.radius = 150
	self.max_timer = 1

	local base_particle = ParticleManager:CreateParticleForPlayer(
		"particles/shrine/capture_point_ring_overthrow.vpcf",
		PATTACH_WORLDORIGIN,
		nil,
		PlayerResource:GetPlayer(self.caster:GetId())
	)
	ParticleManager:SetParticleControl(base_particle, 0, self.pos)
	ParticleManager:SetParticleControl(base_particle, 3, Vector(132, 174, 219))
	ParticleManager:SetParticleControl(base_particle, 9, Vector(self.radius, 0, 0))
	self:AddParticle(base_particle, false, false, -1, false, false)

	local part = ParticleManager:CreateParticle("particles/broodmother/scepter_effect.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(part, 0, self.pos)
	ParticleManager:ReleaseParticleIndex(part)

	EmitSoundOnLocationWithCaster(self.pos, "Brood.Scepter_start", self.caster)
	self:OnIntervalThink()
end

function modifier_broodmother_spin_web_custom_scepter_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	self:UpdateParticle()
	local interval = 0.25

	if
		(self.caster:GetAbsOrigin() - self.pos):Length2D() <= self.radius
		and self.caster:IsAlive()
		and not self.caster:HasModifier("modifier_end_choise")
		and players[self.caster:GetId()]
		and #players[self.caster:GetId()].choise == 0
		and self.ability.tracker
		and self.ability.tracker.talent_que == nil
	then
		interval = 0.03
		self.timer = self.timer + interval
		if self.timer >= self.max_timer then
			self.collected = true
			self:Destroy()
		end
	else
		self.timer = 0
	end

	self:StartIntervalThink(interval)
end

function modifier_broodmother_spin_web_custom_scepter_thinker:UpdateParticle()
	if not IsServer() then
		return
	end

	if self.timer > 0 and not self.part_particle then
		self.part_particle = ParticleManager:CreateParticleForPlayer(
			"particles/shrine/capture_point_ring_clock_overthrow.vpcf",
			PATTACH_WORLDORIGIN,
			nil,
			PlayerResource:GetPlayer(self.caster:GetId())
		)
		ParticleManager:SetParticleControl(self.part_particle, 0, self.pos + Vector(0, 0, 20))
		ParticleManager:SetParticleControl(self.part_particle, 11, Vector(0, 0, 1))
		self:AddParticle(self.part_particle, false, false, -1, false, false)
	end

	if not self.part_particle then
		return
	end

	ParticleManager:SetParticleControl(self.part_particle, 3, Vector(116, 148, 183))
	ParticleManager:SetParticleControl(self.part_particle, 9, Vector(self.radius * 1.3, 0, 0))
	ParticleManager:SetParticleControl(self.part_particle, 17, Vector(self.timer / self.max_timer, 0, 0))
end

function modifier_broodmother_spin_web_custom_scepter_thinker:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNTARGETABLE_ENEMY] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_PROVIDES_VISION] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES] = true,
	}
end

function modifier_broodmother_spin_web_custom_scepter_thinker:OnDestroy()
	if not IsServer() then
		return
	end

	if self.collected and IsValid(self.ability.tracker) then
		self.ability.tracker.talent_que = 14
		self.ability.tracker:CheckTalent()
		self.caster:EmitSound("Brood.Scepter_collect")
	end

	local part = ParticleManager:CreateParticle("particles/broodmother/scepter_effect.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(part, 0, self.pos)
	ParticleManager:ReleaseParticleIndex(part)

	EmitSoundOnLocationWithCaster(self.pos, "Brood.Scepter_end", self.caster)
	UTIL_Remove(self.parent)
end

broodmother_spin_web_destroy_custom = class({})

function broodmother_spin_web_destroy_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "broodmother_spin_web_destroy", self)
end

function broodmother_spin_web_destroy_custom:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_broodmother_spin_web_custom")

	if mod then
		mod:Destroy()
	end

	self.caster:RemoveSelf()
end

broodmother_spin_web_custom_legendary = class({})
broodmother_spin_web_custom_legendary.talents = {}

function broodmother_spin_web_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w4 = 0,
			w4_radius = caster:GetTalentValue("modifier_broodmother_web_4", "radius", true),
			w4_talent_cd = caster:GetTalentValue("modifier_broodmother_web_4", "talent_cd", true),
			w4_silence = caster:GetTalentValue("modifier_broodmother_web_4", "silence", true),
			w4_slow = caster:GetTalentValue("modifier_broodmother_web_4", "slow", true),
			w4_knock_duration = caster:GetTalentValue("modifier_broodmother_web_4", "knock_duration", true),
			w4_knock_distance = caster:GetTalentValue("modifier_broodmother_web_4", "knock_distance", true),

			has_w7 = 0,
			w7_delay = caster:GetTalentValue("modifier_broodmother_web_7", "delay", true),
			w7_max_range = caster:GetTalentValue("modifier_broodmother_web_7", "max_range", true),
			w7_range = caster:GetTalentValue("modifier_broodmother_web_7", "range", true),
			w7_duration = caster:GetTalentValue("modifier_broodmother_web_7", "duration", true),
			w7_talent_cd = caster:GetTalentValue("modifier_broodmother_web_7", "talent_cd", true),
			w7_stun = caster:GetTalentValue("modifier_broodmother_web_7", "stun", true),
			w7_health = caster:GetTalentValue("modifier_broodmother_web_7", "health", true),
			w7_count = caster:GetTalentValue("modifier_broodmother_web_7", "count", true),
			w7_max = caster:GetTalentValue("modifier_broodmother_web_7", "max", true),
			w7_effect_duration = caster:GetTalentValue("modifier_broodmother_web_7", "effect_duration", true),
			w7_speed = caster:GetTalentValue("modifier_broodmother_web_7", "speed", true),

			has_r7 = 0,

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_broodmother_web_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_broodmother_web_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_broodmother_spawn_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_broodmother_bite_7") then
		self.talents.has_e7 = 1
	end
end

function broodmother_spin_web_custom_legendary:GetAbilityTextureName()
	if self.talents.has_w4 == 1 and not self.caster:HasModifier("modifier_broodmother_spin_web_custom_silence_cd") then
		return "broodmother_silken_bola"
	end
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "broodmother_sticky_snare", self)
end

function broodmother_spin_web_custom_legendary:GetBehavior()
	local bonus = 0
	if self.talents.has_w4 == 1 and not self.caster:HasModifier("modifier_broodmother_spin_web_custom_silence_cd") then
		bonus = DOTA_ABILITY_BEHAVIOR_AOE
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + bonus + (self.talents.has_w7 == 1 and DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES or 0)
end

function broodmother_spin_web_custom_legendary:GetAOERadius()
	return self.talents.w4_radius or 0
end

function broodmother_spin_web_custom_legendary:GetCastRange()
	return self.talents.w7_range or 0
end

function broodmother_spin_web_custom_legendary:GetCooldown(level)
	if self.talents.has_w7 == 0 then
		return self.talents.w4_talent_cd or 0
	end
	return self.talents.w7_talent_cd or 0
end

function broodmother_spin_web_custom_legendary:OnSpellStart()
	local point = self:GetCursorPosition()

	if
		self.talents.has_w4 == 1
		and (not self.caster:HasModifier("modifier_broodmother_spin_web_custom_silence_cd") or self.talents.has_w7 == 0)
	then
		local silence_point = point + Vector(0, 0, 20)
		if self.talents.has_w7 == 1 then
			self.caster:AddNewModifier(
				self.caster,
				self,
				"modifier_broodmother_spin_web_custom_silence_cd",
				{ duration = self.talents.w4_talent_cd }
			)
		end
		CreateModifierThinker(
			self.caster,
			self,
			"modifier_broodmother_spin_web_custom_silence_thinker",
			{ duration = self.talents.w4_silence },
			silence_point,
			self.caster:GetTeamNumber(),
			false
		)
	end

	if self.talents.has_w7 == 0 then
		return
	end
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_broodmother_spin_web_custom_legendary_thinker",
		{},
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function broodmother_spin_web_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

modifier_broodmother_spin_web_custom_silence_thinker = class(mod_hidden)
function modifier_broodmother_spin_web_custom_silence_thinker:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.point = self.parent:GetAbsOrigin()
	local radius = self.ability.talents.w4_radius

	AddFOWViewer(self.caster:GetTeamNumber(), self.point, radius, self.ability.talents.w4_silence, false)
	self.parent:EmitSound("Brood.Web_silence_start")

	local effect_cast = ParticleManager:CreateParticle("particles/broodmother/web_pull.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, self.point)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(radius, radius, radius))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	for _, target in pairs(self.caster:FindTargets(radius, self.point)) do
		local target_point = target:GetAbsOrigin()
		local direction = Vector(0, 0, 0)
		local distance = 0

		if (target_point - self.point):Length2D() > self.ability.talents.w4_knock_distance then
			local pull_point = self.point
				+ (target_point - self.point):Normalized() * self.ability.talents.w4_knock_distance
			direction = pull_point - target_point
			distance = direction:Length2D()
			direction = direction:Normalized()
		end

		target:AddNewModifier(self.caster, self.ability, "modifier_generic_arc", {
			dir_x = direction.x,
			dir_y = direction.y,
			duration = self.ability.talents.w4_knock_duration,
			distance = distance,
			fix_end = false,
			isStun = false,
			activity = ACT_DOTA_FLAIL,
		})

		target:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_broodmother_spin_web_custom_silence",
			{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.w4_silence }
		)
		target:EmitSound("Brood.Web_silence_target")
	end
end

modifier_broodmother_spin_web_custom_silence = class(mod_hidden)
function modifier_broodmother_spin_web_custom_silence:IsPurgable()
	return true
end
function modifier_broodmother_spin_web_custom_silence:GetEffectName()
	return "particles/generic_gameplay/generic_silenced.vpcf"
end
function modifier_broodmother_spin_web_custom_silence:ShouldUseOverheadOffset()
	return true
end
function modifier_broodmother_spin_web_custom_silence:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_broodmother_spin_web_custom_silence:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.w4_slow

	if not IsServer() then
		return
	end
	self:StartIntervalThink(self.ability.talents.w4_knock_duration)
end

function modifier_broodmother_spin_web_custom_silence:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_broodmother/broodmother_silken_bola_root.vpcf", self)
	self:StartIntervalThink(-1)
end

function modifier_broodmother_spin_web_custom_silence:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_broodmother_spin_web_custom_silence:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_broodmother_spin_web_custom_silence:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

modifier_broodmother_spin_web_custom_legendary_thinker = class(mod_hidden)
function modifier_broodmother_spin_web_custom_legendary_thinker:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.point = self.parent:GetAbsOrigin()

	self.end_point = self.caster:GetAbsOrigin()
	self.stage = 1

	self.width = 110
	self.max_range = (self.ability.talents.w7_range + self.caster:GetCastRangeBonus())

	self.jump_duration = 0
	self.jump_count = 0
	self.interval = FrameTime()

	self.root_targets = {}
	self.parent:EmitSound("Brood.Web_legendary_prep")
	self.parent:EmitSound("Brood.Web_legendary_prep2")

	self.particle = ParticleManager:CreateParticle(
		"particles/broodmother/web_legendary_line.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)
	self:StartIntervalThink(self.ability.talents.w7_delay)
end

function modifier_broodmother_spin_web_custom_legendary_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.stage == 1 then
		self.end_point = self.caster:GetAbsOrigin()
		local vec = self.end_point - self.point
		vec.z = 0

		local max_range = self.max_range * 1.5
		if vec:Length2D() > max_range then
			self.end_point = self.point + vec:Normalized() * max_range
		end

		self.end_point = GetGroundPosition(self.end_point, nil)

		if self.particle then
			ParticleManager:SetParticleControl(self.particle, 0, self.end_point)
			ParticleManager:DestroyParticle(self.particle, false)
		end

		if not IsValid(self.caster) or not self.caster:IsAlive() then
			self:Destroy()
			return
		end

		local direction = (self.parent:GetOrigin() - self.caster:GetAbsOrigin())
		local distance = direction:Length2D()

		if distance > self.ability.talents.w7_max_range then
			self:Destroy()
			return
		end

		direction = direction:Normalized()
		direction.z = 0
		self.jump_duration = distance / self.ability.talents.w7_speed

		self.caster:FacePoint(self.parent:GetOrigin())

		self.jump_mod = self.caster:AddNewModifier(self.caster, self.ability, "modifier_generic_arc", {
			dir_x = direction.x,
			dir_y = direction.y,
			duration = self.jump_duration,
			distance = distance,
			fix_end = false,
			isStun = false,
			activity = ACT_DOTA_SPAWN,
			isForward = 1,
			isInvun = 1,
		})
		self.jump_mod:SetEndCallback(function()
			if IsValid(self.caster) then
				self.caster:FacePoint()
			end
		end)

		for i = 1, 2 do
			self.caster:GenericParticle(
				"particles/units/heroes/hero_broodmother/broodmother_silken_bola_root.vpcf",
				self.jump_mod
			)
		end
		self.parent:StopSound("Brood.Web_legendary_prep")
		self.caster:EmitSound("Brood.Web_legendary_end")
		self.stage = 2
		self:StartIntervalThink(self.interval)
		self:SetDuration(5, true)
		return
	end

	if self.stage == 2 then
		for _, target in pairs(self.caster:FindTargets(self.width * 1.5)) do
			self:ProcDamage(target)
		end

		self.jump_count = self.jump_count + self.interval
		if self.jump_count >= self.jump_duration * 0.7 then
			self.stage = 3
			self.parent:EmitSound("Brood.Web_legendary_start")

			self.root_particle = ParticleManager:CreateParticle(
				"particles/broodmother/web_legendary_snare.vpcf",
				PATTACH_WORLDORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(self.root_particle, 0, self.end_point)
			ParticleManager:SetParticleControl(self.root_particle, 1, self.parent:GetOrigin())
			self:AddParticle(self.root_particle, false, false, -1, false, false)

			self:SetDuration(self.ability.talents.w7_duration, true)
		end
		return
	end

	if self.stage == 3 then
		local targets = FindUnitsInLine(
			self.caster:GetTeamNumber(),
			self.end_point,
			self.parent:GetAbsOrigin(),
			nil,
			self.width,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO,
			0
		)
		for _, target in pairs(targets) do
			self:ProcDamage(target)
		end
	end

	self:StartIntervalThink(0.1)
end

function modifier_broodmother_spin_web_custom_legendary_thinker:ProcDamage(target)
	if not IsServer() then
		return
	end
	if self.root_targets[target] then
		return
	end

	self.root_targets[target] = true
	target:EmitSound("Brood.Web_legendary_root")
	local mod = target:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_stunned",
		{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.w7_stun }
	)
	if mod then
		for i = 1, 2 do
			target:GenericParticle("particles/units/heroes/hero_broodmother/broodmother_silken_bola_root.vpcf", mod)
		end
	end

	if target:IsRealHero() then
		target:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_broodmother_spin_web_custom_legendary_health_reduce",
			{ duration = self.ability.talents.w7_effect_duration }
		)
	end

	local damage_target = target

	if self.caster.milk_ability then
		for i = 1, self.ability.talents.w7_count do
			Timers:CreateTimer(i * 0.2, function()
				if IsValid(damage_target) and damage_target:IsAlive() then
					self.caster.milk_ability:DealDamage(damage_target, "modifier_broodmother_web_7")
				end
			end)
		end
	end

	local hit_effect =
		ParticleManager:CreateParticle("particles/broodmother/bite_legendary_attack.vpcf", PATTACH_CUSTOMORIGIN, target)
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
end

modifier_broodmother_spin_web_custom_legendary_health_reduce = class(mod_visible)
function modifier_broodmother_spin_web_custom_legendary_health_reduce:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w7_max
	self.health = self.ability.talents.w7_health

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	if self.ability.talents.has_r7 == 0 and self.ability.talents.has_e7 == 0 then
		self.effect_cast = self.parent:GenericParticle("particles/broodmother/web_stack.vpcf", self, true)
	end

	self.duration = self:GetRemainingTime()
	self:OnRefresh()
end

function modifier_broodmother_spin_web_custom_legendary_health_reduce:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self.effect_cast then
		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
	end

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/items4_fx/spirit_vessel_damage.vpcf", self)
	end

	if not self.parent:IsHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_broodmother_spin_web_custom_legendary_health_reduce:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_broodmother_spin_web_custom_legendary_health_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_broodmother_spin_web_custom_legendary_health_reduce:GetModifierExtraHealthPercentage()
	return self.health * self:GetStackCount() * -1
end

modifier_broodmother_spin_web_custom_silence_cd = class(mod_cd)
function modifier_broodmother_spin_web_custom_silence_cd:GetTexture()
	return "broodmother_silken_bola"
end