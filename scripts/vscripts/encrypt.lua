--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a
if IsServer() then
	a = tostring(GetDedicatedServerKeyV3("encrypted_code")):sub(1, 32)
else
	return
end
local function b(c)
	local d = setmetatable({}, { __index = _ENV or getfenv() })
	if setfenv then
		setfenv(c, d)
	end
	return c(d) or d
end
local bit = b(function(_ENV, ...)
	local e = math.floor
	local f, g
	g = function(h, i)
		return e(h % 4294967296 / 2 ^ i)
	end
	f = function(h, i)
		return h * 2 ^ i % 4294967296
	end
	return { bnot = bit.bnot, band = bit.band, bor = bit.bor, bxor = bit.bxor, rshift = g, lshift = f }
end)
local j = b(function(_ENV, ...)
	local k = bit.bxor
	local f = bit.lshift
	local l = 0x100
	local m = 0xff
	local n = 0x11b
	local o = {}
	local p = {}
	local function q(r, s)
		return k(r, s)
	end
	local function t(r, s)
		return k(r, s)
	end
	local function u(v)
		if v == 1 then
			return 1
		end
		local x = m - p[v]
		return o[x]
	end
	local function y(r, s)
		if r == 0 or s == 0 then
			return 0
		end
		local x = p[r] + p[s]
		if x >= m then
			x = x - m
		end
		return o[x]
	end
	local function z(r, s)
		if r == 0 then
			return 0
		end
		local x = p[r] - p[s]
		if x < 0 then
			x = x + m
		end
		return o[x]
	end
	local function A()
		for B = 1, l do
			print("log(", B - 1, ")=", p[B - 1])
		end
	end
	local function C()
		for B = 1, l do
			print("exp(", B - 1, ")=", o[B - 1])
		end
	end
	local function D()
		local h = 1
		for B = 0, m - 1 do
			o[B] = h
			p[h] = B
			h = k(f(h, 1), h)
			if h > m then
				h = t(h, n)
			end
		end
	end
	D()
	return { add = q, sub = t, invert = u, mul = y, div = dib, printLog = A, printExp = C }
end)
util = b(function(_ENV, ...)
	local k = bit.bxor
	local g = bit.rshift
	local E = bit.band
	local f = bit.lshift
	local function F(byte)
		byte = k(byte, g(byte, 4))
		byte = k(byte, g(byte, 2))
		byte = k(byte, g(byte, 1))
		return E(byte, 1)
	end
	local function G(H, I)
		if I == 0 then
			return E(H, 0xff)
		else
			return E(g(H, I * 8), 0xff)
		end
	end
	local function J(H, I)
		if I == 0 then
			return E(H, 0xff)
		else
			return f(E(H, 0xff), I * 8)
		end
	end
	local function K(L, M, l)
		local N = {}
		for B = 0, l - 1 do
			N[B + 1] = J(L[M + B * 4], 3) + J(L[M + B * 4 + 1], 2) + J(L[M + B * 4 + 2], 1) + J(L[M + B * 4 + 3], 0)
		end
		return N
	end
	local function O(N, P, Q, l)
		l = l or #N
		for B = 0, l - 1 do
			for R = 0, 3 do
				P[Q + B * 4 + 3 - R] = G(N[B + 1], R)
			end
		end
		return P
	end
	local function S(L)
		local T = ""
		for B, byte in ipairs(L) do
			T = T .. string.format("%02x ", byte)
		end
		return T
	end
	local function U(L)
		local V = {}
		for B = 1, #L, 2 do
			V[#V + 1] = tonumber(L:sub(B, B + 1), 16)
		end
		return V
	end
	local function W(X)
		local type = type(X)
		if type == "number" then
			return string.format("%08x", X)
		elseif type == "table" then
			return S(X)
		elseif type == "string" then
			local L = { string.byte(X, 1, #X) }
			return S(L)
		else
			return X
		end
	end
	local function Y(X)
		local Z = #X
		local _ = math.random(0, 255)
		local a0 = math.random(0, 255)
		local a1 = string.char(_, a0, _, a0, G(Z, 3), G(Z, 2), G(Z, 1), G(Z, 0))
		X = a1 .. X
		local a2 = math.ceil(#X / 16) * 16 - #X
		local a3 = ""
		for B = 1, a2 do
			a3 = a3 .. string.char(math.random(0, 255))
		end
		return X .. a3
	end
	local function a4(X)
		local a5 = { string.byte(X, 1, 4) }
		if a5[1] == a5[3] and a5[2] == a5[4] then
			return true
		end
		return false
	end
	local function a6(X)
		if not a4(X) then
			return nil
		end
		local Z = J(string.byte(X, 5), 3) + J(string.byte(X, 6), 2) + J(string.byte(X, 7), 1) + J(string.byte(X, 8), 0)
		return string.sub(X, 9, 8 + Z)
	end
	local function a7(X, a8)
		for B = 1, 16 do
			X[B] = k(X[B], a8[B])
		end
	end
	local function a9(X)
		local B = 16
		while true do
			local aa = X[B] + 1
			if aa >= 256 then
				X[B] = aa - 256
				B = (B - 2) % 16 + 1
			else
				X[B] = aa
				break
			end
		end
	end
	return {
		byteParity = F,
		getByte = G,
		putByte = J,
		bytesToInts = K,
		intsToBytes = O,
		bytesToHex = S,
		hexToBytes = U,
		toHexString = W,
		padByteString = Y,
		properlyDecrypted = a4,
		unpadByteString = a6,
		xorIV = a7,
		increment = a9,
	}
end)
aes = b(function(_ENV, ...)
	local J = util.putByte
	local G = util.getByte
	local ab = "rounds"
	local ac = "type"
	local ad = 1
	local ae = 2
	local af = {}
	local ag = {}
	local ah = {}
	local ai = {}
	local aj = {}
	local ak = {}
	local al = {}
	local am = {}
	local an = {}
	local ao = {}
	local ap = {
		0x01000000,
		0x02000000,
		0x04000000,
		0x08000000,
		0x10000000,
		0x20000000,
		0x40000000,
		0x80000000,
		0x1b000000,
		0x36000000,
		0x6c000000,
		0xd8000000,
		0xab000000,
		0x4d000000,
		0x9a000000,
		0x2f000000,
	}
	local function aq(byte)
		mask = 0xf8
		result = 0
		for B = 1, 8 do
			result = bit.lshift(result, 1)
			parity = util.byteParity(bit.band(byte, mask))
			result = result + parity
			lastbit = bit.band(mask, 1)
			mask = bit.band(bit.rshift(mask, 1), 0xff)
			if lastbit ~= 0 then
				mask = bit.bor(mask, 0x80)
			else
				mask = bit.band(mask, 0x7f)
			end
		end
		return bit.bxor(result, 0x63)
	end
	local function ar()
		for B = 0, 255 do
			if B ~= 0 then
				inverse = j.invert(B)
			else
				inverse = B
			end
			mapped = aq(inverse)
			af[B] = mapped
			ag[mapped] = B
		end
	end
	local function as()
		for at = 0, 255 do
			byte = af[at]
			ah[at] = J(j.mul(0x03, byte), 0) + J(byte, 1) + J(byte, 2) + J(j.mul(0x02, byte), 3)
			ai[at] = J(byte, 0) + J(byte, 1) + J(j.mul(0x02, byte), 2) + J(j.mul(0x03, byte), 3)
			aj[at] = J(byte, 0) + J(j.mul(0x02, byte), 1) + J(j.mul(0x03, byte), 2) + J(byte, 3)
			ak[at] = J(j.mul(0x02, byte), 0) + J(j.mul(0x03, byte), 1) + J(byte, 2) + J(byte, 3)
		end
	end
	local function au()
		for at = 0, 255 do
			byte = ag[at]
			al[at] = J(j.mul(0x0b, byte), 0)
				+ J(j.mul(0x0d, byte), 1)
				+ J(j.mul(0x09, byte), 2)
				+ J(j.mul(0x0e, byte), 3)
			am[at] = J(j.mul(0x0d, byte), 0)
				+ J(j.mul(0x09, byte), 1)
				+ J(j.mul(0x0e, byte), 2)
				+ J(j.mul(0x0b, byte), 3)
			an[at] = J(j.mul(0x09, byte), 0)
				+ J(j.mul(0x0e, byte), 1)
				+ J(j.mul(0x0b, byte), 2)
				+ J(j.mul(0x0d, byte), 3)
			ao[at] = J(j.mul(0x0e, byte), 0)
				+ J(j.mul(0x0b, byte), 1)
				+ J(j.mul(0x0d, byte), 2)
				+ J(j.mul(0x09, byte), 3)
		end
	end
	local function av(aw)
		local ax = bit.band(aw, 0xff000000)
		return bit.lshift(aw, 8) + bit.rshift(ax, 24)
	end
	local function ay(aw)
		return J(af[G(aw, 0)], 0) + J(af[G(aw, 1)], 1) + J(af[G(aw, 2)], 2) + J(af[G(aw, 3)], 3)
	end
	local function az(aA)
		local aB = {}
		local aC = math.floor(#aA / 4)
		if aC ~= 4 and aC ~= 6 and aC ~= 8 or aC * 4 ~= #aA then
			error("Invalid key size: " .. tostring(aC))
			return nil
		end
		aB[ab] = aC + 6
		aB[ac] = ad
		for B = 0, aC - 1 do
			aB[B] = J(aA[B * 4 + 1], 3) + J(aA[B * 4 + 2], 2) + J(aA[B * 4 + 3], 1) + J(aA[B * 4 + 4], 0)
		end
		for B = aC, (aB[ab] + 1) * 4 - 1 do
			local ax = aB[B - 1]
			if B % aC == 0 then
				ax = av(ax)
				ax = ay(ax)
				local I = math.floor(B / aC)
				ax = bit.bxor(ax, ap[I])
			elseif aC > 6 and B % aC == 4 then
				ax = ay(ax)
			end
			aB[B] = bit.bxor(aB[B - aC], ax)
		end
		return aB
	end
	local function aD(aw)
		local aE = G(aw, 3)
		local aF = G(aw, 2)
		local aG = G(aw, 1)
		local aH = G(aw, 0)
		return J(j.add(j.add(j.add(j.mul(0x0b, aF), j.mul(0x0d, aG)), j.mul(0x09, aH)), j.mul(0x0e, aE)), 3)
			+ J(j.add(j.add(j.add(j.mul(0x0b, aG), j.mul(0x0d, aH)), j.mul(0x09, aE)), j.mul(0x0e, aF)), 2)
			+ J(j.add(j.add(j.add(j.mul(0x0b, aH), j.mul(0x0d, aE)), j.mul(0x09, aF)), j.mul(0x0e, aG)), 1)
			+ J(j.add(j.add(j.add(j.mul(0x0b, aE), j.mul(0x0d, aF)), j.mul(0x09, aG)), j.mul(0x0e, aH)), 0)
	end
	local function aI(aw)
		local aE = G(aw, 3)
		local aF = G(aw, 2)
		local aG = G(aw, 1)
		local aH = G(aw, 0)
		local aJ = bit.bxor(aH, aG)
		local aK = bit.bxor(aF, aE)
		local aL = bit.bxor(aJ, aK)
		aL = bit.bxor(aL, j.mul(0x08, aL))
		w = bit.bxor(aL, j.mul(0x04, bit.bxor(aG, aE)))
		aL = bit.bxor(aL, j.mul(0x04, bit.bxor(aH, aF)))
		return J(bit.bxor(bit.bxor(aH, aL), j.mul(0x02, bit.bxor(aE, aH))), 0)
			+ J(bit.bxor(bit.bxor(aG, w), j.mul(0x02, aJ)), 1)
			+ J(bit.bxor(bit.bxor(aF, aL), j.mul(0x02, bit.bxor(aE, aH))), 2)
			+ J(bit.bxor(bit.bxor(aE, w), j.mul(0x02, aK)), 3)
	end
	local function aM(aA)
		local aB = az(aA)
		if aB == nil then
			return nil
		end
		aB[ac] = ae
		for B = 4, (aB[ab] + 1) * 4 - 5 do
			aB[B] = aD(aB[B])
		end
		return aB
	end
	local function aN(aO, aA, aP)
		for B = 0, 3 do
			aO[B + 1] = bit.bxor(aO[B + 1], aA[aP * 4 + B])
		end
	end
	local function aQ(aR, aS)
		aS[1] = bit.bxor(bit.bxor(bit.bxor(ah[G(aR[1], 3)], ai[G(aR[2], 2)]), aj[G(aR[3], 1)]), ak[G(aR[4], 0)])
		aS[2] = bit.bxor(bit.bxor(bit.bxor(ah[G(aR[2], 3)], ai[G(aR[3], 2)]), aj[G(aR[4], 1)]), ak[G(aR[1], 0)])
		aS[3] = bit.bxor(bit.bxor(bit.bxor(ah[G(aR[3], 3)], ai[G(aR[4], 2)]), aj[G(aR[1], 1)]), ak[G(aR[2], 0)])
		aS[4] = bit.bxor(bit.bxor(bit.bxor(ah[G(aR[4], 3)], ai[G(aR[1], 2)]), aj[G(aR[2], 1)]), ak[G(aR[3], 0)])
	end
	local function aT(aR, aS)
		aS[1] = J(af[G(aR[1], 3)], 3) + J(af[G(aR[2], 2)], 2) + J(af[G(aR[3], 1)], 1) + J(af[G(aR[4], 0)], 0)
		aS[2] = J(af[G(aR[2], 3)], 3) + J(af[G(aR[3], 2)], 2) + J(af[G(aR[4], 1)], 1) + J(af[G(aR[1], 0)], 0)
		aS[3] = J(af[G(aR[3], 3)], 3) + J(af[G(aR[4], 2)], 2) + J(af[G(aR[1], 1)], 1) + J(af[G(aR[2], 0)], 0)
		aS[4] = J(af[G(aR[4], 3)], 3) + J(af[G(aR[1], 2)], 2) + J(af[G(aR[2], 1)], 1) + J(af[G(aR[3], 0)], 0)
	end
	local function aU(aR, aS)
		aS[1] = bit.bxor(bit.bxor(bit.bxor(al[G(aR[1], 3)], am[G(aR[4], 2)]), an[G(aR[3], 1)]), ao[G(aR[2], 0)])
		aS[2] = bit.bxor(bit.bxor(bit.bxor(al[G(aR[2], 3)], am[G(aR[1], 2)]), an[G(aR[4], 1)]), ao[G(aR[3], 0)])
		aS[3] = bit.bxor(bit.bxor(bit.bxor(al[G(aR[3], 3)], am[G(aR[2], 2)]), an[G(aR[1], 1)]), ao[G(aR[4], 0)])
		aS[4] = bit.bxor(bit.bxor(bit.bxor(al[G(aR[4], 3)], am[G(aR[3], 2)]), an[G(aR[2], 1)]), ao[G(aR[1], 0)])
	end
	local function aV(aR, aS)
		aS[1] = J(ag[G(aR[1], 3)], 3) + J(ag[G(aR[4], 2)], 2) + J(ag[G(aR[3], 1)], 1) + J(ag[G(aR[2], 0)], 0)
		aS[2] = J(ag[G(aR[2], 3)], 3) + J(ag[G(aR[1], 2)], 2) + J(ag[G(aR[4], 1)], 1) + J(ag[G(aR[3], 0)], 0)
		aS[3] = J(ag[G(aR[3], 3)], 3) + J(ag[G(aR[2], 2)], 2) + J(ag[G(aR[1], 1)], 1) + J(ag[G(aR[4], 0)], 0)
		aS[4] = J(ag[G(aR[4], 3)], 3) + J(ag[G(aR[3], 2)], 2) + J(ag[G(aR[2], 1)], 1) + J(ag[G(aR[1], 0)], 0)
	end
	local function aW(aA, aX, aY, P, Q)
		aY = aY or 1
		P = P or {}
		Q = Q or 1
		local aO = {}
		local aZ = {}
		if aA[ac] ~= ad then
			error("No encryption key: " .. tostring(aA[ac]) .. ", expected " .. ad)
			return
		end
		aO = util.bytesToInts(aX, aY, 4)
		aN(aO, aA, 0)
		local aP = 1
		while aP < aA[ab] - 1 do
			aQ(aO, aZ)
			aN(aZ, aA, aP)
			aP = aP + 1
			aQ(aZ, aO)
			aN(aO, aA, aP)
			aP = aP + 1
		end
		aQ(aO, aZ)
		aN(aZ, aA, aP)
		aP = aP + 1
		aT(aZ, aO)
		aN(aO, aA, aP)
		return util.intsToBytes(aO, P, Q)
	end
	local function decrypt(aA, aX, aY, P, Q)
		aY = aY or 1
		P = P or {}
		Q = Q or 1
		local aO = {}
		local aZ = {}
		if aA[ac] ~= ae then
			error("No decryption key: " .. tostring(aA[ac]))
			return
		end
		aO = util.bytesToInts(aX, aY, 4)
		aN(aO, aA, aA[ab])
		local aP = aA[ab] - 1
		while aP > 2 do
			aU(aO, aZ)
			aN(aZ, aA, aP)
			aP = aP - 1
			aU(aZ, aO)
			aN(aO, aA, aP)
			aP = aP - 1
		end
		aU(aO, aZ)
		aN(aZ, aA, aP)
		aP = aP - 1
		aV(aZ, aO)
		aN(aO, aA, aP)
		return util.intsToBytes(aO, P, Q)
	end
	ar()
	as()
	au()
	return {
		ROUNDS = ab,
		KEY_TYPE = ac,
		ENCRYPTION_KEY = ad,
		DECRYPTION_KEY = ae,
		expandEncryptionKey = az,
		expandDecryptionKey = aM,
		encrypt = aW,
		decrypt = decrypt,
	}
end)
local a_ = b(function(_ENV, ...)
	local function b0()
		return {}
	end
	local function b1(b2, b3)
		table.insert(b2, b3)
	end
	local function b4(b2)
		return table.concat(b2)
	end
	return { new = b0, addString = b1, toString = b4 }
end)
ciphermode = b(function(_ENV, ...)
	local b5 = {}
	local a5 = math.random
	function b5.encryptString(aA, X, b6, a8)
		if a8 then
			local b7 = {}
			for B = 1, 16 do
				b7[B] = a8[B]
			end
			a8 = b7
		else
			a8 = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
		end
		local b8 = aes.expandEncryptionKey(aA)
		local b9 = a_.new()
		for B = 1, #X / 16 do
			local ba = (B - 1) * 16 + 1
			local bb = { string.byte(X, ba, ba + 15) }
			a8 = b6(b8, bb, a8)
			a_.addString(b9, string.char(unpack(bb)))
		end
		return a_.toString(b9)
	end
	function b5.encryptECB(b8, bb, a8)
		aes.encrypt(b8, bb, 1, bb, 1)
	end
	function b5.encryptCBC(b8, bb, a8)
		util.xorIV(bb, a8)
		aes.encrypt(b8, bb, 1, bb, 1)
		return bb
	end
	function b5.encryptOFB(b8, bb, a8)
		aes.encrypt(b8, a8, 1, a8, 1)
		util.xorIV(bb, a8)
		return a8
	end
	function b5.encryptCFB(b8, bb, a8)
		aes.encrypt(b8, a8, 1, a8, 1)
		util.xorIV(bb, a8)
		return bb
	end
	function b5.encryptCTR(b8, bb, a8)
		local bc = {}
		for R = 1, 16 do
			bc[R] = a8[R]
		end
		aes.encrypt(b8, a8, 1, a8, 1)
		util.xorIV(bb, a8)
		util.increment(bc)
		return bc
	end
	function b5.decryptString(aA, X, b6, a8)
		if a8 then
			local b7 = {}
			for B = 1, 16 do
				b7[B] = a8[B]
			end
			a8 = b7
		else
			a8 = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
		end
		local b8
		if b6 == b5.decryptOFB or b6 == b5.decryptCFB or b6 == b5.decryptCTR then
			b8 = aes.expandEncryptionKey(aA)
		else
			b8 = aes.expandDecryptionKey(aA)
		end
		local bd = a_.new()
		for B = 1, #X / 16 do
			local ba = (B - 1) * 16 + 1
			local bb = { string.byte(X, ba, ba + 15) }
			a8 = b6(b8, bb, a8)
			a_.addString(bd, string.char(unpack(bb)))
		end
		return a_.toString(bd)
	end
	function b5.decryptECB(b8, bb, a8)
		aes.decrypt(b8, bb, 1, bb, 1)
		return a8
	end
	function b5.decryptCBC(b8, bb, a8)
		local bc = {}
		for R = 1, 16 do
			bc[R] = bb[R]
		end
		aes.decrypt(b8, bb, 1, bb, 1)
		util.xorIV(bb, a8)
		return bc
	end
	function b5.decryptOFB(b8, bb, a8)
		aes.encrypt(b8, a8, 1, a8, 1)
		util.xorIV(bb, a8)
		return a8
	end
	function b5.decryptCFB(b8, bb, a8)
		local bc = {}
		for R = 1, 16 do
			bc[R] = bb[R]
		end
		aes.encrypt(b8, a8, 1, a8, 1)
		util.xorIV(bb, a8)
		return bc
	end
	b5.decryptCTR = b5.encryptCTR
	return b5
end)
local function be(b3)
	return b3:gsub("..", function(bf)
		return string.char(tonumber(bf, 16))
	end)
end
local aA = { string.byte(be(a), 1, 16) }
_G.decrypt = function(bg)
	local bh = be(bg)
	local a8 = { string.byte(bh, 1, 16) }
	local bi = ciphermode.decryptString(aA, bh:sub(17), ciphermode.decryptCBC, a8)
	return string.sub(bi, 1, string.find(bi, "\0") - 1)
end
_G.decryptModule = function(bg, bj, ...)
	return assert(load(decrypt(bg), bj or "", nil, getfenv(2)))(...)
end