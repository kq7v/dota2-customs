--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_puck_waning_rift",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_custom_puck_waning_rift_legendary_charge",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_rift_7"
)
LinkLuaModifier(
	"modifier_custom_puck_waning_rift_legendary_damage",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_waning_rift_tracker",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_waning_rift_magic",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_rift_1"
)
LinkLuaModifier(
	"modifier_custom_puck_waning_rift_legendary_magic",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_rift_7"
)
LinkLuaModifier(
	"modifier_custom_puck_waning_rift_mark",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_waning_rift_burn",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_rift_3"
)
LinkLuaModifier(
	"modifier_custom_puck_waning_rift_items",
	"abilities/puck/custom_puck_waning_rift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_rift_4"
)

custom_puck_waning_rift = class({})
custom_puck_waning_rift.talents = {}

function custom_puck_waning_rift:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_waning_rift.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_prepare_radius.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_blint_end.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_legendary_max.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_legendary_start.vpcf", context)
	PrecacheResource("particle", "particles/puck/orb_stack.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_magic_stack.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_burn_hit.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_mark.vpcf", context)
end

function custom_puck_waning_rift:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w7 = 0,
			w7_range = caster:GetTalentValue("modifier_puck_rift_7", "range", true),
			w7_slow = caster:GetTalentValue("modifier_puck_rift_7", "slow", true),
			w7_duration = caster:GetTalentValue("modifier_puck_rift_7", "duration", true),
			w7_duration_max = caster:GetTalentValue("modifier_puck_rift_7", "duration_max", true),
			w7_damage = caster:GetTalentValue("modifier_puck_rift_7", "damage", true) / 100,
			w7_magic = caster:GetTalentValue("modifier_puck_rift_7", "magic", true),
			w7_cd = caster:GetTalentValue("modifier_puck_rift_7", "cd", true) / 100,
			w7_waves = caster:GetTalentValue("modifier_puck_rift_7", "waves", true),
			w7_radius = caster:GetTalentValue("modifier_puck_rift_7", "radius", true),
			w7_magic_duration = caster:GetTalentValue("modifier_puck_rift_7", "magic_duration", true),
			w7_magic_max = caster:GetTalentValue("modifier_puck_rift_7", "magic_max", true),

			has_w1 = 0,
			w1_mana = 0,
			w1_magic = 0,
			w1_magic_legendary = 0,
			w1_duration = caster:GetTalentValue("modifier_puck_rift_1", "duration", true),

			w2_cd = 0,
			w2_range = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_duration = caster:GetTalentValue("modifier_puck_rift_3", "duration", true),
			w3_burn = caster:GetTalentValue("modifier_puck_rift_3", "burn", true),
			w3_heal = caster:GetTalentValue("modifier_puck_rift_3", "heal", true) / 100,

			has_w4 = 0,
			w4_item = caster:GetTalentValue("modifier_puck_rift_4", "item", true),
			w4_cd_items = caster:GetTalentValue("modifier_puck_rift_4", "cd_items", true) / 100,
			w4_duration = caster:GetTalentValue("modifier_puck_rift_4", "duration", true),

			h3_silence = 0,

			has_h4 = 0,
		}
	end

	if caster:HasTalent("modifier_puck_rift_7") then
		self.talents.has_w7 = 1
		self.tracker:UpdateUI()
	end

	if caster:HasTalent("modifier_puck_rift_1") then
		self.talents.has_w1 = 1
		self.talents.w1_mana = caster:GetTalentValue("modifier_puck_rift_1", "mana") / 100
		self.talents.w1_magic = caster:GetTalentValue("modifier_puck_rift_1", "magic")
		self.talents.w1_magic_legendary = caster:GetTalentValue("modifier_puck_rift_1", "magic_legendary")
	end

	if caster:HasTalent("modifier_puck_rift_2") then
		self.talents.w2_cd = caster:GetTalentValue("modifier_puck_rift_2", "cd")
		self.talents.w2_range = caster:GetTalentValue("modifier_puck_rift_2", "range")
	end

	if caster:HasTalent("modifier_puck_rift_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_puck_rift_3", "damage") / 100
		caster:AddDamageEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_puck_rift_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_puck_hero_3") then
		self.talents.h3_silence = caster:GetTalentValue("modifier_puck_hero_3", "silence")
	end

	if caster:HasTalent("modifier_puck_hero_4") then
		self.talents.has_h4 = 1
	end
end

