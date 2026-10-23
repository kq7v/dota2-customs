--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_furion_innate_custom", "abilities/furion/furion_innate_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_furion_innate_custom_tree", "abilities/furion/furion_innate_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_furion_innate_custom_damage",
	"abilities/furion/furion_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_furion_innate_custom_toggle",
	"abilities/furion/furion_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_wrath_of_nature_custom",
	"abilities/furion/furion_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_wrath_of_nature_custom_buff",
	"abilities/furion/furion_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)

furion_innate_custom = class({})
furion_innate_custom.talents = {}

function furion_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_treant/treant_eyesintheforest.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_furion.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_furion", context)
end

function furion_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_furion_sprout_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_furion_nature_7") then
		self.talents.has_r7 = 1
	end
end

function furion_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_furion_innate_custom"
end

function furion_innate_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
		+ DOTA_ABILITY_BEHAVIOR_AOE
		+ (self.caster:HasScepter() and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0)
end

function furion_innate_custom:GetAOERadius()
	return self.vision_radius or 0
end

function furion_innate_custom:OnSpellStart()
	local tree = self:GetCursorTarget()

	local unit = CreateUnitByName(
		"npc_dota_treant_eyes_custom",
		tree:GetAbsOrigin(),
		false,
		nil,
		nil,
		self.parent:GetTeamNumber()
	)
	unit:AddNewModifier(self.caster, self, "modifier_furion_innate_custom_tree", { tree = tree:entindex() })
end

function furion_innate_custom:GetBonus()
	local bonus = 0
	if self.parent:HasModifier("modifier_furion_innate_custom_damage") then
		bonus = bonus + self.ability.damage
	end
	if self.parent:HasModifier("modifier_furion_wrath_of_nature_custom_buff") and self.parent.furion_scepter then
		bonus = bonus
			+ self.parent:GetUpgradeStack("modifier_furion_wrath_of_nature_custom_buff")
				* self.parent.furion_scepter.innate_bonus
	end
	return bonus
end

modifier_furion_innate_custom_tree = class(mod_hidden)
function modifier_furion_innate_custom_tree:IsAura()
	return true
end
function modifier_furion_innate_custom_tree:GetModifierAura()
	return "modifier_furion_innate_custom_damage"
end
function modifier_furion_innate_custom_tree:GetAuraRadius()
	return self.buff_radius
end
function modifier_furion_innate_custom_tree:GetAuraDuration()
	return 0
end
function modifier_furion_innate_custom_tree:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_furion_innate_custom_tree:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_furion_innate_custom_tree:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	if IsValid(self.ability.tracker) then
		table.insert(self.ability.tracker.active_trees, self.parent:entindex())

		if #self.ability.tracker.active_trees > self.ability.max then
			local entindex = self.ability.tracker.active_trees[1]
			local unit = EntIndexToHScript(entindex)
			if unit then
				unit:RemoveModifierByName("modifier_furion_innate_custom_tree")
				if IsValid(unit) then
					UTIL_Remove(unit)
				end
			end
		end
	else
		self:Destroy()
		return
	end

	self.buff_radius = self.ability.buff_radius
	self.vision_radius = self.ability.vision_radius
	self.tree = EntIndexToHScript(params.tree)
	self.team = self.caster:GetTeamNumber()
	self.pos = self.parent:GetAbsOrigin()

	EmitSoundOnLocationWithCaster(self.pos, "Furion.innate_spawn", self.caster)
	EmitSoundOnLocationWithCaster(self.pos, "Furion.innate_spawn2", self.caster)

	self.effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_treant/treant_eyesintheforest.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.effect, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.effect, 1, Vector(200, 0, 0))
	self:AddParticle(self.effect, false, false, -1, false, false)

	self.interval = 0.5
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_furion_innate_custom_tree:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.tree:IsNull() or (self.tree.IsStanding and not self.tree:IsStanding()) then
		self:Destroy()
		return
	end

	if self.parent:HasModifier("modifier_truesight") then
		for _, mod in pairs(self.parent:FindAllModifiersByName("modifier_truesight")) do
			AddFOWViewer(mod:GetCaster():GetTeamNumber(), self.pos, 200, self.interval * 2, false)
		end
	end

	AddFOWViewer(self.team, self.pos, self.vision_radius, self.interval * 2, false)
end

function modifier_furion_innate_custom_tree:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_INVISIBLE] = true,
		[MODIFIER_STATE_FLYING] = true,
	}
end

function modifier_furion_innate_custom_tree:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.tracker then
		for index, entindex in pairs(self.ability.tracker.active_trees) do
			if entindex == self.parent:entindex() then
				table.remove(self.ability.tracker.active_trees, index)
				break
			end
		end
	end

	UTIL_Remove(self.parent)
end

