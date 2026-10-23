--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_serrated_shiv_custom",
	"abilities/items/neutral/item_serrated_shiv_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_serrated_shiv_custom = class({})

function item_serrated_shiv_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items4_fx/serrated_shiv_hit.vpcf", context)
end

function item_serrated_shiv_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_item_serrated_shiv_custom"
end

function item_serrated_shiv_custom:Spawn()
	self.proc_chance = self:GetSpecialValueFor("proc_chance")
	self.damage = self:GetSpecialValueFor("damage")
	self.damage_health = self:GetSpecialValueFor("damage_health") / 100
	self.damage_creeps = self:GetSpecialValueFor("damage_creeps")
end

modifier_item_serrated_shiv_custom = class(mod_hidden)
function modifier_item_serrated_shiv_custom:RemoveOnDeath()
	return false
end
function modifier_item_serrated_shiv_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.damageTable = { attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_PHYSICAL }
	self.parent:AddProc(self, { cd = true, accuracy = true })
end

function modifier_item_serrated_shiv_custom:GetProcChance()
	return self.ability.proc_chance
end

function modifier_item_serrated_shiv_custom:AttackProc(params)
	local target = params.target
	self.damageTable.victim = target
	self.damageTable.damage = target:IsCreep() and self.ability.damage_creeps
		or self.ability.damage + target:GetHealth() * self.ability.damage_health
	local real_damage = DoDamage(self.damageTable)
	target:SendNumber(115, real_damage)

	target:EmitSound("item_serrated_shiv")
	local particle =
		ParticleManager:CreateParticle("particles/items4_fx/serrated_shiv_hit.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)
end