function custom_puck_waning_rift:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_puck_waning_rift_tracker"
end

function custom_puck_waning_rift:GetManaCost(level)
	if self.caster:HasModifier("modifier_custom_puck_waning_rift_legendary_charge") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function custom_puck_waning_rift:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)
end

function custom_puck_waning_rift:GetCastRange(vLocation, hTarget)
	if IsServer() then
		return 99999
	end
	if self.talents.has_w7 == 1 then
		return 0
	end
	return self.max_distance or 0
end

function custom_puck_waning_rift:GetBehavior()
	if
		self.talents.has_w7 == 1 and not self.caster:HasModifier("modifier_custom_puck_waning_rift_legendary_charge")
	then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
	end
	return DOTA_ABILITY_BEHAVIOR_POINT
		+ DOTA_ABILITY_BEHAVIOR_AOE
		+ (self.talents.has_h4 == 1 and DOTA_ABILITY_BEHAVIOR_IMMEDIATE or 0)
end

function custom_puck_waning_rift:GetCastAnimation()
	if self.talents.has_h4 == 1 then
		return 0
	end
	return ACT_DOTA_CAST_ABILITY_2
end

function custom_puck_waning_rift:GetAOERadius()
	return self.radius or 0
end

function custom_puck_waning_rift:OnSpellStart(self_cast)
	local mod = self.charge_mod

	if self.talents.has_w7 == 1 and not IsValid(mod) and not self_cast then
		self.charge_mod = self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_puck_waning_rift_legendary_charge",
			{ duration = self.talents.w7_duration_max }
		)
		return
	end

	self.caster:EmitSound("Hero_Puck.Waning_Rift")

	if self.caster:GetName() == "npc_dota_hero_puck" then
		self.caster:EmitSound("puck_puck_ability_rift_0" .. RandomInt(1, 3))
	end

	if self.talents.has_h4 == 1 and not self_cast then
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_2)
	end

	if IsValid(self.caster.innate_ability) then
		self.caster.innate_ability:ProcSpeed()
	end

	local old_pos = self.caster:GetAbsOrigin()
	local point = self:GetCursorPosition()
	if point == old_pos then
		point = old_pos + self.caster:GetForwardVector() * 10
	end

	local vec = point - old_pos
	local max_range = self:GetMaxRange()
	if vec:Length2D() > max_range then
		point = old_pos + vec:Normalized() * max_range
	end

	if self.talents.has_w4 == 1 then
		self.caster:Purge(false, true, false, false, false)
	end

	if not self_cast and self.caster:CanBlink() then
		FindClearSpaceForUnit(self.caster, point, true)
		vec.z = 0
		self.caster:FacePoint(self.caster:GetAbsOrigin() + vec:Normalized())
	end

	local legendary = self_cast or (IsValid(mod) and mod.stack >= mod.max)
	if self_cast or IsValid(mod) then
		self.caster:LogProc("modifier_puck_rift_7", self_cast and 100 or mod.stack)
	end

	local rift_particle = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_puck/puck_waning_rift.vpcf",
			self
		),
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(rift_particle, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(rift_particle, 1, Vector(self.radius, self.radius, self.radius))
	ParticleManager:ReleaseParticleIndex(rift_particle)

	local damage = self.damage + self.talents.w1_mana * self.caster:GetMaxMana()
	local damageTable =
		{ damage = damage, damage_type = self:GetAbilityDamageType(), attacker = self.caster, ability = self }
	local silence = self.silence_duration + self.talents.h3_silence
	local enemies = self.caster:FindTargets(self.radius)

	for _, enemy in pairs(enemies) do
		if self.talents.has_w1 == 1 and self.talents.has_w7 == 0 then
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_custom_puck_waning_rift_magic",
				{ duration = self.talents.w1_duration }
			)
		end

		if self.talents.has_w3 == 1 then
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_custom_puck_waning_rift_mark",
				{ duration = self.talents.w3_duration }
			)
		end

		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_puck_waning_rift",
			{ duration = silence * (1 - enemy:GetStatusResistance()) }
		)

		if legendary then
			enemy:EmitSound("Puck.Rift_Legendary_target")
		end

		damageTable.victim = enemy
		DoDamage(damageTable)

		if IsValid(self.caster.innate_ability) then
			self.caster.innate_ability:ProcHealReduce(enemy)
		end

		if IsValid(self.caster.orb_ability) then
			self.caster.orb_ability:ProcHit(enemy, self)
		end
	end

	if self.talents.has_w4 == 1 and #enemies > 0 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_puck_waning_rift_items",
			{ duration = self.talents.w4_duration + 0.1 }
		)
	end

	if legendary then
		EmitSoundOnLocationWithCaster(old_pos, "Puck.Rift_Legendary", self.caster)

		local effect = ParticleManager:CreateParticle("particles/puck/rift_blink_start.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect, 0, old_pos)
		ParticleManager:ReleaseParticleIndex(effect)

		self.caster:GenericParticle("particles/puck/rift_blint_end.vpcf")
		self.caster:AddNewModifier(self.caster, self, "modifier_custom_puck_waning_rift_legendary_damage", {})
	end

	if IsValid(mod) and not self_cast then
		mod.full = legendary
		mod.charge_finish = true
		mod:Destroy()
	end
end

function custom_puck_waning_rift:GetMaxRange()
	local range = self.max_distance + self.caster:GetCastRangeBonus()
	if IsValid(self.charge_mod) then
		range = range + self.talents.w7_range * self.charge_mod.stack / 100
	end
	return range
end

modifier_custom_puck_waning_rift_tracker = class(mod_hidden)
function modifier_custom_puck_waning_rift_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.parent.rift_ability = self.ability
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.max_distance = self.ability:GetSpecialValueFor("max_distance")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.silence_duration = self.ability:GetSpecialValueFor("silence_duration")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_custom_puck_waning_rift_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.silence_duration = self.ability:GetSpecialValueFor("silence_duration")
end

function modifier_custom_puck_waning_rift_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	local stack = IsValid(self.ability.legendary_mod) and self.ability.legendary_mod:GetStackCount() or 0
	self.parent:UpdateUIlong({ stack = stack, override_stack = stack, priority = 1, style = "PuckRiftMagic" })
end

function modifier_custom_puck_waning_rift_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_custom_puck_waning_rift_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.w2_range
end

function modifier_custom_puck_waning_rift_tracker:GetItemDamage()
	return self.ability.talents.has_w4 == 1 and self.ability.talents.w4_item or 0
end

function modifier_custom_puck_waning_rift_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.inflictor then
		return
	end
	if params.custom_flag == "puck_rift_burn" then
		return
	end
	if not params.unit:HasModifier("modifier_custom_puck_waning_rift_mark") then
		return
	end

	params.unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_puck_waning_rift_burn",
		{ duration = self.ability.talents.w3_burn + 0.1, damage = params.original_damage
			* self.ability.talents.w3_damage }
	)