function modifier_furion_innate_custom_tree:GetAuraEntityReject(hEntity)
	return hEntity ~= self.caster
end

modifier_furion_innate_custom = class(mod_hidden)
function modifier_furion_innate_custom:IsHidden()
	return not self.parent:HasModifier("modifier_furion_innate_custom_damage")
		and not self.parent:HasModifier("modifier_furion_wrath_of_nature_custom_buff")
end
function modifier_furion_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.active_trees = {}
	self.parent.furion_innate = self.ability

	self.ability.vision_radius = self.ability:GetSpecialValueFor("vision_radius")
	self.ability.max = self.ability:GetSpecialValueFor("max")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.buff_radius = self.ability:GetSpecialValueFor("buff_radius")
end

function modifier_furion_innate_custom:OnDestroy()
	if not IsServer() then
		return
	end

	for i = 1, #self.ability.tracker.active_trees do
		local index = self.ability.tracker.active_trees[1]
		if index then
			local unit = EntIndexToHScript(index)
			if IsValid(unit) then
				unit:RemoveModifierByName("modifier_furion_innate_custom_tree")
				if IsValid(unit) then
					UTIL_Remove(unit)
				end
			end
		end
	end
end

function modifier_furion_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_furion_innate_custom:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_q7 == 1 or self.ability.talents.has_r7 == 1 then
		return 0
	end
	return self.ability:GetBonus()
end

function modifier_furion_innate_custom:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_q7 == 0 and self.ability.talents.has_r7 == 0 then
		return 0
	end
	return self.ability:GetBonus()
end

modifier_furion_innate_custom_damage = class(mod_hidden)
function modifier_furion_innate_custom_damage:GetEffectName()
	return "particles/units/heroes/hero_furion/furion_arboreal_might_buff.vpcf"
end

modifier_furion_innate_custom_toggle = class(mod_hidden)
function modifier_furion_innate_custom_toggle:RemoveOnDeath()
	return false
end
function modifier_furion_innate_custom_toggle:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if self.ability:GetName() == "furion_wrath_of_nature_custom" and not self.ability:IsHidden() then
		self.parent:SwapAbilities("furion_wrath_of_nature_custom", "furion_innate_custom", false, true)
	end

	if self.ability:GetName() == "furion_innate_custom" and not self.ability:IsHidden() then
		self.parent:SwapAbilities("furion_innate_custom", "furion_wrath_of_nature_custom", false, true)
	end

	self:Destroy()
end

furion_wrath_of_nature_custom = class({})
function furion_wrath_of_nature_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_wrath_of_nature_cast.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/furion_wrath_of_nature_custom.vpcf", context)
end

function furion_wrath_of_nature_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AUTOCAST
end

function furion_wrath_of_nature_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "furion_wrath_of_nature", self)
end

function furion_wrath_of_nature_custom:Spawn()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.caster.furion_scepter = self
	self.ability.max_creeps = self:GetLevelSpecialValueFor("max_creeps", 1)
	self.ability.damage_base = self:GetLevelSpecialValueFor("damage_base", 1)
	self.ability.damage_max = self:GetLevelSpecialValueFor("damage_max", 1)
	self.ability.innate_bonus = self:GetLevelSpecialValueFor("innate_bonus", 1)
	self.ability.innate_duration = self:GetLevelSpecialValueFor("innate_duration", 1)
	self.ability.vision_duration = self:GetLevelSpecialValueFor("vision_duration", 1)
	self.ability.vision_radius = self:GetLevelSpecialValueFor("vision_radius", 1)
	self.ability.jump_delay = self:GetLevelSpecialValueFor("jump_delay", 1)
	self.ability.creeps_damage = self:GetLevelSpecialValueFor("creeps_damage", 1) / 100
end

function furion_wrath_of_nature_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if not self.caster:HasScepter() then
		return
	end
	if self.scepter_init then
		return
	end
	if self:IsStolen() then
		return
	end
	if not IsValid(self.caster.furion_innate) then
		return
	end

	self.scepter_init = true
	self:SetLevel(1)
	self.caster:SwapAbilities(self.caster.furion_innate:GetName(), self:GetName(), false, true)
end