end

modifier_custom_puck_waning_rift = class(mod_visible)
function modifier_custom_puck_waning_rift:IsPurgable()
	return true
end
function modifier_custom_puck_waning_rift:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic_gameplay/generic_silenced.vpcf", self, true)

	if self.caster:GetQuest() == "Puck.Quest_6" and self.parent:IsRealHero() and not self.caster:QuestCompleted() then
		self:StartIntervalThink(0.1)
	end
end

function modifier_custom_puck_waning_rift:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.caster:UpdateQuest(0.1)
end

function modifier_custom_puck_waning_rift:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

modifier_custom_puck_waning_rift_legendary_charge = class(mod_visible)
function modifier_custom_puck_waning_rift_legendary_charge:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.w7_slow
	self.duration = self.ability.talents.w7_duration
	self.max = 100

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.ability:EndCd(0.1)

	self.interval = 0.05
	self.stack_inc = (self.max / self.duration) * self.interval
	self.stack = 0
	self.visual = 5
	self.count = 0
	self.speed = self.ability.talents.w7_range / self.duration

	self.parent:EmitSound("Puck.Rift_Legendary_charge")
	self.parent:EmitSound("Puck.Rift_Legendary_charge_start")
	self.parent:GenericParticle("particles/puck/rift_legendary_start.vpcf", self)

	self.effect_cast = self.parent:GenericParticle("particles/puck/orb_stack.vpcf", self, true)
	for i = 1, self.visual do
		ParticleManager:SetParticleControl(self.effect_cast, i, Vector(0, 0, 0))
	end

	self.hidden = self.parent:IsOutOfGame()
	self:UpdateRadius()

	self:StartIntervalThink(self.interval)
end

function modifier_custom_puck_waning_rift_legendary_charge:UpdateRadius()
	if self.particle then
		ParticleManager:DestroyParticle(self.particle, true)
	end

	self.particle = ParticleManager:CreateParticleForPlayer(
		"particles/puck/rift_prepare_radius.vpcf",
		self.hidden and PATTACH_WORLDORIGIN or PATTACH_ABSORIGIN_FOLLOW,
		not self.hidden and self.parent or nil,
		self.parent:GetPlayerOwner()
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(
		self.particle,
		1,
		Vector(self.ability:GetMaxRange(), self.speed, self.hands and 0 or 1)
	)
	self:AddParticle(self.particle, true, false, -1, false, false)
end

function modifier_custom_puck_waning_rift_legendary_charge:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.parent:IsOutOfGame() ~= self.hidden then
		self.hidden = not self.hidden
		self:UpdateRadius()
	end

	if self.stack < self.max then
		self.stack = math.min(self.max, self.stack + self.stack_inc)
	elseif not self.hands then
		ParticleManager:SetParticleControl(self.particle, 1, Vector(self.ability:GetMaxRange(), self.speed, 0))
		self.parent:EmitSound("Puck.Rift_Legendary_charge_end")
		self.hands = self.parent:GenericParticle("particles/puck/rift_legendary_max.vpcf", self)
	end

	local count = math.floor(self.stack / (self.max / self.visual))
	if count ~= self.count then
		self.count = count
		for i = 1, self.visual do
			ParticleManager:SetParticleControl(self.effect_cast, i, Vector(i <= count and 1 or 0, 0, 0))
		end
	end

	self.parent:UpdateUIshort({
		max_time = self.duration,
		time = math.min(self.duration, self:GetElapsedTime()),
		active = self:GetElapsedTime() >= self.duration,
		stack = tostring(math.floor(self.stack)) .. "%",
		priority = 1,
		style = "PuckRift",
	})
	AddFOWViewer(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		self.ability:GetMaxRange() * 1.2,
		self.interval * 2,
		false
	)
end

function modifier_custom_puck_waning_rift_legendary_charge:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Puck.Rift_Legendary_charge")
	self.parent:StopSound("Puck.Rift_Legendary_charge_start")
	self.parent:UpdateUIshort({ hide = 1, priority = 1, style = "PuckRift" })

	if not self.charge_finish and self.parent:IsAlive() and self:GetRemainingTime() <= 0.1 then
		self.full = true
		self.ability:OnSpellStart(true)
	end

	self.ability:StartCd()

	if self.full then
		self.parent:CdAbility(self.ability, nil, self.ability.talents.w7_cd, "modifier_puck_rift_7")
	end
end

function modifier_custom_puck_waning_rift_legendary_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_custom_puck_waning_rift_legendary_charge:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_custom_puck_waning_rift_legendary_damage = class(mod_hidden)
function modifier_custom_puck_waning_rift_legendary_damage:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_custom_puck_waning_rift_legendary_damage:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.radius + self.ability.talents.w7_radius
	self.count = 0
	self.damageTable = {
		damage = (self.ability.damage + self.ability.talents.w1_mana * self.parent:GetMaxMana())
			* self.ability.talents.w7_damage
			/ self.ability.talents.w7_waves,
		damage_type = self.ability:GetAbilityDamageType(),
		attacker = self.parent,
		ability = self.ability,
	}

	self.parent:EmitSound("Puck.Rift_Legendary_damage")
	self:StartIntervalThink(0.3)
end

function modifier_custom_puck_waning_rift_legendary_damage:OnIntervalThink()
	if not IsServer() then
		return
	end
	local origin = self.parent:GetAbsOrigin()

	self.parent:EmitSound("Puck.Rift_Legendary_damage")

	local particle = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/units/heroes/hero_puck/puck_waning_rift.vpcf",
			self.ability
		),
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, origin)
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, self.radius, self.radius))
	ParticleManager:ReleaseParticleIndex(particle)

	for _, enemy in pairs(self.parent:FindTargets(self.radius, origin)) do
		enemy:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_puck_waning_rift_legendary_magic",
			{ duration = self.ability.talents.w7_magic_duration }
		)
		self.damageTable.victim = enemy
		DoDamage(self.damageTable, "modifier_puck_rift_7")

		enemy:EmitSound("Puck.Rift_Legendary_target")
		if IsValid(self.parent.innate_ability) then
			self.parent.innate_ability:ProcHealReduce(enemy)
		end
	end

	self.count = self.count + 1
	if self.count < self.ability.talents.w7_waves then
		return
	end
	self:Destroy()