function furion_wrath_of_nature_custom:OnAbilityPhaseStart()
	local pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_furion/furion_wrath_of_nature_cast.vpcf",
		self
	)
	local cast_particle = ParticleManager:CreateParticle(pfx, PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControlEnt(
		cast_particle,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(cast_particle)
	return true
end

function furion_wrath_of_nature_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	self.caster:EmitSound("Hero_Furion.WrathOfNature_Cast.Self")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_furion_wrath_of_nature_custom",
		{ x = point.x, y = point.y }
	)
end

modifier_furion_wrath_of_nature_custom = class(mod_hidden)
function modifier_furion_wrath_of_nature_custom:RemoveOnDeath()
	return false
end
function modifier_furion_wrath_of_nature_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_furion_wrath_of_nature_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.hit_enemies = {}
	self.counter = 0
	self.position = GetGroundPosition(Vector(table.x, table.y, 0), nil)

	self.damage = self.ability.damage_base
	self.max_targets = self.ability.max_creeps
	self.damage_add = (self.ability.damage_max - self.damage) / self.max_targets
	self.jump_delay = self.ability.jump_delay

	self.pfx = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/nature_prophet/furion_wrath_of_nature_custom.vpcf",
		self
	)

	self.part_dist = 350
	self.new_target = nil
	self.final_damage = 0
	self.stage = 1
	self.last_target = self.parent

	self.damageTable = { damage_type = DAMAGE_TYPE_MAGICAL, attacker = self.parent, ability = self.ability }
	AddFOWViewer(
		self.parent:GetTeamNumber(),
		self.position,
		self.ability.vision_radius,
		self.ability.vision_duration,
		false
	)

	self:StartIntervalThink(FrameTime())
end

function modifier_furion_wrath_of_nature_custom:FindNewTarget()
	local type = self.stage == 1 and DOTA_UNIT_TARGET_BASIC or DOTA_UNIT_TARGET_HERO
	local targets = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.position,
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		type,
		DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS,
		FIND_CLOSEST,
		false
	)
	for _, enemy in pairs(targets) do
		if not self.hit_enemies[enemy:entindex()] then
			self.new_target = enemy
			break
		end
	end

	if not self.new_target or self.counter >= self.max_targets then
		if self.stage == 1 then
			self.stage = 2
			self.max_targets = 9999
			self.new_target = nil
			self:FindNewTarget()
		else
			self:StartIntervalThink(-1)
			self:Destroy()
		end
	end
end

function modifier_furion_wrath_of_nature_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.counter == 0 then
		self:FindNewTarget()
	end

	local enemy = self.new_target
	if not IsValid(enemy) then
		return
	end

	self.hit_enemies[enemy:entindex()] = true
	self.position = enemy:GetAbsOrigin()

	if enemy:IsCreep() then
		enemy:EmitSound("Furion.WrathOfNature_Damage.Creep")
	else
		enemy:EmitSound("Hero_Furion.WrathOfNature_Damage")
	end

	self.damageTable.damage = self.damage
	self.damageTable.victim = enemy
	DoDamage(self.damageTable)

	if self.stage == 1 then
		self.damage = self.damage + self.damage_add
		self.counter = self.counter + 1
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_furion_wrath_of_nature_custom_buff",
			{ duration = self.ability.innate_duration }
		)
	end

	self.new_target = nil
	self:FindNewTarget()

	local part_target = enemy

	if self.new_target then
		part_target = self.new_target
	end

	local last_dir = (self.last_target:GetAbsOrigin() - enemy:GetAbsOrigin())
	local last_point = enemy:GetAbsOrigin() + last_dir:Normalized() * self.part_dist
	last_point.z = last_point.z + 250

	local new_dir = (part_target:GetAbsOrigin() - enemy:GetAbsOrigin())
	local new_point = enemy:GetAbsOrigin() + new_dir:Normalized() * self.part_dist
	new_point.z = new_point.z + 250

	self.wrath_particle = ParticleManager:CreateParticle(self.pfx, PATTACH_CUSTOMORIGIN_FOLLOW, enemy)
	ParticleManager:SetParticleControlEnt(
		self.wrath_particle,
		0,
		enemy,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		enemy:GetAbsOrigin(),
		true
	)

	if new_dir:Length2D() <= self.part_dist then
		ParticleManager:SetParticleControlEnt(
			self.wrath_particle,
			1,
			part_target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			part_target:GetAbsOrigin(),
			true
		)
	else
		ParticleManager:SetParticleControl(self.wrath_particle, 1, new_point)
	end

	if last_dir:Length2D() <= self.part_dist then
		ParticleManager:SetParticleControlEnt(
			self.wrath_particle,
			2,
			self.last_target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.last_target:GetAbsOrigin(),
			true
		)
	else
		ParticleManager:SetParticleControl(self.wrath_particle, 2, last_point)
	end

	ParticleManager:SetParticleControlEnt(
		self.wrath_particle,
		3,
		enemy,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		enemy:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.wrath_particle,
		4,
		enemy,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		enemy:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(self.wrath_particle)

	self.last_target = enemy
	self:StartIntervalThink(self.jump_delay)
end

modifier_furion_wrath_of_nature_custom_buff = class(mod_visible)
function modifier_furion_wrath_of_nature_custom_buff:GetEffectName()
	return "particles/units/heroes/hero_furion/furion_arboreal_might_buff.vpcf"
end
function modifier_furion_wrath_of_nature_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.max_creeps

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_furion_wrath_of_nature_custom_buff:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end