end

modifier_custom_puck_waning_rift_legendary_magic = class(mod_visible)
function modifier_custom_puck_waning_rift_legendary_magic:GetTexture()
	return "puck_waning_rift"
end
function modifier_custom_puck_waning_rift_legendary_magic:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.magic = (self.ability.talents.w7_magic + self.ability.talents.w1_magic_legendary)
		/ self.ability.talents.w7_waves
	self.max = self.ability.talents.w7_magic_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.particle = self.parent:GenericParticle("particles/puck/rift_magic_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_custom_puck_waning_rift_legendary_magic:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.max then
		self:IncrementStackCount()

		local stack = self:GetStackCount()
		local double = math.floor(stack / 10)
		ParticleManager:SetParticleControl(self.particle, 1, Vector(double, stack, stack - double * 10))
	end

	if not self.parent:IsRealHero() then
		return
	end
	self.ability.legendary_mod = self
	self.ability.tracker:UpdateUI()
end

function modifier_custom_puck_waning_rift_legendary_magic:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		self.caster:LogProc("modifier_puck_rift_7_kill", self:GetStackCount(), self.parent)
	end

	if self.ability.legendary_mod ~= self then
		return
	end

	self.ability.legendary_mod = nil
	self.ability.tracker:UpdateUI()
end

function modifier_custom_puck_waning_rift_legendary_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_custom_puck_waning_rift_legendary_magic:GetModifierMagicalResistanceBonus()
	return self.magic * self:GetStackCount()
end

modifier_custom_puck_waning_rift_mark = class(mod_hidden)
function modifier_custom_puck_waning_rift_mark:OnCreated()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/puck/rift_mark.vpcf", self)
end

modifier_custom_puck_waning_rift_burn = class(mod_visible)
function modifier_custom_puck_waning_rift_burn:GetTexture()
	return "buffs/puck/rift_3"
end
function modifier_custom_puck_waning_rift_burn:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.interval = 1
	self.total = 0
	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability:GetAbilityDamageType(),
		damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
		custom_flag = "puck_rift_burn",
		no_creeps_bonus = true,
	}

	self:OnRefresh(params)
	self:StartIntervalThink(self.interval)
end

function modifier_custom_puck_waning_rift_burn:OnRefresh(params)
	if not IsServer() then
		return
	end
	self.total = self.total + params.damage
	self.count = self.ability.talents.w3_burn / self.interval
	self.damageTable.damage = self.total / self.count
end

function modifier_custom_puck_waning_rift_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local effect =
		ParticleManager:CreateParticle("particles/puck/rift_burn_hit.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	local real_damage = DoDamage(self.damageTable, "modifier_puck_rift_3")
	self.parent:SendNumber(116, real_damage)

	if IsValid(self.caster.innate_ability) then
		self.caster.innate_ability:ProcHealReduce(self.parent)
	end

	local result = self.caster:CanLifesteal(self.parent)
	if result then
		self.caster:GenericHeal(
			real_damage * self.ability.talents.w3_heal * result,
			self.ability,
			true,
			"particles/items3_fx/octarine_core_lifesteal.vpcf",
			"modifier_puck_rift_3"
		)
	end

	self.total = self.total - self.damageTable.damage
	self.count = self.count - 1
	if self.count > 0 then
		return
	end
	self:Destroy()
end

modifier_custom_puck_waning_rift_items = class(mod_hidden)
function modifier_custom_puck_waning_rift_items:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.interval = 0.5
	self.amount = self.interval * self.ability.talents.w4_cd_items
	self:OnRefresh()
	self:StartIntervalThink(self.interval)
end

function modifier_custom_puck_waning_rift_items:OnRefresh()
	if not IsServer() then
		return
	end
	self.count = self.ability.talents.w4_duration / self.interval
end

function modifier_custom_puck_waning_rift_items:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:CdItems(self.amount, "modifier_puck_rift_4")

	self.count = self.count - 1
	if self.count > 0 then
		return
	end
	self:Destroy()
end

modifier_custom_puck_waning_rift_magic = class(mod_hidden)
function modifier_custom_puck_waning_rift_magic:OnCreated()
	self.ability = self:GetAbility()
	self.magic = self.ability.talents.w1_magic

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_custom_puck_waning_rift_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_custom_puck_waning_rift_magic:GetModifierMagicalResistanceBonus()
	return self.magic
end